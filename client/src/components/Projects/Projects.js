import { useEffect, useState } from "react";
import { Grid, Stack, Typography, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";

import Project from "./Project/Project";
import useStyles from "./styles.js";
import useGlobalStyles from "../../globalStyles";
import OrderProjects from "./OrderProjects/OrderProjects";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { deleteProject } from "../../actions/projects";

const Projects = () => {
  const classes = useStyles();
  const global = useGlobalStyles();

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects);

  const expiredProjects = [];
  const [overdueMessage, setOverdueMessage] = useState("Deadline Passed:");

  // Check for expired projects
  useEffect(() => {
    console.log(projects);
    projects.forEach((project) => {
      // Project due date has passed
      if (moment(project.dueDate).isBefore(new Date())) {
        expiredProjects.push(project);
        setOverdueMessage((message) => (message += ` ${project.name} due ${moment(project.dueDate).fromNow()} |`));
        dispatch(deleteProject(project._id));
      }
    });

    console.log(expiredProjects);
    if (expiredProjects.length > 0) {
      displaySnackbar();
    }
  }, [projects]);

  // Controll the snackbar
  const [snackbar, setSnackbar] = useState(false);

  const displaySnackbar = () => {
    console.log("1");
    setSnackbar(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const [sortedProjects, setSortedProjects] = useState([]);

  const projectItems = sortedProjects?.map((project) => (
    <Grid item xs={3}>
      <Project project={project}></Project>
    </Grid>
  ));

  return (
    <div className={classes.projectsBox}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
        <Typography className={classes.title} variant="h4">
          My Projects
        </Typography>
        <OrderProjects originalProjects={projects} projects={sortedProjects} setProjects={setSortedProjects} />
      </Stack>
      <Grid container justifyContent="flex-start" alignItems="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        {projectItems.length !== 0 ? projectItems : <LinearProgress />}
      </Grid>

      <CustomSnackbar open={snackbar} onClose={closeSnackbar} severity="info" message={overdueMessage} />
    </div>
  );
};

export default Projects;
