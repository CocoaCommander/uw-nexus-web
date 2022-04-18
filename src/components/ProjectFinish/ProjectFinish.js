import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import editIcon from "../../assets/icons/edit-icon.png";
import projDoneImage from "../../assets/proj-done.png";
import { setProjName } from "../../redux/createProject/createProjectActions";
import "./ProjectFinish.css";
import Cookies from 'universal-cookie';

const ProjectFinish = (props) => {

  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const location = useSelector((state) => state.createProj.location);
  const roles = useSelector((state) => state.createProj.roles);

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


  // redirect user to whatever screen comes up after creating a project
  const redirectHomeScreen = () => {

  }

  // redirect user to ReviewProject screen
  const redirectReviewScreen = async () => {
    await publishProject();
    // redirect
  }

  const publishProject = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/project/createProject`;

    let createProjInfo = new FormData();

    createProjInfo.append("title", projName );
    createProjInfo.append("size", teamSize);
    createProjInfo.append("location", location);
    createProjInfo.append("duration", JSON.stringify({
      "length": projDur
    }));
    createProjInfo.append("description", projDesc);
    createProjInfo.append("skill", ["1", "2"]);
    createProjInfo.append("roles", JSON.stringify(roles));
    createProjInfo.append("categories", projCategs);

    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': `Bearer ${accessToken}` },
      body: createProjInfo
  };

  let response = await fetch(url, requestOptions);

  if (response.ok) {
    console.log("success");
  } else {
    console.log(response.statusText);
  }
  console.log(response);
  }

  return (
    <div className="all-container">
      <div className="center-pane">
        <p className="finish-title">Congratulations!</p>
        <p className="finish-subtitle">You just successfully created your project and we are about to publish!</p>

        <img className={"proj-done-img"} src={projDoneImage}></img>

        <p className="review-proj-text">Would you like to review your project <br/> before publishing?</p>

      </div>
        <div className="finish-buttons-wrapper">
          <button className="publish-button" type="submit" onClick={redirectHomeScreen}>Publish Now</button>
          <button className="review-button" type="submit" onClick={redirectReviewScreen}>Review Project</button>
        </div>
      
    </div>
  )
}

export default ProjectFinish;