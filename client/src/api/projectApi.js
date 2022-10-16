import axios from "axios";
import moment from "moment";

const url = "http://localhost:5000/projects";

export const createProject = (newProject) => {
	// Join date & hour
	const projectToSend = {
		...newProject,
		dueDate: `${moment(newProject.dueDate).format("YYYY-MM-DD")}T${moment(
			newProject.dueTime
		).format("HH:mm")}Z`,
	};
	delete projectToSend.dueTime;

	return axios.post(url, projectToSend);
};
