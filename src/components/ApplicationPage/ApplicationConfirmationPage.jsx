import React from 'react';
import './ApplicationConfirmationPage.css';

const ConfirmationPage = (props) => {
  const {
    to_name,
    proj_name,
    position,
    proj_email,
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
                <td>{to_name}</td>
              </tr>
              <tr>
                <th>Project Name</th>
                <td>{proj_name}</td>
              </tr>
              <tr>
                <th>Position</th>
                <td>{position}</td>
              </tr>
              <tr>
                <th>Project Email</th>
                <td>{proj_email}</td>
              </tr>
              <tr>
                <th>Major</th>
                <td>{major}</td>
              </tr>
              <tr>
                <th>Graduation Year</th>
                <td>{year}</td>
              </tr>
              <tr>
                <th>Purpose</th>
                <td>{purpose}</td>
              </tr>
              <tr>
                <th>Relevant Experience</th>
                <td>{experience}</td>
              </tr>
              <tr>
                <th>Hours Dedicated</th>
                <td>{hours}</td>
              </tr>
              <tr>
                <th>Relevant Classes</th>
                <td>{relevantClasses}</td>
              </tr>
              <tr>
                <th>Will Meet</th>
                <td>{willMeet ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Extra Questions</th>
                <td>{extraQuestions}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className="app-page-footer" />
    </div>
  );
};

export default ConfirmationPage;
