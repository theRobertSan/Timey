import { Typography, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const Projects = () => {
  const projects = useSelector((state) => state.projects);
  console.log(projects);
  const projectItems = projects.map((project) => (
    <Paper elevation={3}>
      {project.name}
      <Typography>{project.dueDate}</Typography>
    </Paper>
  ));

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        {projectItems}
      </Stack>
    </>
  );
};

export default Projects;
