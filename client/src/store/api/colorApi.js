import axios from "axios";

const url = "https://timey-server.onrender.com/colors";

export const getColors = () => axios.get(url);
