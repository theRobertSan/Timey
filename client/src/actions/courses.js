import { GET_COURSES, CREATE_COURSE } from "../constants/actionTypes";
import * as api from "../api/courseApi";

export const getCourses = () => async (dispatch) => {
  try {
    const { data } = await api.getCourses();

    dispatch({ type: GET_COURSES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = (course) => async (dispatch) => {
  try {
    const { status, data } = await api.createCourse(course);

    // Course not created
    if (status !== 201) {
      return { success: false };
    }

    dispatch({ type: CREATE_COURSE, payload: data });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
