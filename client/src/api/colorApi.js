import axios from "axios";

const url = "http://localhost:5000/colors";

export const getColors = () => axios.get(url);
