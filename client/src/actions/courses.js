import { GET_COURSES } from "../constants/actionTypes";
import * as api from "../api/courseApi";

export const getCourses = () => async (dispatch) => {
	try {
		const { data } = await api.getCourses();

		dispatch({ type: GET_COURSES, payload: data });
	} catch (error) {
		console.log(error);
	}
};
