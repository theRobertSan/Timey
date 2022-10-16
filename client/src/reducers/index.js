import { combineReducers } from "redux";

import projects from "./projects";
import courses from "./courses";

export const reducers = combineReducers({ projects, courses });
