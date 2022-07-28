const ProjectListDetailRoleSkills = ({
    skills
}) => {

    console.log(skills);
    return (
        <div>
            <p className="project-list-skills-text">Skills</p>
            <div className="project-list-skills-container">
                {skills.map(skill => <div className="skill-container small-skill-container">{skill}</div>)}
            </div>
        </div>
    )
}

export default ProjectListDetailRoleSkills;