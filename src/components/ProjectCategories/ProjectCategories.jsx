import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CustomTextBox from "../CustomTextBox/CustomTextBox";
import ProjectSelectionsGrid from "../ProjectSelectionsGrid/ProjectSelectionsGrid";
import { addProjCategory, removeProjCategory } from "../../redux/createProject/createProjectActions";
import "./ProjectCategories.css"
import questionIcon from "../../assets/icons/question-icon.png"
import ReactTooltip from "react-tooltip";
import { setProjCategsList } from "../../redux/serverContent/serverContentActions";


const ProjectCategories = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const url = "/api/constants/interests";

    // var cookie = new Cookies();
    // const jwt_token = cookie.get("fr-accessToken");
    // // const userID = cookie.get("nxs_id");
    // if (jwt_token) {
    //   setaccessToken2(jwt_token);
    //   // setUserID(userID)
    // } else {

    // }

    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(setProjCategsList(data)))
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  // const handleCategoryAddition = (e) => {
  //   if (e.key === 'Enter' && projCategs.length < 5 && e.target.value.length > 0) {
  //     dispatch(addProjCategory(e.target.value));
  //     e.currentTarget.value = "";
  //   }
  // }

  // handle changes in category selections
  const handleCategorySelection = (e, selectedOptions) => {
    let selection = e.target.textContent;

    if (selectedOptions.includes(selection)) {
      dispatch(removeProjCategory(selection));
    } else {
      if (selectedOptions.length < 5) {
        dispatch(addProjCategory(selection));
      }

    }
  }

  const renderCategories = (categories) => {
    console.log(categories.length);
    return categories.map((categ) => <div className="selection-proj-categories">
      <p>{categ}</p>
    </div>)
  }

  return (
    <div className="center-pane">

      {/* <div className="selections-container-categ">
        {renderCategories(projCategs)}
      </div> */}

      <div className="header-icon-wrapper">
        <p className="project-name-header">How would you categorize your project?</p>
        <img data-for="categ-tip" data-tip={props.tooltip} className={"question-icon"} src={questionIcon} alt="question icon"></img>

        <ReactTooltip
          id="categ-tip"
          className="!important tooltip-text"
          place="right"
          type="light"
          padding={"2px"}
          border={true} />
      </div>
      <p className="project-page-subtitle">(max 5 categories)</p>




      <ProjectSelectionsGrid selectionType={'projCategs'} onClick={handleCategorySelection} />
      {/* <CustomTextBox className="sign-up-detail" onKeyPress={handleCategoryAddition}></CustomTextBox> */}
    </div>
  )
}

export default ProjectCategories;