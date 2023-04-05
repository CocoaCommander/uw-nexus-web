

import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import questionIcon from "../../assets/icons/question-icon.png";
import CustomTextBox from "../CustomTextBox/CustomTextBox";

const ProjectLocation = ({
    handleTextboxChange,
    toolTipMsg
}) => {

    const errorMsg = useSelector((state) => state.createProj.errorMsg);

    return (
        <div className="vertical-center">
            <div className="center-pane">
            <p className="gen-info-title">Location</p>
            <div className="header-icon-wrapper">
                <p className="project-name-header">Where would your meetings be located? <span className="asterix"> *</span></p>
                <img data-for="loc-tip" data-tip={toolTipMsg} className={"question-icon"} src={questionIcon} alt="question icon"></img>
                <ReactTooltip
                    id="loc-tip"
                    className="!important tooltip-text"
                    place="right"
                    type="light"
                    padding={"2px"}
                    border={true}/>
            </div>
            <p className="project-page-subtitle">(If the location is irregular, you may enter a general location such as the University of Washington.)</p>
    
            <div className="field-set">
                <CustomTextBox className="sign-up-detail" name="location" reducer="createProj" onChange={handleTextboxChange} placeholder={"Enter a location..."}></CustomTextBox>
                </div>
            </div>
            <p className="error-msg">{errorMsg}</p>
        </div>
    )

}

export default ProjectLocation;