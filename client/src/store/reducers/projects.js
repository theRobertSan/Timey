import {
	CREATE_PROJECT,
	DELETE_PROJECT,
	GET_PROJECTS,
	UPDATE_PROJECT,
} from "../constants/actionTypes";

const reducer = (
	state = { projects: [], loadedData: false },
	{ type, payload }
) => {
	switch (type) {
		case GET_PROJECTS:
			return { projects: payload, loadedData: true };
		case CREATE_PROJECT:
			return { ...state, projects: [...state.projects, payload] };
		case UPDATE_PROJECT:
			return {
				...state,
				projects: state.projects.map((project) =>
					project._id === payload._id ? payload : project
				),
			};
		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter((project) => project._id !== payload),
			};
		default:
			return state;
	}
};

export default reducer;
