const ProjectListDetailRoleSkills = ({
    skills
}) => {

    console.log(skills);
    return (
        <div>
            <h6>Skills</h6>
            <div className="role-container no-border">
                {skills.map(skill => <div className="skill-container small-skill-container">{skill}</div>)}
            </div>
        </div>
    )
}

export default ProjectListDetailRoleSkills;