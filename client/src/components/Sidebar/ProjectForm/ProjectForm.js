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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

const ProjectForm = () => {
	// Project Data
	const [projectData, setProjectData] = useState({
		name: "",
		description: "",
		course: "",
		dueDate: "",
		importance: "",
	});
	// Variable to controll the opening of the dialog box
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		// Clean project data
		setProjectData({
			name: "",
			description: "",
			course: "",
			dueDate: "",
			importance: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Button variant="contained" onClick={handleClickOpen}>
				Create Project
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<form>
					<DialogTitle>Create Project</DialogTitle>

					<DialogContent>
						<FormControl fullWidth>
							{/* Name */}
							<TextField
								fullWidth
								autoFocus
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

							<Select
								label="RelatedCourse"
								name="relatedCourse"
								value={projectData.course}
								onChange={(e) =>
									setProjectData({ ...projectData, course: e.target.value })
								}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Two</MenuItem>
							</Select>

							{/* Date Selection */}
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									label="Due Date"
									inputFormat="DD/MM/YYYY"
									value={projectData.dueDate}
									onChange={(newDate) => {
										setProjectData({ ...projectData, dueDate: newDate });
										console.log(newDate);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit" onClick={handleSubmit}>
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default ProjectForm;
