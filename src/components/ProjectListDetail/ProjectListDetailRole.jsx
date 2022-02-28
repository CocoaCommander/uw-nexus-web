import ProjectListDetailRoleSkills from "./ProjectListDetailRoleSkills"

const ProjectListDetailRole = ({
    role
}) => {

    return (
        <div className="project-list-detail-role-container">
            <h5>{role.title}</h5>
            <h6>Skills</h6>
            <ProjectListDetailRoleSkills skills={role.skill} /> 
            <h6>Responsibilities</h6>
            <ol>
                {role.responsibilities.map(resp => <li>{resp}</li>)}
            </ol>
        </div>
    )
}

export default ProjectListDetailRole