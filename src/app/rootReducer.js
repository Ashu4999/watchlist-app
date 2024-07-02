// rootReducer.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import savedMoviesReducer from "./savedMoviesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  savedMovies: savedMoviesReducer,
});

export default rootReducer;
