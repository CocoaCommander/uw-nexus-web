import { SET_FULL_NAME, SET_YEAR, SET_MAJOR, SET_CAMPUS} from "./signUpTypes";

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
