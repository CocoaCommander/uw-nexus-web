import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import questionIcon from "../../assets/icons/question-icon.png";

const ProjectDescription = ({
    handleTextboxChange,
    toolTipMsg
}) => {

    const errorMsg = useSelector((state) => state.createProj.errorMsg);

    return (
        <div className="vertical-center">
            <div className="center-pane">
                <div className="header-icon-wrapper">
                    <p className="project-name-header">How would you describe your project? <span className="asterix"> *</span></p>
                    <img data-for="desc-tip" data-tip={toolTipMsg} className={"question-icon"} src={questionIcon} alt="question icon"></img>
                    <ReactTooltip
                        id="desc-tip"
                        className="!important tooltip-text"
                        place="right"
                        type="light"
                        padding={"2px"}
                        border={true}/>
                </div>
  
                <div className="field-set">
                    <CustomTextArea
                    className="proj-desc-area"
                    name="projDesc" 
                    reducer="createProj" 
                    onChange={handleTextboxChange} 
                    placeholder={`E.g. The main goal of our project is to find accessible treatments for people who may be unable to seek current treatment options either due to cost, distance, or other socioeconomic factors. We will be begin by analyzing data that provides us with this information and start brainstorming possible solutions to this issue. For this project we are looking at 4-5 hours  per week done in and outside of meetings.`}>
                    </CustomTextArea>
                </div>
            </div>
            <p className="error-msg">{errorMsg}</p>
        </div>
    )
}

export default ProjectDescription;