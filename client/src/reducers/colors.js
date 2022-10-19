import { GET_COLORS } from "../constants/actionTypes";

const reducer = (colors = [], { type, payload }) => {
  switch (type) {
    case GET_COLORS:
      return payload;
    default:
      return colors;
  }
};

export default reducer;
