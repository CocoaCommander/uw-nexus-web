import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addResume } from "../../redux/signUp/signUpActions";
import "./ResumeUpload.css";

const ResumeUpload = (props) => {

  const dispatch = useDispatch();
  const resume = useSelector((state) => state.signUp.resume);


  const renderPDF = () => {
    if (resume) {
      return (
        <div className="e-pdf-container">
          <embed className="e-pdf" src={URL.createObjectURL(resume)}></embed>
          <p>{resume.name}</p>
        </div>
      )
      
    }
  }

  const onFileChange = (e) => {

    console.log(e.target.files[0]);
    dispatch(addResume(e.target.files[0]));
    // const formData = new FormData();

  }

  const submitResume = () => {
    buttonRef.current.click();
  }

  const buttonRef = useRef(null);


  return(

    <div className="col-container">
      <p className="resume-text">Uploading a resume and/or cover letter are incredibly helpful for <br></br> project owners to get a better idea of your skills and qualities</p>
      <div className="main-container">

        <div className="resources-container">
          <p className="resources-title">Resources</p>

          <div className="resources-tab">
            <div className="resources-option">
              <p className="resource-subtitle">Top 10 Most Common Resume Errors</p>
              <p className="resource-text">Loren Ipsum</p>
            </div>

            <div className="resources-option">
              <p className="resource-subtitle">How to Word Your Resume</p>
              <p className="resource-text">Loren Ipsum</p>
            </div>

            <div className="resources-option">
              <p className="resource-subtitle">What Not To Put in Your Resume</p>
              <p className="resource-text">Loren Ipsum</p>
            </div>

            <div className="resources-option">
              <p className="resource-subtitle">Must Have's in Resumes</p>
              <p className="resource-text">Loren Ipsum</p>
            </div>

            <div className="resources-option">
              <p className="resource-subtitle">Example Resume: UW's Purple and Gold Resume Template</p>
              <p className="resource-text">Loren Ipsum</p>
            </div>

          </div>


        </div>

        <div className="res-container">

            <p className="res-title">Resume</p>
          
          <div className="res-option" onClick={() => {submitResume()}}>
            <p className="res-text">ATTACH</p>
            <input ref={buttonRef} className={"file-button"} type={"file"} onChange={onFileChange}></input>
          </div>
        </div>

        {renderPDF()}
            
      </div>
    </div>
  )
}

export default ResumeUpload;