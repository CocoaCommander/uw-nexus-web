import '../../App.css'

const ProjectListItem = ({
    project,
    isLoading
}) => {
    if (isLoading) {
        return (
            <></>
        )
    }
    console.log(project.categories)
    const roleElements = project.roles.map(role => {
        const roleSkillElements = role.skill.map(skill => {
            return (
                <div className='skill-container'>{skill}</div>
            )
        });
        return (
            <div className='role-container'>
                <p className='role-title'>{role.title}</p>
                {roleSkillElements}
            </div>
        );
    });
    
    return (
        <div className={"project-list-item-container"}>
            <div className={"project-list-item-stats"}>
                <p className='stat-item align-to-right'>{project.duration.length}</p>
                <p className='stat-item'>{project.size}</p>
                <p className='stat-item'>{project.location}</p>
            </div>
            <div className="project-list-item-header">
                <h3>{project.title}</h3>
            </div>
            <div className="project-list-item-interests">
                <p>Project Interests:</p>
                {/* TODO: implement project interests */}
            </div>
            <div className="project-list-item-role-container">
                {roleElements}
            </div>
        </div>
    )
}

export default ProjectListItem;
