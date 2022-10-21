import { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
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

  return (
    <div className={classes.projectsBox}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title} variant="h4">
          My Projects
        </Typography>
        <OrderProjects originalProjects={projects} projects={sortedProjects} setProjects={setSortedProjects} />
      </Stack>
      <Grid container justifyContent="flex-start" alignItems="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        {projectItems}
      </Grid>
    </div>
  );
};

export default Projects;
