import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Project from "./Project/Project";
import useStyles from "./styles.js";
import useGlobalStyles from "../../globalStyles";

const Projects = () => {
  const classes = useStyles();
  const global = useGlobalStyles();

  const projects = useSelector((state) => state.projects);
  const sortedProjects = projects.sort((projectA, projectB) => Number(new Date(projectA.dueDate)) - Number(new Date(projectB.dueDate)));

  const projectItems = sortedProjects.map((project) => (
    <Grid item xs={3}>
      <Project project={project}></Project>
    </Grid>
  ));

  return (
    <div className={classes.projectsBox}>
      <Typography className={classes.title} variant="h4">
        My Projects
      </Typography>
      <Grid container justifyContent="flex-start" alignItems="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        {projectItems}
      </Grid>
    </div>
  );
};

export default Projects;
