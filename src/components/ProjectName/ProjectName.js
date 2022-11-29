import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import questionIcon from "../../assets/icons/question-icon.png";
import CustomTextBox from "../CustomTextBox/CustomTextBox";

const ProjectName = ({
    handleTextboxChange,
    toolTipMsg
}) => {

    const errorMsg = useSelector((state) => state.createProj.errorMsg);

    return (
        <div className="vertical-center">
            <div className="center-pane">
                <div className="header-icon-wrapper">
                    <p className="project-name-header">What is the name of your Project? <span className="asterix"> *</span></p>
                    <img data-for="main" data-tip={toolTipMsg} className={"question-icon"} src={questionIcon} alt="question icon"></img>
                    <ReactTooltip
                       id="main"
                       className="!important tooltip-text"
                       place="right"
                       type="light"
                       padding={"2px"}
                       border={true}/>
                </div>
                <div className="field-set">
                    <CustomTextBox className="sign-up-detail" name="projName" reducer="createProj" onChange={handleTextboxChange} placeholder={"E.g. Accessible Treatments"}></CustomTextBox>
                </div>
            </div>
            <p className="error-msg">{errorMsg}</p>
        </div>
    )

}

export default ProjectName;