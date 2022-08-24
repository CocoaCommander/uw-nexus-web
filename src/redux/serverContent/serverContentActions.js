import { SET_INTERESTS_LIST, SET_SKILLS_LIST, SET_PROJ_CATEGS_LIST } from "./serverContentTypes";

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

export const setProjCategsList = (list) => {
  return {
    type: SET_PROJ_CATEGS_LIST,
    payload: list
  }
}