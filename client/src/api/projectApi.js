import axios from "axios";
import moment from "moment";

const url = "http://localhost:5000/projects";

export const createProject = (newProject) => {
  let projectToSend;

  if (newProject.dueTime) {
    // Join date & hour
    projectToSend = {
      ...newProject,
      dueDate: `${moment(newProject.dueDate).format("YYYY-MM-DD")}T${moment(newProject.dueTime).format("HH:mm")}Z`,
    };
  } else {
    projectToSend = {
      ...newProject,
      dueDate: `${moment(newProject.dueDate).format("YYYY-MM-DD")}Z`,
    };
  }

  delete projectToSend.dueTime;
  return axios.post(url, projectToSend);
};

export const getProjects = () => axios.get(url);
