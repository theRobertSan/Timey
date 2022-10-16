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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Importance from "./Importance/Importance";

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
	// Project Data
	const [projectData, setProjectData] = useState(initialProjectData);
	// Controll the opening of the dialog box
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		// Clean project data
		setProjectData(initialProjectData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpen(false);
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
				<DialogTitle>Create Project</DialogTitle>

				<DialogContent>
					<form>
						<Stack spacing={1}>
							{/* Name */}
							<TextField
								autoFocus
								margin="dense"
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
								margin="dense"
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
							<TextField
								select
								margin="dense"
								label="RelatedCourse"
								name="relatedCourse"
								value={projectData.course}
								onChange={(e) =>
									setProjectData({ ...projectData, course: e.target.value })
								}
							>
								<MenuItem value={10}>Course 1</MenuItem>
								<MenuItem value={20}>Course 2</MenuItem>
							</TextField>

							{/* Date & Hour Selection */}
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									required
									label="Due Date"
									inputFormat="DD/MM/YYYY"
									value={projectData.dueDate}
									onChange={(newDate) => {
										setProjectData({ ...projectData, dueDate: newDate });
										console.log(newDate);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>

								<TimePicker
									label="Due Time"
									value={projectData.dueTime}
									onChange={(newTime) => {
										setProjectData({ ...projectData, dueTime: newTime });
										console.log(newTime);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>

							{/* Date & Hour Selection */}
							<Importance
								projectData={projectData}
								setProjectData={setProjectData}
							/>
						</Stack>
					</form>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="contained" type="submit" onClick={handleSubmit}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProjectForm;
