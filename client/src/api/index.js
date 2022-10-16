import axios from "axios";
import moment from "moment";

const url = "http://localhost:5000";

export const createProject = (newProject) => {
	const projectToSend = {
		...newProject,
		dueDate: `${moment(newProject.dueDate).format("YYYY-MM-DD")}T${moment(
			newProject.dueTime
		).format("HH:mm")}Z`,
	};
	delete projectToSend.dueTime;
	console.log(projectToSend);
	return axios.post(`${url}/projects`, projectToSend);
};
