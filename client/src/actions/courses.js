import { GET_COURSES, CREATE_COURSE } from "../constants/actionTypes";
import * as api from "../api/courseApi";

export const getCourses = () => async (dispatch) => {
	try {
		const { data } = await api.getCourses();

		dispatch({ type: GET_COURSES, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createCourse = (course) => async (dispatch) => {
	try {
		const { data } = await api.createCourse(course);

		dispatch({ type: CREATE_COURSE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
