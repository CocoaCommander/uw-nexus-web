import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS, ADD_INTEREST, REMOVE_INTEREST, ADD_SKILL, REMOVE_SKILL} from "./signUpTypes";

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
