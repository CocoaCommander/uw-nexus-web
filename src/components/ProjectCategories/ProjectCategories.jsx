import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTextBox from "../CustomTextBox/CustomTextBox";
import { addProjCategory } from "../../redux/createProject/createProjectActions";
import "./ProjectCategories.css"
import questionIcon from "../../assets/icons/question-icon.png"



const ProjectCategories = (props) => {

  const handleChange = (e) => {
    props.onChange(e);
  }

  const dispatch = useDispatch();

  const projCategs = useSelector((state) => state.createProj.projCategs);

  const handleCategoryAddition = (e) => {
    if (e.key === 'Enter' && projCategs.length < 5) {
      dispatch(addProjCategory(e.target.value));
      e.currentTarget.value = "";
    }
  }

  const renderCategories = (categories) => {
    console.log(categories.length);
    return categories.map((categ) => <div className="selection-proj-categories">
      <p>{categ}</p>
    </div>)
  }

  return(
    <div className="center-pane">
        <div className="header-icon-wrapper">
          <p className="project-name-header">How would you categorize your project?</p>
          <img className={"question-icon"} src={questionIcon}></img>
        </div>
        <p className="project-page-subtitle">(max 5 categories)</p>
        <div className="selections-container">
          {renderCategories(projCategs)}
        </div>
      


      
      <CustomTextBox className="sign-up-detail" onKeyPress={handleCategoryAddition}></CustomTextBox>
    </div>
  )
}

export default ProjectCategories;