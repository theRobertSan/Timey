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

  // Controll the opening of the dialog box
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
            Keep things on track
          </Typography>
        </Grid>

        <Grid item xs="3">
          <Button className={global.sideButton} onClick={handleClickOpen}>
            Create Project
          </Button>
          <ProjectForm open={open} setOpen={setOpen} />
          <CourseForm />
        </Grid>

        <Grid item xs="5">
          <Typography className={classes.coursesTitle} variant="h4">
            My Courses
          </Typography>
          <Courses />
        </Grid>

        <Grid item xs="1">
          <Button className={global.sideButton} href="https://github.com/theRobertSan/Timey">
            Code on GitHub
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
