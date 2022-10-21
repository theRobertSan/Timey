import { useEffect, useState } from "react";
import { Grid, Stack, Typography, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

import Project from "./Project/Project";
import useStyles from "./styles.js";
import useGlobalStyles from "../../globalStyles";
import OrderProjects from "./OrderProjects/OrderProjects";

const Projects = () => {
  const classes = useStyles();
  const global = useGlobalStyles();

  const projects = useSelector((state) => state.projects);
  console.log(projects);

  const [sortedProjects, setSortedProjects] = useState([]);

  const projectItems = sortedProjects?.map((project) => (
    <Grid item xs={3}>
      <Project project={project}></Project>
    </Grid>
  ));

  console.log(projectItems);

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
    </div>
  );
};

export default Projects;
