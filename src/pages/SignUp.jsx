import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import StepProgressBar from 'react-step-progress';
import '../custom-react-step-progress.css';
import "../SignUp.css";
import InfoForm from "../components/InfoForm/InfoForm";
import SelectionsGrid from "../components/SelectionsGrid/SelectionsGrid";
import ResumeUpload from "../components/ResumeUpload/ResumeUpload";
import ReviewPage from "../components/ReviewPage/ReviewPage";
import { setCampus, setFullName, setMajor, setYear, addInterest, removeInterest, addSkill, removeSkill, setEmail, setPassword, decreaseStep, increaseStep } from "../redux/signUp/signUpActions";
import { setInterestsList, setSkillsList } from "../redux/serverContent/serverContentActions";
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from "react-router-dom";
import { setStep } from "../redux/signUp/signUpActions";


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

  const selectionTypes = ["interests", "skills"];

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);

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

    // console.log(progress.current);

    const url1 = `${process.env.REACT_APP_API_URL}/api/constants/interests`;
    const url2 = `${process.env.REACT_APP_API_URL}/api/constants/skills`;

    var cookie = new Cookies();
    const jwt_token = cookie.get("accessToken");
    // const userID = cookie.get("nxs_id");
    if (jwt_token) {
      setAccessToken(jwt_token);
      // setUserID(userID)
      console.log("already authenticated!");
      // redirect or something
    } else {
      console.log("not authenticated");
    }

    fetch(url1)
    .then(response => response.json())
    .then(data => dispatch(setInterestsList(data)))
    .catch((error) => {
      console.log(error);
    })

    fetch(url2)
    .then(response => response.json())
    .then(data => dispatch(setSkillsList(data)))
    .catch((error) => {
      console.log(error);
    });

    console.log(`email = ${location.state.email}`);
    setEmail(location.state.email);

  }, [dispatch]);


  console.log("rerendering");

  // handle changes in General Information page
  const handleFormChange = (e) => {
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
      if (selectedOptions.length < 10) {
        dispatch(addSkill(selection));
      }

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
      <p className="interests-subtitle">SELECT UP TO 5 OF YOUR INTERESTS</p>
      <p className="gen-info-title">Project Interests</p>
      <SelectionsGrid selectionType={selectionTypes[0]} onClick={handleInterestSelection}></SelectionsGrid>
    </div>
  </div>
  )

  // render content of Technical Skills Page
  const step3Content = (
    <div className="vertical-center-signup">
      <div className="center-pane">
        <p className="interests-subtitle">SELECT UP TO 10 OF YOUR SKILLS</p>
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
        <ReviewPage></ReviewPage>
      </div>
    </div>
  )
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    console.log("clicking next");
    return true;
  }
  
  function step3Validator() {
    return true;
  }

  function step4Validator() {
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



    const url = `${process.env.REACT_APP_API_URL}/api/profile/createProfile`;

    const [firstName, lastName] = handleFullName();
    console.log(props);


    console.log(accessToken);



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


    console.log("ACCESS TOKEN = " + accessToken);

    //JSON.stringify(signUpInfo);
    const requestOptions = {
      method: 'POST',
      body: signUpInfo,
      credentials: 'include'
  };

  let response = await fetch(url, requestOptions);

  if (response.ok) {
    console.log("success");
    const respJson = await response.json();
    window.localStorage.setItem(userID, respJson.profile_id);
    props.onCreateProfile(respJson.profile_id);
    navigate('/welcomePage');
    console.log(respJson);
  } else {
    console.log(response.statusText);
  }
  console.log(response);
  }

  const handleStepChange = (e) => {
    const target = e.target.className;
    console.log(target);
    if (target.includes("back-button-proj")) {
      dispatch(decreaseStep());
    } else if (target.includes("login-button-sign-up")) {
      dispatch(increaseStep());
    }
  }


    return (
      <div ref={progress} className="desktop-container" onClick={handleStepChange}>
        <img className="logo" src={logo} alt="Nexus Logo"></img>
        <StepProgressBar
              startingStep={0}
              onSubmit={onFormSubmit}
              stepClass="step-indicator-wrapper"
              primaryBtnClass="login-button-sign-up"
              secondaryBtnClass="back-button-proj"
              buttonWrapperClass="buttonsWrapper"
              labelClass="progress-labels"

              steps={[
                {
                  label: 'General Information',
                  name: 'step 1',
                  content: step1Content,
                  validator: () => {
                    console.log("clicking next");
                    return name_valid.current.length > 0 && year_valid.current.length > 0 && major_valid.current.length > 0 && campus_valid.current.length >> 0}
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
                  name: 'step 4',
                  content: step4Content,
                  validator: step4Validator
                },
                {
                  label: 'Review',
                  name: 'step 5',
                  content: step5Content,
                  validator: step3Validator
                }
              ]}
              />
      </div>
    );
}

export default SignUp;