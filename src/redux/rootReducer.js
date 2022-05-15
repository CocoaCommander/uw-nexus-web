import { combineReducers } from "redux";
import signUpReducer from "./signUp/signUpReducer";
import serverContentReducer from "./serverContent/serverContentReducer";
import createProjectReducer from "./createProject/createProjectReducer";
import userStateReducer from "./userState/userStateReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer,
  createProj: createProjectReducer,
  serverContent: serverContentReducer,
  userState: userStateReducer
});

export default rootReducer;