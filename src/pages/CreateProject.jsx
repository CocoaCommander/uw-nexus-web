import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from 'react-step-progress';
import '../custom-react-step-progress.css';
import "../CreateProject.css";
import InfoForm from "../components/InfoForm/InfoForm";
import SelectionsGrid from "../components/SelectionsGrid/SelectionsGrid";
import ResumeUpload from "../components/ResumeUpload/ResumeUpload";
import ReviewPage from "../components/ReviewPage/ReviewPage";
import { setCampus, setFullName, setMajor, setYear, addInterest, removeInterest, addSkill, removeSkill, setEmail, setPassword } from "../redux/signUp/signUpActions";
import { setProjName, setProjDesc, setTeamSize, setProjDur, setProjStatus, addLocation} from "../redux/createProject/createProjectActions"
import Cookies from 'universal-cookie';
import CustomTextBox from "../components/CustomTextBox/CustomTextBox";
import CustomTextArea from "../components/CustomTextArea/CustomTextArea";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import ProjectCategories from "../components/ProjectCategories/ProjectCategories";
import questionIcon from "../assets/icons/question-icon.png";
import ProjectRoles from "../components/ProjectRoles/ProjectRoles";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const CreateProject = ({
  isMobile
 }) => {
  console.log(isMobile);
  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);

  const s1_valid = useRef(projName);
  s1_valid.current = projName;

  const s2_valid = useRef(projDesc);
  s2_valid.current = projDesc;

  const [cstyle, setStyle] = useState("desktop-container");

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const selectionTypes = ["interests", "skills"];

  const [accessToken, setAccessToken] = useState(null);

  console.log("rerendering");

  const dispatch = useDispatch();

  // handle changes in General Information page
  const handleTextboxChange = (e) => {
    let value = e.target.value;
    switch (e.target.name) {
      case "projName":
        dispatch(setProjName(value));
        break;
      case "projDesc":
        dispatch(setProjDesc(value));
        break;

      case "password":
        dispatch(setPassword(value));
        break;
      
      case "year":
        dispatch(setYear(value));
        break;
      case "major":
        dispatch(setMajor(value));
        break;
      case "campus":
        dispatch(setCampus(value));
      case "location":
        dispatch(addLocation(value));
    }
  }

  // handle changes in interest selections in Project Interests Page
  const handleSelectionChange = (e) => {
    let value = e.target.value;
    console.log("selected " + value);
    switch(e.target.name) {
      case "team-size":
        dispatch(setTeamSize(value));
        break;
      
      case "project-duration":
        dispatch(setProjDur(value));
        break;

      case "project-status":
        dispatch(setProjStatus(value));
        break;
    }

  }

  // render content of General Information Page
  const step1Content = (
    <div className="vertical-center">
      <div className="center-pane">
          <div className="header-icon-wrapper">
            <p className="project-name-header">What is the name of your Project? <span className="asterix"> *</span></p>
            <img className={"question-icon"} src={questionIcon}></img>
          </div>

          <div className="field-set">
            <CustomTextBox className="sign-up-detail" name="projName" reducer="createProj" onChange={handleTextboxChange}></CustomTextBox>
          </div>
      </div>
    </div>

    )
  
  // render content of Project Interests Page
  const step2Content = (
    <div className="vertical-center">
      <div className="center-pane">
          <div className="header-icon-wrapper">
            <p className="project-name-header">How would you describe your Project? <span className="asterix"> *</span></p>
            <img className={"question-icon"} src={questionIcon}></img>
          </div>

            <div className="field-set">
              <CustomTextArea className="proj-desc-area" name="projDesc" reducer="createProj" onChange={handleTextboxChange}></CustomTextArea>
            </div>
      </div>
    </div>

  )

  // render content of Technical Skills Page
  const step3Content = (
    <div className="vertical-center">
      <div className="center-pane">
        <div className="drop-downs-container">
          <CustomDropdown 
                          id="team-size"
                          name="team-size"
                          options={["Micro (1-5)", "Small (6-10)", "Medium (11-15)", "Large (15+)"]}
                          values={["Micro", "Small", "Medium", "Large"]}
                          placeholder={"Team Size"}
                          onChange={handleSelectionChange}>
          </CustomDropdown>

          <CustomDropdown 
                          id="project-duration"
                          name="project-duration"
                          options={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                          values={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                          placeholder={"Project Duration"}
                          onChange={handleSelectionChange}>
          </CustomDropdown>

          <CustomDropdown 
                          id="project-status"
                          name="project-status"
                          options={["New Project", "Ongoing Project"]}
                          values={["New Project", "Ongoing Project"]}
                          placeholder={"Project Status"}
                          onChange={handleSelectionChange}>
          </CustomDropdown>
        </div>
    </div>
    </div>

  )

  // render content of Resume Upload Page
  const step4Content = (
    <div className="vertical-center">
      <ProjectCategories></ProjectCategories>
    </div>

  )

  const handleCSSChange = () => {
    setStyle("desktop-container-roles");
  }
  
  // render content of Review Page 
  const step5Content = (
      <ProjectRoles onAdd={handleCSSChange}></ProjectRoles>
  )

  const step6Content = (
    <div className="vertical-center">
      <div className="center-pane">
        <div className="header-icon-wrapper">
          <p className="project-name-header">Where would your meetings be located?</p>
          <img className={"question-icon"} src={questionIcon}></img>
        </div>
        <p className="project-page-subtitle">(If the location is irregular, you may enter a general location such as the University of Washington.)</p>

        <div className="field-set">
            <CustomTextBox className="sign-up-detail" name="location" reducer="createProj" onChange={handleTextboxChange}></CustomTextBox>
          </div>
      </div>
    </div>

  )

  function step1Validator() {
    // if (projName.trim().length < 1) {
    //   setErrorMsg("Please enter a project name.");
    let name = projName;
    console.log("name = " + name);
    console.log(name.length);
    return true;
  }

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }
  
  function step3Validator() {
    return true;
  }

  function step4Validator() {
    return true;
  }
  
  async function onFormSubmit() {
    navigate('/finishProject');
  }

  if (isMobile) {
    return (
      <>
        You can only create a project on desktop.
      </>
    )
  }

    return (
      <div className={"desktop-container-cp"}>
        <img className="logo" src={logo}></img>
        <StepProgressBar
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button-proj"
              secondaryBtnClass="login-button-proj"
              buttonWrapperClass="buttonsWrapper-cp"
              labelClass="progress-labels"
              submitBtnName="Next"

              steps={[
                {
                  label: 'Project Name',
                  name: 'step 1',
                  content: step1Content,
                  validator: () => {return s1_valid.current.length > 0}
                },
                {
                  label: 'Project Description',
                  name: 'step 2',
                  content: step2Content,
                  validator: () => {return s2_valid.current.length > 0}
                },
                {
                  label: 'Team Size',
                  name: 'step 3',
                  content: step3Content,
                  validator: step3Validator
                },
                {
                  label: 'Category',
                  name: 'step 4',
                  content: step4Content,
                  validator: step4Validator
                },
                {
                  label: 'Roles',
                  name: 'step 5',
                  content: step5Content,
                  validator: step3Validator
                },
                {
                  label: 'Location',
                  name: 'step 6',
                  content: step6Content,
                  validator: step3Validator
                },
              ]}
              />
              {/* <p className="error-msg">{errorMsg}</p> */}
      </div>
    );
}

export default CreateProject;