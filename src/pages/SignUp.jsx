import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from 'react-step-progress';
import '../custom-react-step-progress.css';
import "../SignUp.css";
import InfoForm from "../components/InfoForm/InfoForm";
import SelectionsGrid from "../components/SelectionsGrid/SelectionsGrid";
import { setCampus, setFullName, setMajor, setYear, addInterest, removeInterest, addSkill, removeSkill } from "../redux/signUp/signUpActions";



const SignUp = (props) => {

  const selectionTypes = ["interests", "skills"];

  const interests = ["Software Development", "Automobile Creation",
  "Design-Hardware", "Professional Communication",
  "Healthcare", "Environmentalism",
  "Aerospace", "Data Science",
  "HTML Coding", "Hackathon",
  "Manufacturing", "Project Outreach",
  "Mechanical Design", "Mechatronics",
  "Biomedical Research", "Business"];

  const skills = ["Computer Aided Design (CAD)", "Printed Circuit Board (PCB) Design", "Finite Element Analysis (FEA)",
                  "Front-End Software", "Computational Fluid Dynamics (CFD)", "Back-End Software", "MATLAB", "Soldering",
                  "Python", "Material Selection & Ordering", "Manufacturing - Machine Shop", "Professional Communication",
                  "Manufacturing - Composite Shop", "Graphic Design", "Manufacturing - 3D Printing", "Web Design",
                  "Mechanical Design", "Design Prototyping", "Data Analysis", "Usability Testing", "Java", 
                  "Bill of Material Selection", "JavaScript", "Management - Gantt Chart", "C++", "Management - Kanban",
                  "Arduino", "Management - SCRUM", "Schematic Software", "HTML/CSS"];

  const dispatch = useDispatch();

  // handle changes in General Information page
  const handleFormChange = (e) => {
    let value = e.target.value;
    switch (e.target.name) {
      case "fullName":
        dispatch(setFullName(value));
        break;
      case "year":
        dispatch(setYear(value));
        break;
      case "major":
        dispatch(setMajor(value));
        break;
      case "campus":
        dispatch(setCampus(value));
    }
  }

  // handle changes in interest selections in Project Interests Page
  const handleInterestSelection = (e, selectedOptions) => {
    let selection = e.target.textContent;
    console.log(selectedOptions);
    if (selectedOptions.includes(selection)) {
      dispatch(removeInterest(selection));
    } else {
      dispatch(addInterest(selection));
    }
  }

  // handle changes in skill selections in Technical Skills Page
  const handleSkillSelection = (e, selectedOptions) => {
    let selection = e.target.textContent;
    if (selectedOptions.includes(selection)) {
      dispatch(removeSkill(selection));
    } else {
      dispatch(addSkill(selection));
    }
  }

  // render content of General Information Page
  const step1Content = (
    <div className="center-pane">
      <div className="sign-up-pane">
          <div className="form-field">
            <InfoForm onChange={handleFormChange}>
            </InfoForm>
          </div>
      </div>
    </div>
    )
  
  // render content of Project Interests Page
  const step2Content = (
  <div className="center-pane">
    <p className="interests-subtitle">SELECT UP TO 5 OF YOUR INTERESTS</p>
    <SelectionsGrid selectionType={selectionTypes[0]} selections={interests} onClick={handleInterestSelection}></SelectionsGrid>
  </div>
  )

  // render content of Technical Skills Page
  const step3Content = (
    <div className="center-pane">
    <p className="interests-subtitle">SELECT UP TO 10 OF YOUR SKILLS</p>
    <SelectionsGrid selectionType={selectionTypes[1]} selections={skills} onClick={handleSkillSelection}></SelectionsGrid>
  </div>
  )
  
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }
  
  function step3Validator() {
    return true;
  }
  
  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

    return (
      <div className="desktop-container">
        <img className="logo" src={logo}></img>
        <StepProgressBar
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button"
              secondaryBtnClass="login-button"
              buttonWrapperClass="buttonsWrapper"
              labelClass="progress-labels"

              steps={[
                {
                  label: 'General Information',
                  name: 'step 1',
                  content: step1Content
                },
                {
                  label: 'Project Interests',
                  name: 'step 2',
                  content: step2Content,
                  validator: step2Validator
                },
                {
                  label: 'Technical Skills',
                  name: 'step 3',
                  content: step3Content,
                  validator: step3Validator
                },
                {
                  label: 'Resume',
                  name: 'step 3',
                  content: step3Content,
                  validator: step3Validator
                },
                {
                  label: 'Review',
                  name: 'step 3',
                  content: step3Content,
                  validator: step3Validator
                }
              ]}
              />
      </div>
    );
}

export default SignUp;