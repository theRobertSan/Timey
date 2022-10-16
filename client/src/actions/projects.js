import { CREATE_PROJECT } from "../constants/actionTypes";
import * as api from "../api/projectApi";

export const createProject = (project) => async (dispatch) => {
	try {
		const { data } = await api.createProject(project);

		dispatch({ type: CREATE_PROJECT, payload: data });
	} catch (error) {
		console.log(error);
	}
};
