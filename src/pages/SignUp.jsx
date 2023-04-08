import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from '@gboksm11/react-step-progress';
import '../custom-react-step-progress.css';
import "../SignUp.css";
import InfoForm from "../components/InfoForm/InfoForm";
import SelectionsGrid from "../components/SelectionsGrid/SelectionsGrid";
import ResumeUpload from "../components/ResumeUpload/ResumeUpload";
import ReviewPage from "../components/ReviewPage/ReviewPage";
import { setCampus, setFullName, setMajor, setYear, addInterest, removeInterest, addSkill, removeSkill, setStep, setPassword, decreaseStep, increaseStep, setErrorMsg, clearAll } from "../redux/signUp/signUpActions";
import { setInterestsList, setSkillsList, setMajorsList } from "../redux/serverContent/serverContentActions";
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from "react-router-dom";


const SignUp = (props) => {

  const [email, setEmail] = useState("");

  const fullName = useSelector((state) => state.signUp.fullName);
  const year = useSelector((state) => state.signUp.year);
  const major = useSelector((state) => state.signUp.major);
  const campus = useSelector((state) => state.signUp.campus);
  const chosen_interests = useSelector((state) => state.signUp.interests);
  const chosen_skills = useSelector((state) => state.signUp.skills);
  const resume = useSelector((state) => state.signUp.resume);

  const userID = useSelector((state) => state.userState.userID);
  const currentStep = useSelector((state) => state.signUp.step);
  const errorMsg = useSelector((state) => state.signUp.errorMsg);

  const [isLoading, setIsLoading] = useState(false);

  const selectionTypes = ["interests", "skills"];

  const navigate = useNavigate();

  const [accessToken2, setaccessToken2] = useState(null);

  const progressBar = useRef();
  const progress = useRef();

  const name_valid = useRef(fullName);
  const year_valid = useRef(year);
  const major_valid = useRef(major);
  const campus_valid = useRef(campus);

  name_valid.current = fullName;
  year_valid.current = year;
  major_valid.current = major;
  campus_valid.current = campus;
  
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {

    const url1 = "/api/constants/interests";
    const url2 = "/api/constants/skills";
    const url3 = "/api/constants/majors"

    var cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    // const userID = cookie.get("nxs_id");
    if (jwt_token) {
      setaccessToken2(jwt_token);
      // setUserID(userID)
    } else {

    }

    fetch(url1)
    .then(response => response.json())
    .then(data => dispatch(setInterestsList(data)))
    .catch((error) => {
      {}
    })

    fetch(url2)
    .then(response => response.json())
    .then(data => dispatch(setSkillsList(data)))
    .catch((error) => {
      {}
    });

    fetch(url3)
      .then(response => response.json())
      .then(data => dispatch(setMajorsList(data)))
      .catch(error => {})

    setEmail(location.state.email);

  }, [dispatch]);

  // handle changes in General Information page
  const handleFormChange = (e) => {


    if (e.label) {
      dispatch(setMajor(e.value));
      return;
    }

    let value = e.target.value;

    switch (e.target.name) {
      case "fullName":
        dispatch(setFullName(value));
        break;
      case "email":
        dispatch(setEmail(value));
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
      default:
        break;
    }
  }

  const handleInvalidFirstStep = () => {
    dispatch(setErrorMsg("Please fill out all fields"));
  }

  // handle changes in interest selections in Project Interests Page
  const handleInterestSelection = (e, selectedOptions) => {
    let selection = e.target.textContent;

    if (selectedOptions.includes(selection)) {
      dispatch(removeInterest(selection));
    } else {
      if (selectedOptions.length < 5) {
        dispatch(addInterest(selection));
      }
      
    }
  }

  // handle changes in skill selections in Technical Skills Page
  const handleSkillSelection = (e, selectedOptions) => {
    let selection = e.target.textContent;
    if (selectedOptions.includes(selection)) {
      dispatch(removeSkill(selection));
    } else {
      if (selectedOptions.length < 5) {
        dispatch(addSkill(selection));
      }

    }
  }

  const setProgressStep = (step) => {
    if (progressBar.current) {
      dispatch(setStep(step));
      progressBar.current.setStep(step);
    }
  }

  // render content of General Information Page
  const step1Content = (
    <div className="vertical-center-signup">
      <div className="center-pane">
        <div className="sign-up-pane">
            <p className="gen-info-title">General Information</p>
            <div className="form-field">
              <InfoForm onChange={handleFormChange}>
              </InfoForm>
            </div>
        </div>
      </div>
    </div>
    )
  
  // render content of Project Interests Page
  const step2Content = (
  <div className="vertical-center-signup">
    <div className="center-pane">
      <p className="interests-subtitle">SELECT UP TO 5 INTERESTS</p>
      <p className="gen-info-title">Project Interests</p>
      <SelectionsGrid selectionType={selectionTypes[0]} onClick={handleInterestSelection}></SelectionsGrid>
    </div>
  </div>
  )

  // render content of Technical Skills Page
  const step3Content = (
    <div className="vertical-center-signup">
      <div className="center-pane">
        <p className="interests-subtitle">SELECT UP TO 5 SKILLS</p>
        <p className="gen-info-title">Technical Skills</p>
        <SelectionsGrid selectionType={selectionTypes[1]} onClick={handleSkillSelection}></SelectionsGrid>
      </div>
  </div>
  )

  // render content of Resume Upload Page
  const step4Content = (
    <div className="center-pane">
      <p className="gen-info-title">Resume Upload</p>
      <ResumeUpload></ResumeUpload>
    </div>
  )
  
  // render content of Review Page 
  const step5Content = (
    <div className="vertical-center-signup-review">
      <div className="center-pane">
        <p className="gen-info-title">Review</p>
        <ReviewPage setStep={setProgressStep}></ReviewPage>
      </div>
    </div>
  )
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    handleStepIncrease();
    return true;
  }
  
  function step3Validator() {
    handleStepIncrease();
    return true;
  }

  function step4Validator() {
    handleStepIncrease();
    return true;
  }

  const handleFullName = () => {
    const names = fullName.split(" ");
    const firstName = names[0];
    let lastName = names[1];
    for (let i = 2; i < names.length; i++) {
      lastName += " " + names[i];
    }

    if (!lastName) {
      lastName = "";
    }

    return [firstName, lastName];
  }
  
  async function onFormSubmit() {


    setIsLoading(true);

    // const url = `${process.env.REACT_APP_API_URL}/api/profile/createProfile`;
    const url = "/api/profile/createProfile";

    const [firstName, lastName] = handleFullName();



    // const cred_response = await createUser(firstName, lastName);

    let signUpInfo = new FormData();
    signUpInfo.append("first_name", firstName);
    signUpInfo.append("last_name", lastName);
    signUpInfo.append("email", email);
    signUpInfo.append("education", JSON.stringify({
      "campus": campus,
      "year": year,
      "major": major
    }));
    signUpInfo.append("interests", JSON.stringify(chosen_interests));
    signUpInfo.append("skills", JSON.stringify(chosen_skills));
    signUpInfo.append("bio", "Loren Ipsum");
    signUpInfo.append("file", resume);



    //JSON.stringify(signUpInfo);
    const requestOptions = {
      method: 'POST',
      body: signUpInfo,
      credentials: 'include'
  };

  let response = await fetch(url, requestOptions);

  if (response.ok) {
    const respJson = await response.json();
    window.localStorage.setItem(userID, respJson.profile_id);
    props.onCreateProfile(respJson.profile_id);
    dispatch(clearAll());
    setIsLoading(false);
    navigate('/welcomePage');
  } else {
    setIsLoading(false);
  }
  }

  const handleStepDecrease = (e) => {
    const target = e.target.className;
    if (target.includes("back-button-proj")) {
      dispatch(decreaseStep());
    }
  }

  const handleStepIncrease = () => {
    dispatch(increaseStep());
  }




    return (
      <div ref={progress} className="desktop-container" onClick={handleStepDecrease}>
        <StepProgressBar
              ref={progressBar}
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass={isLoading ? "loader-wheel" : "login-button-sign-up"}
              secondaryBtnClass= {currentStep == 1 ? "back-button-proj-hidden" : "back-button-proj"}
              previousBtnName="Back"
              buttonWrapperClass="buttonsWrapper"
              labelClass="progress-labels"
              skipBtnClass="skip-btn"
              skipNextWrapperClass="skip-next-wrapper"

              steps={[
                {
                  label: 'General Information',
                  name: 'step 1',
                  content: step1Content,
                  skippable: false,
                  validator: () => {
                    dispatch(setErrorMsg(""));
                    const isValid = name_valid.current.length > 0 && year_valid.current.length > 0 && major_valid.current.length > 0 && campus_valid.current.length > 0;
                    if (isValid) {
                      handleStepIncrease();
                    } else {
                      handleInvalidFirstStep();
                    }
                    return isValid;
                }},
                {
                  label: 'Project Interests',
                  name: 'step 2',
                  content: step2Content,
                  skippable: true,
                  validator: step2Validator
                },
                {
                  label: 'Technical Skills',
                  name: 'step 3',
                  content: step3Content,
                  skippable: true,
                  validator: step3Validator
                },
                {
                  label: 'Resume',
                  name: 'step 4',
                  content: step4Content,
                  skippable: true,
                  validator: step4Validator
                },
                {
                  label: 'Review',
                  name: 'step 5',
                  content: step5Content,
                  skippable: false,
                  validator: step3Validator
                }
              ]}
              />
      </div>
    );
}

export default SignUp;