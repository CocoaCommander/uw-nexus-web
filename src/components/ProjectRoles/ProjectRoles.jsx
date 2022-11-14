import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTextBox from "../CustomTextBox/CustomTextBox";
import { addRole } from "../../redux/createProject/createProjectActions";
import "./ProjectRoles.css"
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import Select from "react-select";

const ProjectRoles = ({

  }) => {

  const [currentRole, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [currentSkills, setSkills] = useState([]);
  const [resp, setResp] = useState("");

  const skills = useSelector(state => state.serverContent.skillsList);

  const dispatch = useDispatch();

  const projRoles = useSelector((state) => state.createProj.roles);

  const selectBarStyling = {
    control: (provided) => ({
      ...provided,
      border: "solid 1.5px #c4c4c4",
      borderRadius: "5px",
      height: "50px",
    }),

    input: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),

    menuList: (provided) => ({
      ...provided,
      height: 130
    }),


    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "black",
      padding: "0px",
      display: "flex",
      justifyContent: "flex-end",
      width: "17px",
      height: "20px",
      marginLeft: "10px",
      paddingRight: "2px"
    })
  }

  const selectOptions = () => {
    return skills.map(skill => {
      return {value: skill, label: skill}
    })
  }

  const handleSkillAddition = (e) => {
    console.log(e);
    if (e.key === 'Enter' && currentSkills.length < 5 && skill.length > 0) {
      setSkills(prev => {
        return [...prev, skill]
      })
      setSkill("");
    }
  }


  const updateRolls = () => {
    if (currentRole.length > 0 && currentSkills.length > 0 && resp.length > 0) {
      const newRole = {
        title: currentRole,
        role: currentRole,
        skill: currentSkills,
        responsibilities: resp,
      }

      //props.onAdd();
      dispatch(addRole(newRole));
      setRole("");
      setSkills([]);
      setResp("");
    }
  }
  

  const renderSkills = (skills) => {
    return skills.map((skill) => <div className="selection-proj-roles-2">
      <p>{skill}</p>
    </div>)
  }

  const renderRoleSkill = (role) => {
    let res = role.skill.map((skill) => 
      <div className="selection-proj-roles">
        <p>{skill}</p>
      </div>
    )
    console.log(res);
    return res;
  }

  const renderResponsibilities = (resp) => {
    const lines = resp.trim().split("\n");
    return lines.map((line) => <p className="resp-line">{line}<br/></p>);

  }

  const renderRoles = (roles) => {
    if (roles) {
      
      return roles.map((role) => 
      <div className="roles-block">

        <div className="role-name-container">
          <label className="roles-label">Role</label>
          <p className="role-name">{role.role}</p>
        </div>


        <div className="selections-container-cp">
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

  return(
    <div className="center-pane">
      <p className="gen-info-title">Roles</p>
      


    <div className={"roles-input-after"}>

    <p className="project-name-header-roles">What kind of people are you looking for? <span className="asterix">*</span></p>
    <p className="project-roles-directions">
      After selecting a skillset/tool, press enter to add it to that role. 
      Once a role is completed press add roles at the bottom right to add it 
      and fill out a new one if needed.
    </p>

    <div className="roles-container">
      {renderRoles(projRoles)}
    </div>

    <div className="roles-input-container">
      <div className="field-set-cp">
          <label className="roles-label">Roles</label>
          <CustomTextBox value={currentRole} onChange={(e) => {setRole(e.target.value)}} className="sign-up-detail" placeholder={"Roles that you are looking for"}></CustomTextBox>
        </div>

        <div className="field-set-cp">
          <label className="roles-label">Skillsets / Tools</label>
          {/* <CustomTextBox value={skill}
                        className="sign-up-detail"
                        placeholder={"Qualifications of the role"}
                        onChange={(e) => {setSkill(e.target.value)}} 
                        onKeyPress={handleSkillAddition}/> */}
            <Select className="react-select-bar"
            name="skillset"
            placeholder="Qualifications of the role"
            defaultValue={skill}
            onChange={(e) => setSkill(e.value)}
            options={selectOptions()}
            styles={selectBarStyling}
            onKeyDown={handleSkillAddition}
            maxMenuHeight={300}>

          </Select>
        </div>

        <div className="selections-skills-container">
            {renderSkills(currentSkills)}
          </div>

        <div className="resp-set">
          <label className="roles-label">Responsibilities</label>
          <CustomTextArea 
                          value={resp}
                          className="resp-text-area"
                          placeholder={"What reponsibilities this role will uphold"}
                          onChange={(e) => {setResp(e.target.value)}}>
                          
          </CustomTextArea>
        </div>

        <div onClick={updateRolls} className="add-role-wrapper">
          <span className="add-role-text">Add Roles</span>
        </div>
      </div>  
    </div>
    </div>
  )
}

export default ProjectRoles;