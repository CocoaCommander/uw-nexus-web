import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import projDoneImage from "../../assets/proj-done.png";
import { clearAll } from "../../redux/createProject/createProjectActions";
import "./ProjectFinish.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import LoadingButton from "../LoadingButton/LoadingButton";

const ProjectFinish = (props) => {

  const projName = useSelector((state) => state.createProj.projName);
  const projDesc = useSelector((state) => state.createProj.projDesc);
  const teamSize = useSelector((state) => state.createProj.teamSize);
  const projDur = useSelector((state) => state.createProj.projDur);
  // const projStatus = useSelector((state) => state.createProj.projStatus);
  const projCategs = useSelector((state) => state.createProj.projCategs);
  const location = useSelector((state) => state.createProj.location);
  const roles = useSelector((state) => state.createProj.roles);

  const [accessToken2, setaccessToken2] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() => {

    var cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    if (jwt_token) {
      setaccessToken2(jwt_token);
    }
  }, []);


  // redirect user to whatever screen comes up after creating a project
  const redirectHomeScreen = async () => {
    setIsLoading(true);
    await publishProject();
    dispatch(clearAll());
    setIsLoading(false);
    navigate('/projects');
  }

  // redirect user to ReviewProject screen
  const redirectReviewScreen = async () => {
    navigate('/reviewProject');
    // redirect
  }

  const publishProject = async () => {
    const url = `/api/project/createProject`;

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

    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': `Bearer ${accessToken2}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(createProjInfo),
      credentials: 'include'
    };

    let response = await fetch(url, requestOptions);
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
          <LoadingButton 
            title={"Publish Now"} 
            className={"publish-button"} 
            onClick={redirectHomeScreen} 
            isLoading={isLoading}
            active={"publish-button-active"}/>
          {/* <button className="publish-button" type="submit" onClick={redirectHomeScreen}>Publish Now</button> */}
          <button className="review-button" type="submit" onClick={redirectReviewScreen}>Review Project</button>
        </div>
      
    </div>
  )
}

export default ProjectFinish;