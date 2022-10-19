import React, { useState } from "react";
import { Dialog, Button, Slide, DialogTitle, Typography, DialogContent, Stack, TextField, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";

import { createCourse } from "../../../actions/courses";
import useGlobalStyles from "../../../globalStyles";

const initialCourseData = {
  name: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CourseForm = () => {
  const global = useGlobalStyles();

  const dispatch = useDispatch();
  // Course Data
  const [courseData, setCourseData] = useState(initialCourseData);
  // Submit button disable based on validation
  const isEnabled = courseData.name.length > 0;
  // Controll the opening of the dialog box
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // Clean project data
    setCourseData(initialCourseData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    dispatch(createCourse(courseData));

    // Clean project data
    setCourseData(initialCourseData);
  };

  return (
    <>
      <Button className={global.sideButton} onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
        <DialogTitle variant="h5">
          <Typography variant="inherit" align="center">
            Add Course
          </Typography>
        </DialogTitle>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              {/* Name */}
              <TextField autoFocus fullWidth required label="Name" name="name" value={courseData.name} onChange={(e) => setCourseData({ ...courseData, name: e.target.value })} />
            </Stack>
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

export default CourseForm;
