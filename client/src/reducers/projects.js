import { CREATE_PROJECT, GET_PROJECTS, UPDATE_PROJECT } from "../constants/actionTypes";

const reducer = (projects = [], { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return payload;
    case CREATE_PROJECT:
      return [...projects, payload];
    case UPDATE_PROJECT:
      return projects.map((project) => (project._id === payload._id ? payload : project));
    default:
      return projects;
  }
};

export default reducer;
