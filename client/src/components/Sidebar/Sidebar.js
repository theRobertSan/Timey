import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

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
      <Stack className={classes.sideBar} container direction="column" justifyContent="flex-start" spacing={4} alignItems="center">
        <div>
          <Typography className={classes.title} variant="h2">
            Timey
          </Typography>
          <Typography className={classes.subtitle} variant="body2">
            Never lose track
          </Typography>
        </div>
        <Button className={global.sideButton} onClick={displayProjectForm}>
          Create Project
        </Button>
        <ProjectForm open={openProjectForm} closeForm={closeProjectForm} />

        <Button className={global.sideButton} onClick={displayCourseForm}>
          Add Course
        </Button>
        <CourseForm open={openCourseForm} closeForm={closeCourseForm} />

        <Typography className={classes.coursesTitle} variant="h4">
          My Courses
        </Typography>
        <Courses />

        <Button className={global.sideButton} href="https://github.com/theRobertSan/Timey">
          Code on GitHub
        </Button>
        <div className={classes.madeBy}>
          <Typography variant="body2">Made By</Typography>
          <Typography variant="body1">Robert Morosan</Typography>
        </div>
      </Stack>
    </>
  );
};

export default Sidebar;
