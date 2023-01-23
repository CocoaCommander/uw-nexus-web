import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addResume, setErrorMsg } from "../../redux/signUp/signUpActions";
import "./ResumeUpload.css";

const ResumeUpload = (props) => {

  const dispatch = useDispatch();
  const resume = useSelector((state) => state.signUp.resume);
  const errorMsg = useSelector((state) => state.signUp.errorMsg);


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

  // adds resume to global state if the file uploaded is a pdf <= 5 MB
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type == "application/pdf") {
      if (file.size > 5000000) {
        dispatch(setErrorMsg("File is too big."));
      }
      dispatch(setErrorMsg(""));
      dispatch(addResume(e.target.files[0]));
    } else {
      dispatch(setErrorMsg("Incorrect file format. Please upload a pdf file"));
    }
  }

  const submitResume = () => {
    buttonRef.current.click();
  }

  const buttonRef = useRef(null);


  return(

    <div className="col-container">
      <p className="resume-text">Uploading a resume and/or cover letter are incredibly helpful for 
        <br></br> project owners to get a better idea of your skills and qualities
        <br></br> Please submit a pdf below (Max file size: 5 MB)</p>
      <div className="main-container">
        <div className="res-container">

            <p className="res-title">Resume</p>
          
          <div className="res-option" onClick={() => {submitResume()}}>
            <p className="res-text">ATTACH</p>
            <input ref={buttonRef} className={"file-button"} type={"file"} onChange={onFileChange}></input>
          </div>
        </div>

        {renderPDF()}
        <p className="error-msg-signup">{errorMsg}</p>
            
      </div>
    </div>
  )
}

export default ResumeUpload;