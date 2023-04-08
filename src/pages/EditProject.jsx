import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ReactComponent as PersonIcon } from '../assets/person-icon.svg';
import { ReactComponent as LocationIcon } from '../assets/location-icon.svg';
import ProjectListDetailRole from "../components/ProjectListDetail/ProjectListDetailRole";
import ProjectListDetailRoleSkills from "../components/ProjectListDetail/ProjectListDetailRoleSkills";
import { ReactComponent as TimeIcon } from '../assets/time-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import '../EditProject.css';
import LoadingButton from "../components/LoadingButton/LoadingButton";

const EditProject = ({
    userProfile
}) => {

    const [project, setProject] = useState({});
    const params = useParams();

    const [openRoles, setOpenRoles] = useState([]);
    const [closedRoles, setClosedRoles] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProject();
    }, [])

    const fetchProject = async() => {
        const project_id = params.projectId;
        const url = `/api/project/${project_id}`;

        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };

        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const project = await response.json();
            setProject(project);
            setOpenRoles(project.roles.filter(role => !role.isFilled));
            setClosedRoles(project.roles.filter(role => role.isFilled));
        }
    }

    const handleRoleStatus = (clickedRole) => {
        if (clickedRole.isFilled) {
            setClosedRoles(closedRoles.filter(role => role.title != clickedRole.title));
            clickedRole.isFilled = false;
            setOpenRoles(prev => [...prev, clickedRole]);
        } else {
            setOpenRoles(openRoles.filter(role => role.title != clickedRole.title));
            clickedRole.isFilled = true;
            setClosedRoles(prev => [...prev, clickedRole]);
        }
    }

    const projectInterests = project?.interests ? project.interests.map(interest => <p className="proj-item-interest">{interest}</p>) : ""

    const renderProjectRole = (role, duration, isFilled) => {
        return (
            <div className="project-list-detail-role-container">
            <div className="title-duration-apply-wrapper">
              <p className="project-list-role-title">{role.title}</p>
              <div className="duration-apply-wrapper">
                <TimeIcon />
                <p className="project-list-detail-logistics-inner-text">{duration}</p>
                <button className='mark-button' onClick={() => handleRoleStatus(role)}>{isFilled ? `Mark as Open` : `Mark as Filled`}</button>
              </div>
            </div>

            <p className="skills-header">Skills</p>
            <ProjectListDetailRoleSkills skills={role.skill} /> 
            <p className="project-list-resp-title">Responsibilities</p>
            <p className="project-list-resp-text">{role.responsibilities}</p>
        </div>
        )
    }

    const handleSaveChanges = async() => {
        const project_id = params.projectId;
        const url = `/api/project/update/${project_id}`;

        const payload = {
            ...project,
            roles: openRoles.concat(closedRoles)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include'
        };

        const response = await fetch(url, requestOptions);
        if (response.ok) {
            navigate('/projects');
        }
    }

    const openRolesList = openRoles?.map(role => renderProjectRole(role, project.duration ? project.duration.length : "", role.isFilled));

    const closedRolesList = closedRoles?.map(role => renderProjectRole(role, project.duration ? project.duration.length : "", role.isFilled));

    if (project.owner_email == userProfile.email) {
        return (
            <div className="project-list-detail-page">
                <h2 className="project-list-proj-title">{project.title}</h2>
                <div className="project-list-item-interests">
                    <p className="project-list-interests-text">Project Interests:</p>
                    {projectInterests}
                </div>
    
                <p className="project-list-detail-page-element">{project.categories ? "Key Words: " + project.categories.join(", ") : ""}</p>
                <div className="project-list-detail-logistics project-list-detail-page-element">
                    <PersonIcon />
                    <p className="project-list-detail-logistics-inner-text">{project.size ? project.size : ""}</p>
                    <LocationIcon />
                    <p className="project-list-detail-logistics-inner-text">{project.location}</p>
                    {/* <TimeIcon />
                    <p className="project-list-detail-logistics-inner-text">{project.duration ? project.duration.length : ""}</p> */}
                </div>
                <p className="project-list-detail-description">{project.description}</p>
                <h4 className="project-list-open-roles">Open Roles:</h4>
    
                {openRolesList}
    
                <h4 className="project-list-open-roles">Filled Roles:</h4>
                {closedRolesList}
                <LoadingButton
                    title={"Save Changes"}
                    className={"save-changes-btn"}
                    onClick={handleSaveChanges}
                    isLoading={isLoading}/>
            </div>
        );
    } else {
        return (
                <h1 className="error-msg">Access Denied. You are not the owner of this project</h1>
        )
    }

}

export default EditProject;