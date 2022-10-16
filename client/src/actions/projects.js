import { CREATE_PROJECT } from "../constants/actionTypes";
import * as api from "../api";

export const createProject = (project) => async (dispatch) => {
	try {
		const createdProject = await api.createProject(project);

		dispatch({ type: CREATE_PROJECT, payload: createdProject });
	} catch (error) {
		console.log(error);
	}
};
