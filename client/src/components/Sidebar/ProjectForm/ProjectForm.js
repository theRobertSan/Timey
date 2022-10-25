import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Slide, Typography, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useDispatch } from "react-redux";
import Difficulty from "./Difficulty/Difficulty";
import moment from "moment";

import { createProject, updateProject } from "../../../store/actions/projects";
import CourseSelector from "./CourseSelector/CourseSelector";
import ProjectDatePicker from "./ProjectDatePicker/ProjectDatePicker";
import ProjectTimePicker from "./ProjectTimePicker/ProjectTimePicker";
import ProjectTextField from "./ProjectTextField/ProjectTextField";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";
import useStyles from "./styles.js";

const initialProjectData = {
  name: "",
  description: "",
  course: "",
  dueDate: null,
  dueTime: moment({ hour: 23, minute: 55 })._d,
  difficulty: 2,
};

// Transition effect for form dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectForm = ({ open, closeForm, currentProject }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Project Data
  const [projectData, setProjectData] = useState(currentProject ? currentProject : initialProjectData);

  // Refresh project on open
  useEffect(() => {
    const project = currentProject ? currentProject : initialProjectData;
    setProjectData(project);
    setHover(project.difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Disable submit button based on validation
  const isEnabled =
    // Name & course exists
    projectData.name.length > 0 &&
    projectData.course.length > 0 &&
    // Date inserted exists and is in the future or today
    projectData.dueDate instanceof Date &&
    !isNaN(projectData.dueDate) &&
    moment(projectData.dueDate).isSameOrAfter(new Date(), "day") &&
    // If time inserted exists, it's in in the future
    (projectData.dueTime === null ||
      (projectData.dueTime instanceof Date && !isNaN(projectData.dueTime) && (moment(projectData.dueDate).isAfter(new Date(), "day") || moment(projectData.dueTime).isSameOrAfter(new Date()))));

  // Controll difficulty label
  const [hover, setHover] = useState(2);

  // Controll the snackbar
  const [snackbar, setSnackbar] = useState({ open: false, success: false });

  const displaySuccess = () =>
    setSnackbar({
      open: true,
      success: true,
      message: `Project ${currentProject ? "edited" : "created"} successfully!`,
    });
  const displayError = () => ({
    open: true,
    success: false,
    message: `Error ${currentProject ? "editing" : "creating"} project. Try again later!`,
  });
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeForm();

    let apiResponsePromise;
    if (currentProject) {
      // Update
      apiResponsePromise = dispatch(updateProject(projectData));
    } else {
      // Create
      apiResponsePromise = dispatch(createProject(projectData));
    }

    // Display success or error snackbar
    apiResponsePromise.then(({ success }) => {
      if (success) {
        displaySuccess();
      } else {
        displayError();
      }
    });
  };

  return (
    <>
      <Dialog open={open} onClose={closeForm} TransitionComponent={Transition} keepMounted>
        <DialogTitle variant="h5">
          <Typography className={classes.formTitle} variant="inherit" align="center">
            {currentProject ? "Edit Project" : "Create Project"}
          </Typography>
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={2}>
                {/* Name */}
                <ProjectTextField projectData={projectData} setProjectData={setProjectData} label="Name" required={true} limit={30} />

                {/* Description */}
                <ProjectTextField projectData={projectData} setProjectData={setProjectData} label="Description" limit={100} />

                {/* Course Selection */}
                <CourseSelector projectData={projectData} setProjectData={setProjectData} />

                {/* Date Selection */}
                <ProjectDatePicker projectData={projectData} setProjectData={setProjectData} />

                {/* Time Selection */}
                <ProjectTimePicker projectData={projectData} setProjectData={setProjectData} />

                {/* Difficulty Selection */}
                <Difficulty projectData={projectData} setProjectData={setProjectData} hover={hover} setHover={setHover} />
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="cancelButton" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="submitButton" type="submit" disabled={!isEnabled}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar open={snackbar.open} onClose={closeSnackbar} severity={snackbar.success ? "success" : "error"} message={snackbar.message} />
    </>
  );
};

export default ProjectForm;
