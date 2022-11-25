import axios from "axios";

const url = "https://timey-server.onrender.com/courses";

export const getCourses = () => axios.get(url);
export const createCourse = (newCourse) => axios.post(url, newCourse);
