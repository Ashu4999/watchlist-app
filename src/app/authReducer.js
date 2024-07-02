import { getItem } from "../lib/store";
let auth = getItem("auth");
const initialState = {
  isAuthenticated: auth && auth.isAuthenticated ? auth.isAuthenticated : false,
  email: auth && auth.email ? auth.email : null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, email: action.payload.email };
    case "LOGOUT":
      return { isAuthenticated: false, email: null };
    default:
      return state;
  }
};

export default authReducer;
