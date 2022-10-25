import axios from "axios";

const url = "https://timey-server.herokuapp.com/colors";

export const getColors = () => axios.get(url);
