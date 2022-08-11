import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS, ADD_INTEREST, REMOVE_INTEREST, ADD_SKILL, REMOVE_SKILL, ADD_RESUME, INCREASE_STEP, DECREASE_STEP} from "./signUpTypes";
import { SET_EMAIL, SET_PASSWORD, CLEAR_DATA } from "./signUpTypes";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  year: "",
  major: "",
  campus: "",
  interests: [],
  skills: [],
  resume: null,
  step: 1,
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

    case ADD_INTEREST: return {
      ...state,
      interests: [...state.interests, action.payload]
    }

    case REMOVE_INTEREST: return {
      ...state,
      interests: state.interests.filter((interest) => interest !== action.payload),
    }

    case ADD_SKILL: return {
      ...state,
      skills: [...state.skills, action.payload]
    }

    case REMOVE_SKILL: return {
      ...state,
      skills: state.skills.filter((skill) => skill !== action.payload),
    }

    case ADD_RESUME: return {
      ...state,
      resume: action.payload,
    }

    case SET_EMAIL: return {
      ...state,
      email: action.payload,
    }

    case SET_PASSWORD: return {
      ...state,
      password: action.payload,
    }

    case INCREASE_STEP: return {
      ...state,
      step: state.step + 1,
    }

    case DECREASE_STEP: return {
      ...state,
      step: state.step - 1
    }
  
    case CLEAR_DATA:
      return initialState;
    
    default: return state;
  }
}

export default signUpReducer;