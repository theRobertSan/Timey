import React, { useState } from "react";
import { SpeedDialIcon, SpeedDial, SpeedDialAction, Typography, Grid, Divider, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";

import useStyles from "./styles.js";
import useGlobalStyles from "../../../globalStyles";
import ProjectForm from "../../Sidebar/ProjectForm/ProjectForm.js";
import { deleteProject } from "../../../actions/projects.js";

const convert = ({ _id, name, description, course, dueDate, importance }) => ({
  _id,
  name,
  description,
  course: course._id,
  dueDate: new Date(dueDate),
  dueTime: new Date(dueDate),
  importance,
});

const Project = ({ project }) => {
  const classes = useStyles();
  const global = useGlobalStyles();

  const dispatch = useDispatch();

  const actions = [
    { icon: <InfoIcon />, name: "Details", onClick: () => displayDetails() },
    { icon: <EditIcon />, name: "Edit", onClick: () => displayEdit() },
    { icon: <DeleteIcon />, name: "Delete", onClick: () => removeProject() },
  ];

  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const displayOptions = (event, reason) => {
    if (reason === "toggle") {
      setOpenSpeedDial(true);
    }
  };
  const closeOptions = () => {
    setOpenSpeedDial(false);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const displayDetails = () => setOpenDetails(true);
  const closeDetails = () => setOpenDetails(false);

  const displayEdit = () => setOpenEdit(true);
  const closeEdit = () => setOpenEdit(false);

  const removeProject = () => {
    dispatch(deleteProject(project._id));
  };

  return (
    <>
      <Stack style={{ backgroundColor: project.course.color.hex }} className={classes.projectBox} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid container direction="column" justifyContent="space-around" alignItems="space-around">
          <Grid item>
            {project.course.name}
            <Typography className={classes.projectTitle} variant="h4">
              {project.name}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.projectDueDate} variant="body1">
              {moment(project.dueDate).fromNow()}
            </Typography>
          </Grid>
        </Grid>

        {/* <IconButton onClick={handleClickOpen}>
          <InfoIcon fontSize="large" className={classes.infoIcon} />
        </IconButton> */}
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
          <DialogContentText className={classes.infoDialog}>{project.description}</DialogContentText>

          <DialogContentText>Due before {moment(project.dueDate).format("MMMM Do YYYY, h:mm a")}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      <ProjectForm open={openEdit} setOpen={setOpenEdit} currentProject={convert(project)} />
    </>
  );
};

export default Project;
