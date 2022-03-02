import { combineReducers } from "redux";
import signUpReducer from "./signUp/signUpReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer
});

export default rootReducer;