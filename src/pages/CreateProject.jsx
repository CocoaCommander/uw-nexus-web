
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from 'react-step-progress';
import '../custom-react-step-progress.css';
import "../CreateProject.css";
import { setCampus, setMajor, setYear, setPassword } from "../redux/signUp/signUpActions";
import { setProjName, setProjDesc, setTeamSize, setProjDur, setProjStatus, addLocation} from "../redux/createProject/createProjectActions";
import { setSkillsList } from "../redux/serverContent/serverContentActions";
import Cookies from 'universal-cookie';
import CustomTextBox from "../components/CustomTextBox/CustomTextBox";
import CustomTextArea from "../components/CustomTextArea/CustomTextArea";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import ProjectCategories from "../components/ProjectCategories/ProjectCategories";
import questionIcon from "../assets/icons/question-icon.png";
import ProjectRoles from "../components/ProjectRoles/ProjectRoles";
import { useNavigate } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { increaseStep, decreaseStep } from "../redux/createProject/createProjectActions";


const CreateProject = ({
  isMobile
 }) => {
  
  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const projRoles = useSelector((state) => state.createProj.roles);
  const projLocation = useSelector((state) => state.createProj.location);


  const currentStep = useSelector((state) => state.createProj.step);
  const [errorMsg, setErrorMsg] = useState("");
  


  const toolTipMsgs = [
    `Project title helps users understand what the project outcome would be. Good examples are  
    “Pet Training App Development” and “Local Tree Sustainability Project”`,
    `Project description helps users understand what the project goals, purposes, and probelm to tackle are. 
    Other information you can include can be time commitment as as well as your overall project plan.`,
    `A new project is one that starts from scratch, while an ongoing project means the project already has existing members.`,
    `Project category helps users understand the field of studies where your project could fall under.
    Good examples are 'healthcare', 'AI', 'politics', and 'international studies'.`, 
    `Project location helps users understand where the location of meetings will be. 
    Good examples if in person are “HUB 160”, “MEB 123” or if meeting virtually “remote”. `,
  ];

  // const [showToolTip, setToolTip] = useState(false);
  const showToolTip = false;

  const toolval = useRef(showToolTip);
  toolval.current = showToolTip;

  const s1_valid = useRef(projName);
  s1_valid.current = projName;

  const s2_valid = useRef(projDesc);
  s2_valid.current = projDesc;

  const teamSize_valid = useRef(teamSize);
  teamSize_valid.current = teamSize;

  const projDur_valid = useRef(projDur);
  projDur_valid.current = projDur;

  const projStatus_valid = useRef(projStatus);
  projStatus_valid.current = projStatus;

  const projCategs_valid = useRef(projCategs);
  projCategs_valid.current = projCategs;

  const projRoles_valid = useRef(projRoles);
  projRoles_valid.current = projRoles;

  const projLocation_valid = useRef(projLocation);
  projLocation_valid.current = projLocation;
  

  const navigate = useNavigate();

  useEffect(() => {
    var cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    if (jwt_token) {
      const url = "/api/constants/skills";

      fetch(url)
      .then(response => response.json())
      .then(data => dispatch(setSkillsList(data)))
      .catch((error) => {
        console.log(error);
      })
    } else {
      console.log("not authenticated");
      navigate('/');
    }

  }, [navigate]);

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
        break;
      case "location":
        dispatch(addLocation(value));
        break;
      default:
        break;
    }
  }

  // handle changes in interest selections in Project Interests Page
  const handleSelectionChange = (e) => {
    let value = e.target.value;
    console.log("selected " + value);
    switch(e.target.name) {
      case "teamSize":
        dispatch(setTeamSize(value));
        break;
      case "projDur":
        dispatch(setProjDur(value));
        break;
      case "projStatus":
        dispatch(setProjStatus(value));
        break;
      default:
        break;
    }

  }

  // render content of General Information Page
  const step1Content = (
    <div className="vertical-center">
      <div className="center-pane">
          <div className="header-icon-wrapper">
            <p className="project-name-header">What is the name of your Project? <span className="asterix"> *</span></p>
              <img data-for="main" data-tip={toolTipMsgs[0]} className={"question-icon"} src={questionIcon} alt="question icon"></img>
              <ReactTooltip
               id="main"
               className="!important tooltip-text"
               place="right"
               type="light"
               padding={"2px"}
               border={true}/>


          </div>

          <div className="field-set">
            <CustomTextBox className="sign-up-detail" name="projName" reducer="createProj" onChange={handleTextboxChange} placeholder={"E.g. Accessible Treatments"}></CustomTextBox>
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
            <img data-for="desc-tip" data-tip={toolTipMsgs[1]} className={"question-icon"} src={questionIcon} alt="question icon"></img>
            <ReactTooltip
               id="desc-tip"
               className="!important tooltip-text"
               place="right"
               type="light"
               padding={"2px"}
               border={true}/>
          </div>

            <div className="field-set">
              <CustomTextArea
                className="proj-desc-area"
                name="projDesc" 
                reducer="createProj" 
                onChange={handleTextboxChange} 
                placeholder={`E.g. The main goal of our project is to find accessible treatments for people who may be unable to seek current treatment options either due to cost, distance, or other socioeconomic factors. We will be begin by analyzing data that provides us with this information and start brainstorming possible solutions to this issue. For this project we are looking at 4-5 hours  per week done in and outside of meetings.`}>
              </CustomTextArea>
            </div>
      </div>
    </div>

  )

  // render content of Technical Skills Page
  const step3Content = (
    <div className="vertical-center">
      <div className="center-pane">
        <p className="gen-info-title">Team Size</p>
        <div className="drop-downs-container">
          <div className="dropdown-wrapper">
            <CustomDropdown 
                            id="team-size"
                            name="teamSize"
                            reducer="createProj"
                            options={["Small (6-10)", "Medium (11-15)", "Large (15+)"]}
                            values={["Small", "Medium", "Large"]}
                            placeholder={"Team Size"}
                            onChange={handleSelectionChange}>
            </CustomDropdown>
            <span className="asterix"> *</span>
          </div>

          <div className="dropdown-wrapper">
            <CustomDropdown 
                            id="project-duration"
                            name="projDur"
                            reducer="createProj"
                            options={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                            values={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                            placeholder={"Project Duration"}
                            onChange={handleSelectionChange}>
            </CustomDropdown>
            <span className="asterix"> *</span>
          </div>


          <div className="dropdown-wrapper">
            <CustomDropdown 
                            id="project-status"
                            name="projStatus"
                            reducer="createProj"
                            options={["New Project", "Ongoing Project"]}
                            values={["New Project", "Ongoing Project"]}
                            placeholder={"Project Status"}
                            onChange={handleSelectionChange}>
            </CustomDropdown>

            <span className="asterix"> *</span>

            <img data-for="desc-tip" data-tip={toolTipMsgs[2]} className={"question-icon-dropdown"} src={questionIcon} alt="question icon"></img>
              <ReactTooltip
                id="desc-tip"
                className="!important tooltip-text"
                place="right"
                type="light"
                padding={"2px"}
                border={true}/>
          </div>
        </div>
    </div>
    </div>

  )

  // render content of Resume Upload Page
  const step4Content = (
    <div className="vertical-center">
      <p className="gen-info-title">Category</p>
      <ProjectCategories tooltip={toolTipMsgs[3]}></ProjectCategories>
    </div>

  )

  // const handleCSSChange = () => {
  //   setStyle("desktop-container-roles");
  // }
  
  // render content of Review Page 
  const step5Content = (
      <ProjectRoles></ProjectRoles>
  )

  const step6Content = (
    <div className="vertical-center">
      <div className="center-pane">
        <p className="gen-info-title">Location</p>
        <div className="header-icon-wrapper">
          <p className="project-name-header">Where would your meetings be located? <span className="asterix"> *</span></p>
          <img data-for="loc-tip" data-tip={toolTipMsgs[4]} className={"question-icon"} src={questionIcon} alt="question icon"></img>
          <ReactTooltip
               id="loc-tip"
               className="!important tooltip-text"
               place="right"
               type="light"
               padding={"2px"}
               border={true}/>
          
        </div>
        <p className="project-page-subtitle">(If the location is irregular, you may enter a general location such as the University of Washington.)</p>

        <div className="field-set">
            <CustomTextBox className="sign-up-detail" name="location" reducer="createProj" onChange={handleTextboxChange} placeholder={"Search Location"}></CustomTextBox>
          </div>
      </div>
    </div>

  )

  function step3Validator() {
    if (teamSize_valid.current && projDur_valid.current && projStatus_valid.current) {
      handleStepIncrease();
      return true;
    } else {
      setErrorMsg("Please fill in all required fields.");
      return false;
    }
  }

  function step4Validator() {
    if (projCategs_valid.current.length > 0) {
      console.log(projCategs_valid.current);
      handleStepIncrease();
      return true;
    } else {
      setErrorMsg("Please choose atleast one category.")
      return false;
    }
  }

  function step5Validator() {
    if (projRoles_valid.current.length > 0) {
      handleStepIncrease();
      return true;
    } else {
      setErrorMsg("Please add atleast one role.");
      return false;
    }
  }

  function step6Validator() {
    console.log(projLocation_valid.current);
    if (projLocation_valid.current) {
      handleStepIncrease();
      return true;
    }
  }
  
  async function onFormSubmit() {
    if (projLocation_valid.current) {
      navigate('/finishProject');
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter your meeting location.");
    }

  }

  const handleStepDecrease = (e) => {
    const target = e.target.className;
    if (target.includes("back-button-proj")) {
      dispatch(decreaseStep());
    }
  }

  const handleStepIncrease = () => {
    setErrorMsg("");
    dispatch(increaseStep());
  }

  // if (isMobile) {
  //   return (
  //     <>
  //       You can only create a project on desktop.
  //     </>
  //   )
  // }

    return (
      <div className={"desktop-container-cp"} onClick={handleStepDecrease}>
        <img className="logo" src={logo} alt="nexus logo"></img>
        <StepProgressBar
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button-proj"
              secondaryBtnClass={currentStep == 1 ? "back-button-proj-hidden" : "back-button-proj"}
              buttonWrapperClass="buttonsWrapper-cp"
              labelClass="progress-labels"
              submitBtnName="Next"

              steps={[
                {
                  label: 'Project Name',
                  name: 'step 1',
                  content: step1Content,
                  validator: () => {
                    const valid = s1_valid.current.length > 0;
                    if (valid) {
                      handleStepIncrease();
                    } else {
                      setErrorMsg("Please enter your project name.");
                    }
                    return valid;
                  }
                },
                {
                  label: 'Project Description',
                  name: 'step 2',
                  content: step2Content,
                  validator: () => {
                    const valid = s2_valid.current.length > 0;
                    if (valid) {
                      handleStepIncrease();
                    } else {
                      setErrorMsg("Please add a description of your project.");
                    }
                    return valid
                  }
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
                  validator: step5Validator
                },
                {
                  label: 'Location',
                  name: 'step 6',
                  content: step6Content,
                  validator: step6Validator
                },
              ]}
              />
              <p className="error-msg">{errorMsg}</p>
      </div>
    );
}

export default CreateProject;