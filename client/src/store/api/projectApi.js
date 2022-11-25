import axios from "axios";
import moment from "moment";

const url = "https://timey-server.onrender.com/projects";

export const createProject = (newProject) => {
  let projectToSend;

  if (newProject.dueTime) {
    // Join date & hour
    projectToSend = {
      ...newProject,
      dueDate: `${moment(newProject.dueDate).format("YYYY-MM-DD")}T${moment(newProject.dueTime).format("HH:mm")}`,
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

export const updateProject = (project) => {
  let projectToSend;

  if (project.dueTime) {
    // Join date & hour
    projectToSend = {
      ...project,
      dueDate: `${moment(project.dueDate).format("YYYY-MM-DD")}T${moment(project.dueTime).format("HH:mm")}Z`,
    };
  } else {
    projectToSend = {
      ...project,
      dueDate: `${moment(project.dueDate).format("YYYY-MM-DD")}Z`,
    };
  }

  delete projectToSend.dueTime;
  return axios.patch(`${url}/${project._id}`, projectToSend);
};

export const getProjects = () => axios.get(url);

export const deleteProject = (id) => axios.delete(`${url}/${id}`);
