

import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import questionIcon from "../../assets/icons/question-icon.png";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const ProjectTeamSize = ({
    handleSelectionChange,
    toolTipMsg
}) => {

    const errorMsg = useSelector((state) => state.createProj.errorMsg);

    return (
        <div className="vertical-center">
            <div className="center-pane">
                <p className="gen-info-title">Team Size</p>
                <div className="drop-downs-container">
                    <div className="dropdown-wrapper">
                        <CustomDropdown 
                                        id="team-size"
                                        name="teamSize"
                                        reducer="createProj"
                                        options={["Small (6-10)", "Medium (11-15)", "Large (15+)"]}
                                        values={["Small", "Medium", "Large"]}
                                        placeholder={"Team Size"}
                                        onChange={handleSelectionChange}>
                        </CustomDropdown>
                        <span className="asterix"> *</span>
                    </div>
        
                    <div className="dropdown-wrapper">
                        <CustomDropdown 
                                        id="project-duration"
                                        name="projDur"
                                        reducer="createProj"
                                        options={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                                        values={["1-3 months", "3-6 months", "6-9 months", "More than 9 months"]}
                                        placeholder={"Project Duration"}
                                        onChange={handleSelectionChange}>
                        </CustomDropdown>
                        <span className="asterix"> *</span>
                    </div>
        
        
                    <div className="dropdown-wrapper">
                        <CustomDropdown 
                                        id="project-status"
                                        name="projStatus"
                                        reducer="createProj"
                                        options={["New Project", "Ongoing Project"]}
                                        values={["New Project", "Ongoing Project"]}
                                        placeholder={"Project Status"}
                                        onChange={handleSelectionChange}>
                        </CustomDropdown>
            
                        <span className="asterix"> *</span>
        
                        <img data-for="desc-tip" data-tip={toolTipMsg} className={"question-icon-dropdown"} src={questionIcon} alt="question icon"></img>
                            <ReactTooltip
                            id="desc-tip"
                            className="!important tooltip-text"
                            place="right"
                            type="light"
                            padding={"2px"}
                            border={true}/>
                    </div>
                </div>
            </div>
            <p className="error-msg">{errorMsg}</p>
        </div>
    )

}

export default ProjectTeamSize;