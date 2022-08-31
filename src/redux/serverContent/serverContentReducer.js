
import { SET_INTERESTS_LIST, SET_SKILLS_LIST, SET_MAJORS_LIST, SET_PROJ_CATEGS_LIST  } from "./serverContentTypes";

const initialState = {
  interestsList: [],
  skillsList: [],
  majorsList: [],
  projCategsList: []
}

const serverContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERESTS_LIST: return {
      ...state,
      interestsList: action.payload
    }

    case SET_SKILLS_LIST: return {
      ...state,
      skillsList: action.payload
    }

    case SET_MAJORS_LIST: return {
      ...state,
      majorsList: action.payload
    }
    
    case SET_PROJ_CATEGS_LIST: return {
      ...state,
      projCategsList: action.payload
    }

    default: return state;
  }
}

export default serverContentReducer;