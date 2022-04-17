import { SET_PROJECT_NAME, SET_PROJECT_DESC, SET_TEAM_SIZE, SET_PROJECT_DUR, SET_PROJECT_STATUS, ADD_PROJECT_CATEG, ADD_LOCATION } from "./createProjectTypes";
import { ADD_ROLE } from "./createProjectTypes";

const initialState = {
  projName: "",
  projDesc: "",
  teamSize: "",
  projDur: "",
  projStatus: "",
  projCategs: [],
  roles: [],
  location: ""
}

const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_NAME: return {
      ...state,
      projName: action.payload
    }

    case SET_PROJECT_DESC: return {
      ...state,
      projDesc: action.payload
    }

    case SET_TEAM_SIZE: return {
      ...state,
      teamSize: action.payload
    }

    case SET_PROJECT_DUR: return {
      ...state,
      projDur: action.payload
    }

    case SET_PROJECT_STATUS: return {
      ...state,
      projStatus: action.payload
    }

    case ADD_PROJECT_CATEG: return {
      ...state,
      projCategs: [...state.projCategs, action.payload]
    }

    case ADD_ROLE: return {
      ...state,
      roles: [...state.roles, action.payload]
    }

    case ADD_LOCATION: return {
      ...state,
      location: action.payload
    }

    default: return state;
  }
}

export default createProjectReducer;