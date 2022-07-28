import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import projDoneImage from "../../assets/proj-done.png";
import { clearAll } from "../../redux/createProject/createProjectActions";
import "./ProjectFinish.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const ProjectFinish = (props) => {

  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  // const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const location = useSelector((state) => state.createProj.location);
  const roles = useSelector((state) => state.createProj.roles);

  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() => {

    var cookie = new Cookies();
    const jwt_token = cookie.get("accessToken");
    if (jwt_token) {
      setAccessToken(jwt_token);
      console.log("already authenticated!");
    } else {
      console.log("not authenticated");
    }
  }, []);


  // redirect user to whatever screen comes up after creating a project
  const redirectHomeScreen = async () => {
    await publishProject();
    dispatch(clearAll());
    navigate('/projects');
  }

  // redirect user to ReviewProject screen
  const redirectReviewScreen = async () => {
    navigate('/reviewProject');
    // redirect
  }

  const publishProject = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/project/createProject`;

    let createProjInfo = {
      title: projName,
      owner_email: props.email,
      size: teamSize,
      location: location,
      duration: {
        length: projDur
      },
      description: projDesc,
      skill: ["Graphic Design"],
      roles: roles,
      categories: projCategs
    }

    console.log("sending " + createProjInfo);
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(createProjInfo),
      credentials: 'include'
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
      {/* <div className="center-pane"> */}
        <p className="finish-title">Congratulations!</p>
        <p className="finish-subtitle">You just successfully created your project and we are about to publish!</p>

        <img className={"proj-done-img"} src={projDoneImage} alt="project done"></img>

        <p className="review-proj-text">Would you like to review your project <br/> before publishing?</p>

      {/* </div> */}
        <div className="finish-buttons-wrapper">
          <button className="publish-button" type="submit" onClick={redirectHomeScreen}>Publish Now</button>
          <button className="review-button" type="submit" onClick={redirectReviewScreen}>Review Project</button>
        </div>
      
    </div>
  )
}

export default ProjectFinish;