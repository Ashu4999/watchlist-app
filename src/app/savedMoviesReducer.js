import { getItem } from "../lib/store";
let data = getItem("savedData");
const initialState = data || [];

const savedMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVED_MOIVE_CHANGE":
      return action.payload;
    default:
      return state;
  }
};

export default savedMoviesReducer;
