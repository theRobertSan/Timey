import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, Button, Slide, DialogTitle, Typography, DialogContent, Stack, TextField, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import { createCourse } from "../../../actions/courses";
import useGlobalStyles from "../../../globalStyles";
import { useEffect } from "react";

const initialCourseData = {
  name: "",
  color: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CourseForm = () => {
  const global = useGlobalStyles();

  const colors = useSelector((state) => state.colors);

  const dispatch = useDispatch();

  // Current Color Index Data
  const [colorIndex, setColorIndex] = useState(0);

  // Course Data
  const [courseData, setCourseData] = useState(initialCourseData);
  // Submit button disable based on validation
  const isEnabled = courseData.name.length > 0;

  // Controll the opening of the dialog box
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("HI");
    setCourseData({ ...courseData, color: colors[colorIndex] ? colors[colorIndex]._id : "" });
  }, [colors]);

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

  const getNextColor = () => {
    return colors[colorIndex] ? colors[colorIndex].hex : undefined;
  };

  const changeColor = () => {
    const newIndex = (colorIndex + 1) % colors.length;
    setColorIndex(newIndex);
    setCourseData({ ...courseData, color: colors[newIndex]._id });
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

              <Stack direction="row" justifyContent="flex-star" alignItems="flex-start" spacing={1}>
                <Button onClick={changeColor}>New Color</Button>
                <CircleIcon style={{ color: getNextColor() }} />
              </Stack>
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
