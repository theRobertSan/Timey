import axios from "axios";
import moment from "moment";

const url = "http://localhost:5000/courses";

export const getCourses = () => axios.get(url);
export const createCourse = (newCourse) => axios.post(url, newCourse);
