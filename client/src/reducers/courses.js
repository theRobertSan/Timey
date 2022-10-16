import { GET_COURSES } from "../constants/actionTypes";

export default (courses = [], { type, payload }) => {
	switch (type) {
		case GET_COURSES:
			return payload;
		default:
			return courses;
	}
};
