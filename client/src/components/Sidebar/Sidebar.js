import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import useStyles from "./styles.js";
import useGlobalStyles from "../../globalStyles";
import CourseForm from "./CourseForm/CourseForm";
import ProjectForm from "./ProjectForm/ProjectForm";
import Courses from "./Courses/Courses";

const Sidebar = () => {
  const global = useGlobalStyles();
  const classes = useStyles();

  // Controll the opening of project creation dialog
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const displayProjectForm = () => setOpenProjectForm(true);
  const closeProjectForm = () => setOpenProjectForm(false);

  // Controll the opening of course creation dialog
  const [openCourseForm, setOpenCourseForm] = useState(false);

  const displayCourseForm = () => setOpenCourseForm(true);
  const closeCourseForm = () => setOpenCourseForm(false);

  return (
    <>
      <Grid className={classes.sideBar} container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs="1">
          <Typography className={classes.title} variant="h2">
            Timey
          </Typography>
        </Grid>
        <Grid item xs="1">
          <Typography className={classes.subtitle} variant="body2">
            Never lose track
          </Typography>
        </Grid>

        <Grid item xs="3">
          <Button className={global.sideButton} onClick={displayProjectForm}>
            Create Project
          </Button>
          <ProjectForm open={openProjectForm} closeForm={closeProjectForm} />

          <Button className={global.sideButton} onClick={displayCourseForm}>
            Add Course
          </Button>
          <CourseForm open={openCourseForm} closeForm={closeCourseForm} />
        </Grid>

        <Grid item xs="4">
          <Typography className={classes.coursesTitle} variant="h4">
            My Courses
          </Typography>
          <Courses />
        </Grid>

        <Grid item xs="2">
          <Button className={global.sideButton} href="https://github.com/theRobertSan/Timey">
            Code on GitHub
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
