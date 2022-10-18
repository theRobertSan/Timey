import { Typography, Paper } from "@mui/material";
import moment from "moment";

const Project = ({ project }) => {
  return (
    <>
      <Paper elevation={3}>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="h6">{project.description}</Typography>
        <Typography variant="body2">{moment(project.dueDate).fromNow()}</Typography>
      </Paper>
    </>
  );
};

export default Project;
