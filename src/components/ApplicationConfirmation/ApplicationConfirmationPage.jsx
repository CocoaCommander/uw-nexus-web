import React from 'react';
import './ApplicationConfirmationPage.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = (props) => {

  const navigate = useNavigate();

  const {
    to_name,
    proj_name,
    position,
    app_email,
    major,
    year,
    purpose,
    experience,
    hours,
    relevantClasses,
    willMeet,
    extraQuestions
  } = props.summary;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  scrollToTop();

  return (
    <div>
      <div className="center-pane-app">

        <div className="confirmation-box">
          <h1>Application Submitted!</h1>
          <p>Thank you for submitting your application. We will review it and get back to you soon.</p>
          <h2>Summary</h2>
          <table className="application-summary-table">
            <tbody>
              <tr>
                <th>Name</th>
                <td><span>{to_name}</span></td>
              </tr>
              <tr>
                <th>Project Name</th>
                <td><span>{proj_name}</span></td>
              </tr>
              <tr>
                <th>Position</th>
                <td><span>{position}</span></td>
              </tr>
              <tr>
                <th>Email</th>
                <td><span>{app_email}</span></td>
              </tr>
              <tr>
                <th>Major</th>
                <td><span>{major}</span></td>
              </tr>
              <tr>
                <th>Graduation Year</th>
                <td><span>{year}</span></td>
              </tr>
              <tr>
                <th>Purpose</th>
                <td><span>{purpose}</span></td>
              </tr>
              <tr>
                <th>Relevant Experience</th>
                <td><span>{experience}</span></td>
              </tr>
              <tr>
                <th>Hours Dedicated</th>
                <td><span>{hours}</span></td>
              </tr>
              <tr>
                <th>Relevant Classes</th>
                <td><span>{relevantClasses}</span></td>
              </tr>
              <tr>
                <th>Will Meet</th>
                <td><span>{willMeet ? "Yes" : "No"}</span></td>
              </tr>
              <tr>
                <th>Extra Questions</th>
                <td><span>{extraQuestions}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={() => navigate("/projects")} className={"apply-button"}>Return to Projects</button>

      </div>
      <div className="app-page-footer" />
    </div>
  );
};

export default ConfirmationPage;
