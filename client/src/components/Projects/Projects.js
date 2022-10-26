import { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import Project from "./Project/Project";
import useStyles from "./styles.js";
import OrderProjects from "./OrderProjects/OrderProjects";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { deleteProject } from "../../store/actions/projects";

const typeSeverity = {
  0: "info",
  1: "success",
  2: "error",
};

const Projects = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Controll the snackbar
  const [snackbar, setSnackbar] = useState({ open: false, type: 0 });

  const displayInfo = (infoMessage) => setSnackbar({ open: true, type: 0, message: infoMessage });
  const displaySuccess = () =>
    setSnackbar({
      open: true,
      type: 1,
      message: "Project deleted successfully",
    });
  const displayError = () =>
    setSnackbar({
      open: true,
      type: 2,
      message: "Error deleting project. Try again later!",
    });
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const { projects, loadedData } = useSelector((state) => state.projects);
  // Sorted projects which will be displayed
  const [sortedProjects, setSortedProjects] = useState([]);

  const projectItems = sortedProjects?.map((project) => (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Project project={project} displaySuccess={displaySuccess} displayError={displayError}></Project>
    </Grid>
  ));

  // Check for expired projects
  // Only run when projects are loaded for the first time
  useEffect(() => {
    let expiredProjectsExist = false;
    let message = "Deadline reached:";
    const toDeleteIds = [];
    projects.forEach((project) => {
      // Project due date has passed
      if (moment(project.dueDate).isBefore(new Date())) {
        expiredProjectsExist = true;
        message += ` ${project.name} due ${moment(project.dueDate).fromNow()} |`;
        // Delete overdue project
        toDeleteIds.push(project._id);
      }
    });
    // There was at least one expired project, display info snackbar
    if (expiredProjectsExist) {
      displayInfo(message);
    }

    toDeleteIds.forEach((id) => dispatch(deleteProject(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedData]);

  return (
    <div className={classes.projectsBox}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
        <Typography className={classes.title} variant="h4">
          My Projects
        </Typography>
        <OrderProjects originalProjects={projects} projects={sortedProjects} setProjects={setSortedProjects} />
      </Stack>
      {!projects.length && <CircularProgress />}
      <Grid container justifyContent="flex-start" alignItems="center" rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 5, lg: 5 }}>
        {projectItems}
      </Grid>

      <CustomSnackbar open={snackbar.open} onClose={closeSnackbar} severity={typeSeverity[snackbar.type]} message={snackbar.message} />
    </div>
  );
};

export default Projects;
