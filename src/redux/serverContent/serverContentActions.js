import { SET_INTERESTS_LIST, SET_SKILLS_LIST, SET_MAJORS_LIST } from "./serverContentTypes";

export const setInterestsList = (list) => {
  return {
    type: SET_INTERESTS_LIST,
    payload: list
  }
}

export const setSkillsList = (list) => {
  return {
    type: SET_SKILLS_LIST,
    payload: list
  }
}

export const setMajorsList = (list) => {
  return {
    type: SET_MAJORS_LIST,
    payload: list
  }
}