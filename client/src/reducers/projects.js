import { CREATE_PROJECT, GET_PROJECTS } from "../constants/actionTypes";

const reducer = (projects = [], { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return payload;
    case CREATE_PROJECT:
      return [...projects, payload];
    default:
      return projects;
  }
};

export default reducer;
