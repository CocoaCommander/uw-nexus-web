import { useEffect, useState } from "react";
import ProjectListDetailRole from "../components/ProjectListDetail/ProjectListDetailRole";
import getData from "../logic/getData";
import { ReactComponent as TimeIcon } from '../assets/time-icon.svg';
import { ReactComponent as PersonIcon } from '../assets/person-icon.svg';
import { ReactComponent as LocationIcon } from '../assets/location-icon.svg';
import { useParams } from "react-router-dom";

const ProjectListDetail = () => {

    const [project, setProject] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    let params = useParams();

    const THIS_PROJECT = `${process.env.REACT_APP_API_URL}/api/project/${params.projectId}`;

    console.log(params.projectId);

    useEffect(() => {
        getData(setIsLoading, THIS_PROJECT, setProject);
    }, [THIS_PROJECT]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    const projectRoles = project.roles ? project.roles.map(role => <ProjectListDetailRole role={role} />) : [];

    return (
        <div className="project-list-detail-page">
            <h2 className="project-list-detail-page-element">{project.title}</h2>
            <p className="project-list-detail-page-element">{project.categories ? "Key Words: " + project.categories.join(", ") : ""}</p>
            <div className="project-list-detail-logistics project-list-detail-page-element">
                <PersonIcon />
                <p className="project-list-detail-logistics-inner-text">{project.size ? project.size : ""}</p>
                <LocationIcon />
                <p className="project-list-detail-logistics-inner-text">{project.location}</p>
                <TimeIcon />
                <p className="project-list-detail-logistics-inner-text">{project.duration ? project.duration.length : ""}</p>
            </div>
            <p className="project-list-detail-page-element">{project.description}</p>
            <h4 className="project-list-detail-page-element">Open Roles</h4>
            {projectRoles}
        </div>
    )
}

export default ProjectListDetail;