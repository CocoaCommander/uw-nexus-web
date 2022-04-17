import { SET_INTERESTS_LIST, SET_SKILLS_LIST } from "./serverContentTypes";

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