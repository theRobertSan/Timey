import React, { useState } from "react";
import { Typography, Grid, Divider, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";

import useStyles from "./styles.js";
import useGlobalStyles from "../../../globalStyles";

const Project = ({ project }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const global = useGlobalStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(project);
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

        <IconButton onClick={handleClickOpen}>
          <InfoIcon fontSize="large" className={classes.infoIcon} />
        </IconButton>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{project.name}</DialogTitle>

        <DialogContent>
          <DialogContentText className={classes.infoDialog}>{project.description}</DialogContentText>

          <DialogContentText>Due before {moment(project.dueDate).format("MMMM Do YYYY, h:mm a")}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Project;
