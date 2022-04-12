import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS, ADD_INTEREST, REMOVE_INTEREST, ADD_SKILL, REMOVE_SKILL} from "./signUpTypes";


const initialState = {
  fullName: "",
  year: "",
  major: "",
  campus: "",
  interests: [],
  skills: [],
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
    
    default: return state;
  }
}

export default signUpReducer;