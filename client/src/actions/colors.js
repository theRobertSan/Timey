import { GET_COLORS } from "../constants/actionTypes";
import * as api from "../api/colorApi";

export const getColors = () => async (dispatch) => {
  try {
    const { data } = await api.getColors();

    dispatch({ type: GET_COLORS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
