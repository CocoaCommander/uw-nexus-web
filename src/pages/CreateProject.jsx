
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from '@gboksm11/react-step-progress';
import '../custom-react-step-progress.css';
import "../CreateProject.css";
import { setCampus, setMajor, setYear, setPassword } from "../redux/signUp/signUpActions";
import { setProjName, setProjDesc, setTeamSize, setProjDur, setProjStatus, addLocation, setErrorMsg} from "../redux/createProject/createProjectActions";
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
import ProjectName from "../components/ProjectName/ProjectName";
import ProjectDescription from "../components/ProjectDescription/ProjectDescription";
import ProjectTeamSize from "../components/ProjectTeamSize/ProjectTeamSize";
import ProjectLocation from "../components/ProjectLocation/ProjectLocation";


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
  


  const toolTipMsgs = [
    `Project title helps users understand what the project outcome would be. Good examples are  
    “Pet Training App Development” and “Local Tree Sustainability Project”`,
    `Project description helps users understand what the project goals, purposes, and probelm to tackle are. 
    Other information you can include can be time commitment as as well as your overall project plan.`,
    `A new project is one that starts from scratch, while an ongoing project means the project already has existing members.`,
    `Project category helps users understand the field of studies where your project could fall under.`, 
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
    console.log(value);
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
       <ProjectName handleTextboxChange={handleTextboxChange} toolTipMsg={toolTipMsgs[0]}/>
    )
  
  // render content of Project Interests Page
  const step2Content = (
    <ProjectDescription handleTextboxChange={handleTextboxChange} toolTipMsg={toolTipMsgs[1]}/>

  )

  // render content of Technical Skills Page
  const step3Content = (
    <ProjectTeamSize handleSelectionChange={handleSelectionChange} toolTipMsg={toolTipMsgs[2]}/>
  )

  // render content of Resume Upload Page
  const step4Content = (
    <div className="vertical-center">
      <p className="gen-info-title">Category</p>
      <ProjectCategories tooltip={toolTipMsgs[3]}></ProjectCategories>
    </div>

  )
  
  // render content of Review Page 
  const step5Content = (
      <ProjectRoles></ProjectRoles>
  )

  const step6Content = (
    <ProjectLocation handleTextboxChange={handleTextboxChange} toolTipMsg={toolTipMsgs[4]}/>
  )

  function step3Validator() {
    if (teamSize_valid.current && projDur_valid.current && projStatus_valid.current) {
      handleStepIncrease();
      return true;
    } else {
      dispatch(setErrorMsg("Please fill in all required fields."));
      return false;
    }
  }

  function step4Validator() {
    if (projCategs_valid.current.length > 0) {
      console.log(projCategs_valid.current);
      handleStepIncrease();
      return true;
    } else {
      dispatch(setErrorMsg("Please choose at least one category."));
      return false;
    }
  }

  function step5Validator() {
    if (projRoles_valid.current.length > 0) {
      handleStepIncrease();
      return true;
    } else {
      dispatch(setErrorMsg("Please add at least one role."));
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
      dispatch(setErrorMsg(""));
    } else {
      dispatch(setErrorMsg("Please enter your meeting location."));
    }

  }

  const handleStepDecrease = (e) => {
    const target = e.target.className;
    if (target.includes("back-button-proj")) {
      dispatch(setErrorMsg(""));
      dispatch(decreaseStep());
    }
  }

  const handleStepIncrease = () => {
    dispatch(setErrorMsg(""));
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
        <StepProgressBar
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button-proj"
              secondaryBtnClass={currentStep == 1 ? "back-button-proj-hidden" : "back-button-proj"}
              buttonWrapperClass="buttonsWrapper-cp"
              labelClass="progress-labels"
              previousBtnName="Back"
              submitBtnName="Next"

              steps={[
                {
                  label: 'Project Name',
                  name: 'step 1',
                  content: step1Content,
                  skippable: false,
                  validator: () => {
                    const valid = s1_valid.current.length > 0;
                    if (valid) {
                      handleStepIncrease();
                    } else {
                      dispatch(setErrorMsg("Please enter your project name."));
                    }
                    return valid;
                  }
                },
                {
                  label: 'Project Description',
                  name: 'step 2',
                  content: step2Content,
                  skippable: false,
                  validator: () => {
                    const valid = s2_valid.current.length > 0;
                    if (valid) {
                      handleStepIncrease();
                    } else {
                      dispatch(setErrorMsg("Please add a description of your project."));
                    }
                    return valid
                  }
                },
                {
                  label: 'Team Size',
                  name: 'step 3',
                  content: step3Content,
                  skippable: false,
                  validator: step3Validator
                },
                {
                  label: 'Category',
                  name: 'step 4',
                  content: step4Content,
                  skippable: false,
                  validator: step4Validator
                },
                {
                  label: 'Roles',
                  name: 'step 5',
                  content: step5Content,
                  skippable: false,
                  validator: step5Validator
                },
                {
                  label: 'Location',
                  name: 'step 6',
                  content: step6Content,
                  skippable: false,
                  validator: step6Validator
                },
              ]}
              />
              {/* <p className="error-msg">{errorMsg}</p> */}
      </div>
    );
}

export default CreateProject;