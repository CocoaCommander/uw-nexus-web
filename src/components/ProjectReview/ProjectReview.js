import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/Logo.png";
import personIcon from "../../assets/icons/person-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import timeIcon from "../../assets/icons/time-icon.svg";
import "./ProjectReview.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { clearAll } from "../../redux/createProject/createProjectActions";

const ProjectReview = (props) => {

  const dispatch = useDispatch();
  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const location = useSelector((state) => state.createProj.location);
  const projRoles = useSelector((state) => state.createProj.roles);

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {

    var cookie = new Cookies();
    const jwt_token = cookie.get("jwt_token");
    if (jwt_token) {
      setAccessToken(jwt_token);
      console.log("already authenticated!");
    } else {
      console.log("not authenticated");
    }
  }, []);



  console.log(projRoles);

  const placeholderRole = [{
    role: "UX Designers",
    skill: ["Javascript", "Python", "teamwork"],
    responsibilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit"
  }, {
    role: "UX Designers",
    skill: ["Javascript", "Python", "teamwork"],
    responsibilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit"
  }]

  const navigate = useNavigate();

  const a_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODgxNWFlOWZiNjQ3YTBmYzM1NmNmNiIsImlhdCI6MTY1MDk2NjI4MywiZXhwIjoxNjUxMDUyNjgzfQ.Fk7dmv4U71ABXPl4aaa3HZL0Nzr82aDK3VizubjoG-g";


  // redirect user to whatever screen comes up after creating a project
  const redirectHomeScreen = async () => {
    await publishProject();
    dispatch(clearAll());
    navigate('/projects');
  }

  const publishProject = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/project/createProject`;

    let createProjInfo = {
      title: projName,
      size: teamSize,
      location: location,
      duration: {
        length: projDur
      },
      description: projDesc,
      skill: ["Graphic Design"],
      roles: projRoles,
      categories: projCategs
    }

    console.log("sending " + createProjInfo);
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(createProjInfo)
    };

    let response = await fetch(url, requestOptions);

    if (response.ok) {
      console.log("success");
    } else {
      console.log(response.statusText);
    }
    console.log(response);
  }

  const renderRoles = (roles) => {
    if (roles) {
      
      return roles.map((role) => 
      <div className="roles-block">

        <div className="role-name-container">
          <p className="role-name-rev">{role.role}</p>
        </div>


        <label className="roles-label">Skills</label>
        <div className="selections-container-prev">
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
              <p className="proj-name">{projName}</p>
              <p className="keywords">Keywords: Lorem, Lorem, Lorem, Lorem</p>
            </div>

            <div className="icon-wrapper">
              <div className="det-wrapper">
                <img src={personIcon}></img>
                <p className="det-text">{teamSize}</p>
              </div>

              <div className="det-wrapper">
                <img src={locationIcon}></img>
                <p className="det-text">{location}</p>
              </div>
            </div>

            <p className="proj-description">{projDesc}
            </p>

            <p className="open-roles">Open Roles</p>


            <div className="roles-list">
              <div className="dur-apply-wrapper">
                <div className="project-dur-wrapper">
                  <img src={timeIcon}></img>
                  <p className="det-text">{projDur}</p>
                </div>

                <p className="apply">Apply</p>
              </div>

              {renderRoles(projRoles)}
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