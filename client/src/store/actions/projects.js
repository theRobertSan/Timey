import { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../constants/actionTypes";
import * as api from "../api/projectApi";

export const createProject = (project) => async (dispatch) => {
  try {
    const { status, data } = await api.createProject(project);

    // Project not created
    if (status !== 201) {
      return { success: false };
    }

    dispatch({ type: CREATE_PROJECT, payload: data });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await api.getProjects();

    dispatch({ type: GET_PROJECTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = (project) => async (dispatch) => {
  try {
    const { status, data } = await api.updateProject(project);

    // Project not created
    if (status !== 200) {
      return { success: false };
    }

    dispatch({ type: UPDATE_PROJECT, payload: data });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const { status } = await api.deleteProject(id);

    // Project not created
    if (status !== 200) {
      return { success: false };
    }

    dispatch({ type: DELETE_PROJECT, payload: id });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
