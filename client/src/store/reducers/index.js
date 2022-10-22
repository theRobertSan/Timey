import { combineReducers } from "redux";

import projects from "./projects";
import courses from "./courses";
import colors from "./colors";

export const reducers = combineReducers({ projects, courses, colors });
