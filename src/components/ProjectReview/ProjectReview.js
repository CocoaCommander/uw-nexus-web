import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/Logo.png";
import personIcon from "../../assets/icons/person-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import timeIcon from "../../assets/icons/time-icon.svg";
import "./ProjectReview.css";

const ProjectReview = (props) => {

  const dispatch = useDispatch();
  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const location = useSelector((state) => state.createProj.location);

  const placeholderRole = [{
    role: "UX Designers",
    skill: ["Javascript", "Python", "teamwork"],
    responsibilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit"
  }, {
    role: "UX Designers",
    skill: ["Javascript", "Python", "teamwork"],
    responsibilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit"
  }, {
    role: "UX Designers",
    skill: ["Javascript", "Python", "teamwork"],
    responsibilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit"
  }]


  // redirect user to whatever screen comes up after creating a project
  const redirectHomeScreen = () => {

  }

  const renderRoles = (roles) => {
    if (roles) {
      
      return roles.map((role) => 
      <div className="roles-block">

        <div className="role-container">
          <p className="role-name-rev">{role.role}</p>
        </div>


        <label className="roles-label">Skills</label>
        <div className="selections-container">
          {renderRoleSkill(role)}
        </div>

        <div className="resp-container">
          <label className="roles-label">Responsibilities</label>
          {renderResponsibilities(role.responsibilities)}
        </div>

      </div>
    )
    }
  }

  const renderResponsibilities = (resp) => {
    const lines = resp.trim().split("\n");
    return lines.map((line) => <p className="resp-line">{line}<br/></p>);

  }

  const renderRoleSkill = (role) => {
    console.log("for role = " + role + " skills = " + role.skill);
    let res = role.skill.map((skill) => 
      <div className="selection-rev">
        <p>{skill}</p>
      </div>
    )
    console.log(res);
    return res;
  }



  return (
    <div className="all-container-rev">

        <div className="header">
          <img className={"logo-rev"} src={logo}></img>
        </div>

        <div className="seperation">
          <div className="content-body">
            <div className="name-keyword-wrapper">
              <p className="proj-name">Organization Name / Project Name</p>
              <p className="keywords">Keywords: Lorem, Lorem, Lorem, Lorem</p>
            </div>

            <div className="icon-wrapper">
              <div className="det-wrapper">
                <img src={personIcon}></img>
                <p className="det-text">small (6-10)</p>
              </div>

              <div className="det-wrapper">
                <img src={locationIcon}></img>
                <p className="det-text">University of Washington</p>
              </div>
            </div>

            <p className="proj-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p className="open-roles">Open Roles</p>


            <div className="roles-list">
              <div className="dur-apply-wrapper">
                <div className="project-dur-wrapper">
                  <img src={timeIcon}></img>
                  <p className="det-text">6-9 months</p>
                </div>

                <p className="apply">Apply</p>
              </div>

              {renderRoles(placeholderRole)}
            </div>
          </div>


          <div className="finish-buttons-wrapper-rev">
            <button className="review-button" type="submit" onClick={redirectHomeScreen}>Publish</button>
          </div>
        </div>
    </div>







  )
}

export default ProjectReview;