const ProjectListDetailRoleSkills = ({
    skills
}) => {

    console.log(skills);
    return (
        <div className="role-container no-border">
            {skills.map(skill => <div className="skill-container">{skill}</div>)}
        </div>
    )
}

export default ProjectListDetailRoleSkills;