import { useEffect, useRef, useState } from "react";
import ProjectListItem from "../components/ProjectListItem";
import logo from "../assets/Logo.png";
import StepProgressBar from 'react-step-progress';
// import the stylesheets
import '../custom-react-step-progress.css';
import "../SignUp.css";
import InfoForm from "../components/InfoForm/InfoForm";



const SignUp = (props) => {

  const [fullName, setFullName] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [campus, setCampus] = useState("");

  const progressBar = useRef(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFullName(e.target.value);
  }

  const step1Content = (

    <div className="center-pane">
      <div className="sign-up-pane">
          <div className="form-field">
            <InfoForm onChange={handleChange}>
            </InfoForm>
          </div>
      </div>
    </div>
);
  const step2Content = <h1>Step 2 Content</h1>;
  const step3Content = <h1>Step 3 Content</h1>;
  
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
              ref={progressBar}
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button"
              secondaryBtnClass="login-button"
              buttonWrapperClass="buttonsWrapper"
              labelClass="progress-labels"
              name={fullName}

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