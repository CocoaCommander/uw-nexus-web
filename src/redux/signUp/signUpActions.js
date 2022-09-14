import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS, ADD_INTEREST, REMOVE_INTEREST, ADD_SKILL, REMOVE_SKILL, ADD_RESUME, INCREASE_STEP, DECREASE_STEP} from "./signUpTypes";
import { SET_EMAIL, SET_PASSWORD, CLEAR_DATA, SET_ERROR_MSG } from "./signUpTypes";
export const setFullName = (fullName) => {
  return {
    type: SET_FULL_NAME,
    payload: fullName
  }
}

export const setYear = (year) => {
  return {
    type: SET_YEAR,
    payload: year
  }
}

export const setMajor = (major) => {
  return {
    type: SET_MAJOR,
    payload: major
  }
}

export const setCampus = (campus) => {
  return {
    type: SET_CAMPUS,
    payload: campus,
  }
}

export const addInterest = (interest) => {
  return {
    type: ADD_INTEREST,
    payload: interest
  }
}

export const removeInterest = (interest) => {
  return {
    type: REMOVE_INTEREST,
    payload: interest
  }
}

export const addSkill = (skill) => {
  return {
    type: ADD_SKILL,
    payload: skill
  }
}

export const removeSkill = (skill) => {
  return {
    type: REMOVE_SKILL,
    payload: skill
  }
}

export const addResume = (resume) => {
  return {
    type: ADD_RESUME,
    payload: resume
  }
}

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email
  }
}

export const setPassword = (pass) => {
  return {
    type: SET_PASSWORD,
    payload: pass
  }
}

export const increaseStep = () => {
  return {
    type: INCREASE_STEP,
  }
}

export const decreaseStep = () => {
  return {
    type: DECREASE_STEP,
  }
}

export const setErrorMsg = (msg) => {
  return {
    type: SET_ERROR_MSG,
    payload: msg
  }
}

export const clearAll = () => {
  return {
    type: CLEAR_DATA,
  }
}