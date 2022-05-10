import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTextBox from "../CustomTextBox/CustomTextBox";
import { addProjCategory } from "../../redux/createProject/createProjectActions";
import "./ProjectCategories.css"
import questionIcon from "../../assets/icons/question-icon.png"
import ReactTooltip from "react-tooltip";



const ProjectCategories = (props) => {

  const handleChange = (e) => {
    props.onChange(e);
  }

  const dispatch = useDispatch();

  const projCategs = useSelector((state) => state.createProj.projCategs);

  const handleCategoryAddition = (e) => {
    if (e.key === 'Enter' && projCategs.length < 5 && e.target.value.length > 0) {
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

        <div className="selections-container-categ">
          {renderCategories(projCategs)}
        </div>

        <div className="header-icon-wrapper">
          <p className="project-name-header">How would you categorize your project?</p>
          <img data-for="categ-tip" data-tip={props.tooltip} className={"question-icon"} src={questionIcon}></img>

          <ReactTooltip
               id="categ-tip"
               className="!important tooltip-text"
               place="right"
               type="light"
               padding={"2px"}
               border={true}/>
        </div>
        <p className="project-page-subtitle">(max 5 categories)</p>

      


      
      <CustomTextBox className="sign-up-detail" onKeyPress={handleCategoryAddition}></CustomTextBox>
    </div>
  )
}

export default ProjectCategories;