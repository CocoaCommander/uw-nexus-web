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

    const THIS_PROJECT = "http://localhost:3100/api/project/" + params.projectId

    console.log(params.projectId);

    useEffect(() => {
        getData(setIsLoading, THIS_PROJECT, setProject);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    const projectRoles = project.roles ? project.roles.map(role => <ProjectListDetailRole role={role} />) : [];

    return (
        <div className="project-list-detail-page">
            <h2>{project.title}</h2>
            <p>{project.categories ? "Key Words: " + project.categories.join(", ") : ""}</p>
            <div className="project-list-detail-logistics">
                <PersonIcon />
                <p>{project.size ? project.size : ""}</p>
                <LocationIcon />
                <p>{project.location}</p>
                <TimeIcon />
                <p>{project.duration ? project.duration.length : ""}</p>
            </div>
            <p>{project.description}</p>
            <h4>Open Roles</h4>
            {projectRoles}
        </div>
    )
}

export default ProjectListDetail;