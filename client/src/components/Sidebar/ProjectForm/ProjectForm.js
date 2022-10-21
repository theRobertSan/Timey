import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Slide, Typography, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useDispatch } from "react-redux";
import Importance from "./Importance/Importance";
import moment from "moment";

import { createProject, updateProject } from "../../../actions/projects";
import CourseSelector from "./CourseSelector/CourseSelector";
import ProjectDatePicker from "./ProjectDatePicker/ProjectDatePicker";
import ProjectTimePicker from "./ProjectTimePicker/ProjectTimePicker";
import ProjectTextField from "./ProjectTextField/ProjectTextField";
import useGlobalStyles from "../../../globalStyles";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";

const initialProjectData = {
  name: "",
  description: "",
  course: "",
  dueDate: null,
  dueTime: null,
  importance: 2,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectForm = ({ open, setOpen, currentProject }) => {
  const global = useGlobalStyles();

  // Handle its own closure when submiting or canceling
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  // Project Data
  const [projectData, setProjectData] = useState(currentProject ? currentProject : initialProjectData);

  // Refresh project on open
  useEffect(() => {
    console.log("Refreshed");
    const project = currentProject ? currentProject : initialProjectData;
    setProjectData(project);
    setHover(project.importance);
  }, [open]);

  // console.log(moment(projectData.dueDate).isSameOrAfter(new Date(), "day"));

  // Submit button disable based on validation
  const isEnabled =
    // Name exists
    projectData.name.length > 0 &&
    // Date inserted exists and is in the future or today
    projectData.dueDate instanceof Date &&
    !isNaN(projectData.dueDate) &&
    moment(projectData.dueDate).isSameOrAfter(new Date(), "day") &&
    // If time inserted exists, it's in in the future
    (projectData.dueTime === null ||
      (projectData.dueTime instanceof Date && !isNaN(projectData.dueTime) && (moment(projectData.dueDate).isAfter(new Date(), "day") || moment(projectData.dueTime).isSameOrAfter(new Date()))));
  console.log(projectData.dueDate);
  // Controll importance label
  const [hover, setHover] = useState(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

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

    // // Clean project data
    // setProjectData(initialProjectData);
  };

  // Controll the snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    success: false,
  });

  const displaySuccess = () => {
    setSnackbar({ open: true, success: true });
  };

  const displayError = () => {
    setSnackbar({ open: true, success: false });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
        <DialogTitle variant="h5">
          <Typography variant="inherit" align="center">
            {currentProject ? "Edit Project" : "Create Project"}
          </Typography>
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={2}>
                {/* Name */}
                <ProjectTextField projectData={projectData} setProjectData={setProjectData} label="Name" required={true} />

                {/* Description */}
                <ProjectTextField projectData={projectData} setProjectData={setProjectData} label="Description" />

                {/* Course Selection */}
                <CourseSelector projectData={projectData} setProjectData={setProjectData} />

                {/* Date Selection */}
                <ProjectDatePicker projectData={projectData} setProjectData={setProjectData} />

                {/* Time Selection */}
                <ProjectTimePicker projectData={projectData} setProjectData={setProjectData} />

                {/* Importance Selection */}
                <Importance projectData={projectData} setProjectData={setProjectData} hover={hover} setHover={setHover} />
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={!isEnabled}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        onClose={closeSnackbar}
        severity={snackbar.success ? "success" : "error"}
        message={snackbar.success ? `Project ${currentProject ? "edited" : "created"} successfully!` : `Error ${currentProject ? "editing" : "creating"} project. Try again later!`}
      />
    </>
  );
};

export default ProjectForm;
