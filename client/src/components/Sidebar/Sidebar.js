import { Stack } from "@mui/material";
import CourseForm from "./CourseForm/CourseForm";
import ProjectForm from "./ProjectForm/ProjectForm";

const Sidebar = () => {
	return (
		<>
			<h1>Timey</h1>
			<Stack spacing={2} justifyContent="flex-start" alignItems="flex-start">
				<ProjectForm />
				<CourseForm />
			</Stack>
		</>
	);
};

export default Sidebar;
