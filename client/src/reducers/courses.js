import { CREATE_COURSE, GET_COURSES } from "../constants/actionTypes";

export default (courses = [], { type, payload }) => {
	switch (type) {
		case GET_COURSES:
			return payload;
		case CREATE_COURSE:
			return [...courses, payload];
		default:
			return courses;
	}
};
