import React from "react";
import {
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Select,
	MenuItem,
	Stack,
	InputLabel,
	FormControl,
	Slide,
	Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Importance from "./Importance/Importance";

import { createProject } from "../../../actions/projects";
import CourseSelector from "./CourseSelector/CourseSelector";

const initialProjectData = {
	name: "",
	description: "",
	course: "",
	dueDate: "",
	dueTime: "",
	importance: 2,
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectForm = () => {
	const dispatch = useDispatch();
	// Project Data
	const [projectData, setProjectData] = useState(initialProjectData);
	// Controll the opening of the dialog box
	const [open, setOpen] = useState(false);

	// Controll importance label
	const [hover, setHover] = useState(2);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setHover(2);
		// Clean project data
		setProjectData(initialProjectData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpen(false);
		setHover(2);

		dispatch(createProject(projectData));

		// Clean project data
		setProjectData(initialProjectData);
	};

	return (
		<>
			<Button variant="contained" onClick={handleClickOpen}>
				Create Project
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle variant="h5">
					<Typography variant="inherit" align="center">
						Create Project
					</Typography>
				</DialogTitle>
				<form autoComplete="off" onSubmit={handleSubmit}>
					<DialogContent>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<Stack spacing={2}>
								{/* Name */}
								<TextField
									autoFocus
									fullWidth
									required
									label="Name"
									name="name"
									value={projectData.name}
									onChange={(e) =>
										setProjectData({ ...projectData, name: e.target.value })
									}
								/>

								{/* Description */}
								<TextField
									fullWidth
									label="Description"
									name="description"
									value={projectData.description}
									onChange={(e) =>
										setProjectData({
											...projectData,
											description: e.target.value,
										})
									}
								/>

								{/* Course Selection */}
								<CourseSelector
									projectData={projectData}
									setProjectData={setProjectData}
								/>

								{/* Date Selection */}
								<DesktopDatePicker
									label="Due Date"
									inputFormat="DD/MM/YYYY"
									value={projectData.dueDate || null}
									onChange={(newDate) => {
										setProjectData({ ...projectData, dueDate: newDate._d });
									}}
									renderInput={(params) => <TextField required {...params} />}
								/>

								{/* Time Selection */}
								<TimePicker
									label="Due Time"
									value={projectData.dueTime || null}
									onChange={(newTime) => {
										setProjectData({ ...projectData, dueTime: newTime });
										console.log(newTime._d);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>

								{/* Importance Selection */}
								<Importance
									projectData={projectData}
									setProjectData={setProjectData}
									hover={hover}
									setHover={setHover}
								/>
							</Stack>
						</LocalizationProvider>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default ProjectForm;
