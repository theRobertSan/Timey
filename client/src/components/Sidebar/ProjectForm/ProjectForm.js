import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Slide, Typography, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useDispatch } from "react-redux";
import Importance from "./Importance/Importance";
import moment from "moment";

import { createProject } from "../../../actions/projects";
import CourseSelector from "./CourseSelector/CourseSelector";
import ProjectDatePicker from "./ProjectDatePicker/ProjectDatePicker";
import ProjectTimePicker from "./ProjectTimePicker/ProjectTimePicker";
import ProjectTextField from "./ProjectTextField/ProjectTextField";
import useGlobalStyles from "../../../globalStyles";

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

const ProjectForm = () => {
  const global = useGlobalStyles();

  const dispatch = useDispatch();

  // Project Data
  const [projectData, setProjectData] = useState(initialProjectData);

  console.log(moment(projectData.dueDate).isSameOrAfter(new Date(), "day"));

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

  // Controll the opening of the dialog box
  const [open, setOpen] = useState(false);

  // Controll importance label
  const [hover, setHover] = useState(2);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHover(2);
    // Clean project data
    setProjectData(initialProjectData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    setHover(2);

    dispatch(createProject(projectData));

    // Clean project data
    setProjectData(initialProjectData);
  };

  return (
    <>
      <Button className={global.sideButton} onClick={handleClickOpen}>
        Create Project
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
        <DialogTitle variant="h5">
          <Typography variant="inherit" align="center">
            Create Project
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
    </>
  );
};

export default ProjectForm;
