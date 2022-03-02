import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS} from "./signUpTypes";


const initialState = {
  fullName: "",
  year: "",
  major: "",
  campus: "",
}

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FULL_NAME: return {
      ...state,
      fullName: action.payload
    }

    case SET_YEAR: return {
      ...state,
      year: action.payload
    }

    case SET_MAJOR: return {
      ...state,
      major: action.payload
    }

    case SET_CAMPUS: return {
      ...state,
      campus: action.payload
    }
    
    default: return state;
  }
}

export default signUpReducer;