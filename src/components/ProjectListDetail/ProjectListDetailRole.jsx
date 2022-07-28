import ProjectListDetailRoleSkills from "./ProjectListDetailRoleSkills";
import { ReactComponent as TimeIcon } from '../../assets/time-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import "./ProjectListDetailRole.css";

const ProjectListDetailRole = ({
    role, duration, projDetails
}) => {
    const projectTitle = projDetails.projectTitle;
    const owner_email = projDetails.owner_email;
    return (
        <div className="project-list-detail-role-container">
            <div className="title-duration-apply-wrapper">
              <p className="project-list-role-title">{role.title}</p>
              <div className="duration-apply-wrapper">
                <TimeIcon />
                <p className="project-list-detail-logistics-inner-text">{duration}</p>
                <Link className="proj-apply-link" to={`/apply/${projectTitle}/${role.title}`} state={{email: owner_email}}>
                  <button className='proj-apply-button'>Apply</button>
                </Link>
              </div>
            </div>

            <ProjectListDetailRoleSkills skills={role.skill} /> 
            <p className="project-list-resp-title">Responsibilities</p>
            <p className="project-list-resp-text">{role.responsibilities}</p>
        </div>
    )
}

export default ProjectListDetailRole