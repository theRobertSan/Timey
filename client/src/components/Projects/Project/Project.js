import React, { useState } from "react";
import { SpeedDialIcon, SpeedDial, SpeedDialAction, Typography, Grid, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import useStyles from "./styles.js";
import ProjectForm from "../../Sidebar/ProjectForm/ProjectForm.js";
import { deleteProject } from "../../../store/actions/projects.js";

const convert = ({ _id, name, description, course, dueDate, difficulty }) => ({
  _id,
  name,
  description,
  course: course._id,
  dueDate: new Date(dueDate),
  dueTime: new Date(dueDate),
  difficulty,
});

const difficultyLabels = {
  1: "Easy",
  2: "Average",
  3: "Hard",
  4: "Very Hard",
};

const Project = ({ project, displaySuccess, displayError }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const actions = [
    { icon: <InfoIcon />, name: "Details", onClick: () => displayDetails() },
    { icon: <EditIcon />, name: "Edit", onClick: () => displayEdit() },
    { icon: <DeleteIcon />, name: "Delete", onClick: () => removeProject() },
  ];

  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const closeOptions = () => setOpenSpeedDial(false);
  const displayOptions = (event, reason) => {
    if (reason === "toggle") {
      setOpenSpeedDial(true);
    }
  };

  const [openDetails, setOpenDetails] = useState(false);
  const displayDetails = () => setOpenDetails(true);
  const closeDetails = () => setOpenDetails(false);

  const [openEdit, setOpenEdit] = useState(false);
  const displayEdit = () => setOpenEdit(true);
  const closeEdit = () => setOpenEdit(false);

  const removeProject = () => {
    const apiResponsePromise = dispatch(deleteProject(project._id));

    // Display success or error snackbar
    apiResponsePromise.then(({ success }) => {
      if (success) {
        displaySuccess();
      } else {
        displayError();
      }
    });
  };

  return (
    <>
      <Stack style={{ backgroundColor: project.course.color.hex }} className={classes.projectBox} direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
        <Grid container direction="column" justifyContent="space-around" alignItems="space-around">
          <Grid item>
            <Typography className={classes.courseTitle} variant="body1">
              {project.course.name}
            </Typography>

            <Typography className={classes.projectTitle} variant="h4">
              {project.difficulty === 4 && <WarningAmberIcon />}
              {project.difficulty === 4 && " "}
              {project.name}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.projectDueDate} variant="body1">
              {moment(project.dueDate).fromNow()}
            </Typography>
          </Grid>
        </Grid>

        <SpeedDial
          onOpen={displayOptions}
          onClose={closeOptions}
          open={openSpeedDial}
          FabProps={{ className: classes.speedDial }}
          ariaLabel="Options"
          icon={<SpeedDialIcon className={classes.optionsButton} />}
        >
          {actions.map((action) => (
            <SpeedDialAction onClick={action.onClick} key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </Stack>

      <Dialog open={openDetails} onClose={closeDetails}>
        <DialogTitle>{project.name}</DialogTitle>

        <DialogContent>
          <Typography>Description:</Typography>
          <DialogContentText>{project.description ? project.description : "None"}</DialogContentText>

          <Typography>Course:</Typography>
          <DialogContentText>{project.course.name}</DialogContentText>

          <Typography>Difficulty:</Typography>
          <DialogContentText>{difficultyLabels[project.difficulty]}</DialogContentText>

          <Typography>Deadline</Typography>
          <DialogContentText>{moment(project.dueDate).format("MMMM Do YYYY, hh:mm a")}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDetails} variant="cancelButton">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ProjectForm open={openEdit} closeForm={closeEdit} currentProject={convert(project)} />
    </>
  );
};

export default Project;
