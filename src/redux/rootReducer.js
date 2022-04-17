import { combineReducers } from "redux";
import signUpReducer from "./signUp/signUpReducer";
import serverContentReducer from "./serverContent/serverContentReducer";
import createProjectReducer from "./createProject/createProjectReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer,
  createProj: createProjectReducer,
  serverContent: serverContentReducer
});

export default rootReducer;