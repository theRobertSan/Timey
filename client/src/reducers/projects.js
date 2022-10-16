import { CREATE_PROJECT } from "../constants/actionTypes";

export default (projects = [], { type, payload }) => {
	switch (type) {
		case CREATE_PROJECT:
			console.log(payload);
			return [...projects, payload];
		default:
			return projects;
	}
};
