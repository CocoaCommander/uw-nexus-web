import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTextBox from "../CustomTextBox/CustomTextBox";
import { addRole } from "../../redux/createProject/createProjectActions";
import "./ProjectRoles.css"
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { render } from "react-dom";



const ProjectRoles = (props) => {

  const [currentRole, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [currentSkills, setSkills] = useState([]);
  const [resp, setResp] = useState("");

  const dispatch = useDispatch();

  const projRoles = useSelector((state) => state.createProj.roles);

  const handleSkillAddition = (e) => {
    if (e.key === 'Enter' && currentSkills.length < 5) {
      setSkills(prev => {
        return [...prev, e.target.value]
      })
      setSkill("");
    }
  }


  const updateRolls = () => {
    if (currentRole.length > 0 && currentSkills.length > 0 && resp.length > 0) {
      const newRole = {
        role: currentRole,
        skill: currentSkills,
        responsibilities: resp,
      }

      props.onAdd();
      dispatch(addRole(newRole));
      setRole("");
      setSkills([]);
      setResp("");
    }
  }

  console.log(projRoles);
  

  const renderSkills = (skills) => {
    return skills.map((skill) => <div className="selection-proj-roles">
      <p>{skill}</p>
    </div>)
  }

  const renderRoleSkill = (role) => {
    console.log("for role = " + role + " skills = " + role.skill);
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

    <div className="roles-container">
      {renderRoles(projRoles)}
    </div>

      


    <div className="roles-input">

    <p className="project-name-header">What kind of people are you looking for?</p>

    <div className="field-set-cp">
        <label className="roles-label">Roles</label>
        <CustomTextBox value={currentRole} onChange={(e) => {setRole(e.target.value)}} className="sign-up-detail" placeholder={"Roles that you are looking for"}></CustomTextBox>
      </div>

      <div className="field-set-cp">
        <label className="roles-label">Skillsets / Tools</label>
        <CustomTextBox value={skill}
                       className="sign-up-detail"
                       placeholder={"Qualifications of the role"}
                       onChange={(e) => {setSkill(e.target.value)}} 
                       onKeyPress={handleSkillAddition}></CustomTextBox>
      </div>

      <div className="selections-container-categ">
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
        <span className="add-role-text">Add Role</span>
      </div>


    </div>

    </div>
  )
}

export default ProjectRoles;