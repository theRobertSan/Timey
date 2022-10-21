import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";

const OrderProjects = ({ originalProjects, projects, setProjects }) => {
  const [sortMode, setSortMode] = useState(0);

  // If redux projects are changed, sort again
  useEffect(() => {
    sortBy(sortMode, originalProjects);
  }, [originalProjects]);

  // Mode of sorting changed, sort again
  const handleChange = (event) => {
    const selectedSortMode = event.target.value;
    setSortMode(selectedSortMode);
    sortBy(selectedSortMode, projects);
  };

  const sortBy = (mode, projectsToSort) => {
    const sortedProjects = [...projectsToSort];

    switch (mode) {
      case 0:
        sortedProjects.sort((projectA, projectB) => Number(new Date(projectA.dueDate)) - Number(new Date(projectB.dueDate)));
        break;
      case 1:
        sortedProjects.sort((projectA, projectB) => Number(new Date(projectB.dueDate)) - Number(new Date(projectA.dueDate)));
        break;
      case 2:
        sortedProjects.sort((projectA, projectB) => projectB.difficulty - projectA.difficulty);
        break;
      default:
        sortedProjects.sort((projectA, projectB) => projectA.difficulty - projectB.difficulty);
    }
    setProjects(sortedProjects);
  };

  return (
    <>
      <TextField select value={sortMode} label="Sort By" onChange={handleChange}>
        <MenuItem value={0}>Closest Date</MenuItem>
        <MenuItem value={1}>Latest Date</MenuItem>
        <MenuItem value={2}>Hardest first</MenuItem>
        <MenuItem value={3}>Easiest first</MenuItem>
      </TextField>
    </>
  );
};

export default OrderProjects;
