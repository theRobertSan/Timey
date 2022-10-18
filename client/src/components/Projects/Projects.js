import { Typography, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Project from "./Project/Project";

const Projects = () => {
  const projects = useSelector((state) => state.projects);
  const sortedProjects = projects.sort((projectA, projectB) => Number(new Date(projectA.dueDate)) - Number(new Date(projectB.dueDate)));

  if (projects[0]) {
    console.log(Number(new Date(projects[0].dueDate)));
  }
  const projectItems = sortedProjects.map((project) => <Project project={project}></Project>);

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        {projectItems}
      </Stack>
    </>
  );
};

export default Projects;
