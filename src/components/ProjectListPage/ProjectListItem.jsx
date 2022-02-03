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

    let projectSize = "";

    switch(project.size) {
        case 'Small':
            projectSize = 'Small (6-10)'
            break;
        case 'Medium':
            projectSize = 'Medium (11-20)'
            break;
        case 'Large':
            projectSize = 'Large (20+)'
            break;
        default:
            console.log(project.size)
            break;
    }
    const roleElements = project.roles.map((role, i) => {
        const roleSkillElements = role.skill.map((skill, i) => {
            return (
                <div className='skill-container' key={i}>{skill}</div>
            )
        });
        return (
            <div className='role-container' key={i}>
                <p className='role-title'>{role.title}</p>
                {roleSkillElements}
            </div>
        );
    });
    
    return (
        <div className={"project-list-item-container"}>
            <div className={"project-list-item-stats"}>
                <p className='stat-item align-to-right'>{project.duration.length}</p>
                <p className='stat-item'>{projectSize}</p>
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
