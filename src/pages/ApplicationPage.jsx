import { useState, useRef } from "react";
import "../ApplicationPage.css";
import man from "../assets/human-man.png";
import woman from "../assets/human-woman.png";
import LoadingButton from "../components/LoadingButton/LoadingButton";
import emailjs from "emailjs-com";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import storage from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ApplicationPage = (props) => {

  const [fullName, setFullName] = useState("");
  const [major, setMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referral, setReferral] = useState("");
  const [purpose, setPurpose] = useState("");
  const [hoursDedicated, setHoursDedicated] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [relevantClasses, setRelevantClasses] = useState("");
  const [willMeet, setWillMeet] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [extraQuestions, setExtraQuestions] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();



  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "app-fullName":
        setFullName(value);
        break;
      case "app-major":
        setMajor(value);
        break;
      case "graduation-year":
        setGraduationYear(value)
        break;
      case "app-email":
        setEmail(value);
        break;
      case "phone-number":
        setPhoneNumber(value);
        break;
      case "referral":
        setReferral(value);
        break;
      case "purpose":
        setPurpose(value);
        break;
      case "relevant-experience":
        setRelevantExperience(value);
        break;
      case "hours-dedicated":
        setHoursDedicated(value);
        break;
      case "relevant-classes":
        setRelevantClasses(value);
        break;
      case "will-meet":
        setWillMeet(value);
        break;
      case "app-resume":
        setResume(value);
        break;
      case "cover-letter":
        setCoverLetter(value);
        break;
      case "extra-questions":
        setExtraQuestions(value);
        break;
      default:
        break;
    }
  }

  const renderGraduationDates = () => {
    const currentYear = new Date().getFullYear()
    const yearOptions = [];
    // yearOptions.push(<option value="" disabled selected>E.g. 2023</option>)
    for (let i = 0; i < 6; i++) {
      yearOptions.push(<option key={currentYear + i} value={currentYear + i}>{currentYear + i}</option>)
    }
    return yearOptions;
  }

  const handleDragFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDropFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    for (let file of e.dataTransfer.files) {
      if (file.type !== "image/png" || file.type !== "image/jpg" || file.type !== "application/pdf") {
        if (e.target.name === "resume-upload-area") {
          setResume(file);
        } else {
          setCoverLetter(file)
        }
      } else {
        console.log("invalid file format");
      }
    }
  }

  const onFileChange = (e) => {
    if (e.target.name === "resume-button") {
      setResume(e.target.files[0]);
      const file = e.target.files[0];
      new FileReader().readAsDataURL(file);
      console.log(e.target.files[0]);
    } else {
      setCoverLetter(e.target.files[0]);
    }

  }

  const submitResume = () => {
    buttonRef.current.click();
  }

  const submitCoverLetter = () => {
    buttonRef2.current.click();
  }


  const uploadFile = async(file) => {

    return new Promise(function(resolve, reject) {

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
  
            // update progress
        },
        (err) => {
          console.log(err);
          reject();
        },
        () => {
            // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                resolve(url);
            });
        }
      );
    })
  }

  const validateSubmission = () => {
    return (graduationYear && email && referral && purpose && hoursDedicated && relevantExperience && 
            relevantClasses && willMeet && resume && coverLetter);
  }

  // fill out when backend implements functionality
  const submitApplication = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateSubmission()) {
      setErrorMsg("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    const resumeURL = await uploadFile(resume);
    const coverLetterURL = await uploadFile(coverLetter);

    console.log(coverLetterURL);

    const email_params = {
        to_name: fullName,
        proj_name: params.projectName,
        position: params.projectRole,
        proj_email: location.state.email,
        major: major,
        year: graduationYear,
        purpose: purpose,
        experience: relevantExperience,
        hours: hoursDedicated,
        relevantClasses: relevantClasses,
        willMeet: willMeet ? "Yes" : "No",
        resume_link: resumeURL,
        coverletter_link: coverLetterURL,
        extraQuestions: extraQuestions
      }

    const response = await emailjs.send("application_request", "proj_app_form", email_params, `${process.env.REACT_APP_EMAIL_JS_API_KEY}`);
    setIsLoading(false);
    if (response.status == 200) {
      setErrorMsg("");
      navigate("/projects");
    } else {
      setErrorMsg("There was an error submitting your application. Please try again later");
    }
  }


  return (

      <div className="center-pane-app">
        <p className="app-form-title">Application Form</p>
        <div className="col-seperator">
          <img className="side-image-man" src={man} alt="man graphic"></img>
          <form className="application-form">
          <div className="form-wrapper">
            <div className="field-set-app">
              <label>Full Name</label>
              <input className="sign-up-detail" 
                    type="text"
                    name="app-fullName" 
                    value={fullName}
                    onChange={handleChange}> 
              </input>
            </div>

            <div className="field-set-app">
              <label>Major</label>
              <input className="sign-up-detail" 
                    type="text"
                    name="app-major" 
                    value={major}
                    onChange={handleChange}> 
              </input>
            </div>
          
            <div className="field-set-app">
              <label>Graduation Year <span className="asterix-signup">*</span></label>
              <select className="sign-up-detail"
                      name="graduation-year"
                      id="graduation-year"
                      onChange={handleChange}
                      >
                      {renderGraduationDates()}
              </select>
            </div>
          
            <div className="field-set-app">
              <label>Email Address <span className="asterix-signup">*</span></label>
              <input className="sign-up-detail" 
                    type="Email"
                    name="app-email" 
                    value={email}
                    onChange={handleChange}>
              </input>
            </div>

            <div className="field-set-app">
              <label>Phone Number</label>
              <input className="sign-up-detail" 
                    type="tel"
                    name="phone-number" 
                    value={phoneNumber}
                    onChange={handleChange}>
              </input>
            </div>

            <div className="field-set-app">
            <label>How did you hear about us? <span className="asterix-signup">*</span></label>
              <textarea className="text-area-style" 
                    type="text"
                    name="referral" 
                    value={referral}
                    onChange={handleChange}
                    maxLength={500}>
              </textarea>
            </div>

            <div className="field-set-app">
            <label>Why do you want to be on the team? <span className="asterix-signup">*</span></label>
              <textarea className="text-area-style" 
                    type="text"
                    name="purpose" 
                    value={purpose}
                    onChange={handleChange}
                    maxLength={500}>
              </textarea>
            </div>

            <div className="field-set-app">
            <label>What relevant experience do you have? What can you bring to this team? <span className="asterix-signup">*</span></label>
              <textarea className="text-area-style" 
                    type="text"
                    name="relevant-experience" 
                    value={relevantExperience}
                    onChange={handleChange}
                    maxLength={500}>
              </textarea>
            </div>

            <div className="field-set-app">
              <label>How many hours can you dedicate to this project? <span className="asterix-signup">*</span></label>
              <input className="sign-up-detail" 
                    type="number"
                    name="hours-dedicated" 
                    value={hoursDedicated}
                    onChange={handleChange}> 
              </input>
            </div>

            <div className="field-set-app">
              <label>What are some relevant classes you have/are taking that relate to this position? <span className="asterix-signup">*</span></label>
              <input className="sign-up-detail" 
                    type="text"
                    name="relevant-classes" 
                    value={relevantClasses}
                    onChange={handleChange}> 
              </input>
            </div>

            <div className="field-set-app">
              <label>Will you be able to make our meeting location?  <span className="asterix-signup">*</span></label>
              <div className="meeting-choices-wrapper">
                <div className={willMeet ? "meeting-choice-true" : "meeting-choice"} onClick={() => setWillMeet(true)}>
                  <p className="choice-text">Yes</p>
                </div>

                <div className={willMeet ? "meeting-choice" : "meeting-choice-true"}>
                  <p className="choice-text" onClick={() => setWillMeet(false)}>No</p>
                </div>
              </div>
            </div>

            <div className="field-set-app">
              <label>Resume <span className="asterix-signup">*</span></label>
              <div name="resume-upload-area" className="drop-zone"
                  onDragOver={handleDragFile}
                  onDrop={handleDropFile}
              >
                {resume ? <p className="browse-text" onClick={() => submitResume()}>{resume.name}</p> : <p className="browse-text" onClick={() => {submitResume()}}>Browse Resume <span className="drop-text">or just drop it here</span></p>}

                <input name="resume-button" ref={buttonRef} className={"file-button"} type={"file"} onChange={onFileChange}></input>
              </div>
            </div>


            <div className="field-set-app">
              <label>Cover Letter <span className="asterix-signup">*</span></label>
              <div name="cover-letter-upload-area" className="drop-zone"
                  onDragOver={handleDragFile}
                  onDrop={handleDropFile}
              >
                {coverLetter ? <p className="browse-text" onClick={() => submitCoverLetter()}>{coverLetter.name}</p> : <p className="browse-text" onClick={() => {submitCoverLetter()}}>Browse Cover Letter <span className="drop-text">or just drop it here</span></p>}

                <input name="cover-letter-button" ref={buttonRef2} className={"file-button"} type={"file"} onChange={onFileChange}></input>
              </div>
            </div>

            <div className="field-set-app">
            <label>Feel free to leave us questions if you have any!</label>
              <textarea className="text-area-style" 
                    type="text"
                    name="extra-questions" 
                    value={extraQuestions}
                    onChange={handleChange}
                    maxLength={500}>
              </textarea>

              <p className="error-msg-apply">{errorMsg}</p>
            </div>
            </div>
          </form>
          <img className="side-image-woman" src={woman} alt="woman graphic"></img>
        </div>
        <LoadingButton
              title="Apply"
              className={"apply-button"}
              active={"apply-button-active"}
              isLoading={isLoading}
              onClick={submitApplication}
        />
        {/* <div className="apply-button" onClick={submitApplication}>Apply</div> */}
        
      </div>
  );

}

export default ApplicationPage;