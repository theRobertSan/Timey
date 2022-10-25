import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, Button, Slide, DialogTitle, Typography, DialogContent, Stack, TextField, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import { createCourse } from "../../../store/actions/courses";
import { useEffect } from "react";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";

const initialCourseData = {
  name: "",
  color: "",
};

// Transition effect for form dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CourseForm = ({ open, closeForm }) => {
  const dispatch = useDispatch();

  // Course Data
  const [courseData, setCourseData] = useState(initialCourseData);

  // // Refresh course when closing
  // useEffect(() => {
  //   setCourseData(initialCourseData);
  // }, [open]);

  // Disable submit button based on validation
  const isEnabled = courseData.name.length > 0;

  // Get all available colors
  const colors = useSelector((state) => state.colors);

  // Current Color Index Data
  const [colorIndex, setColorIndex] = useState(0);

  // Get default color when colors are loaded
  useEffect(() => {
    setCourseData({
      ...initialCourseData,
      color: colors.length ? colors[colorIndex]._id : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  // Controll the snackbar
  const [snackbar, setSnackbar] = useState({ open: false, success: false });

  const displaySuccess = () => setSnackbar({ open: true, success: true });
  const displayError = () => setSnackbar({ open: true, success: false });
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeForm();

    const apiResponsePromise = dispatch(createCourse(courseData));

    // Display success or error snackbar
    apiResponsePromise.then(({ success }) => {
      if (success) {
        displaySuccess();
      } else {
        displayError();
      }
    });

    // Clean project data
    setCourseData(initialCourseData);
  };

  const getNextColor = () => {
    return colors[colorIndex]?.hex;
  };

  const changeColor = () => {
    const newIndex = (colorIndex + 1) % colors.length;
    setColorIndex(newIndex);
    setCourseData({ ...courseData, color: colors[newIndex]?._id });
  };

  return (
    <>
      <Dialog open={open} onClose={closeForm} TransitionComponent={Transition} keepMounted>
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

              <Stack direction="row" justifyContent="flex-star" alignItems="center" spacing={1}>
                <Button variant="colorButton" onClick={changeColor}>
                  New Color
                </Button>
                <CircleIcon style={{ color: getNextColor() }} />
              </Stack>
            </Stack>
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

      <CustomSnackbar
        open={snackbar.open}
        onClose={closeSnackbar}
        severity={snackbar.success ? "success" : "error"}
        message={snackbar.success ? "Course created successfully!" : "Error creating course. Try again later!"}
      />
    </>
  );
};

export default CourseForm;
