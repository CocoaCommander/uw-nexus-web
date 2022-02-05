import '../../App.css';
import { ReactComponent as TimeIcon } from '../../assets/time-icon.svg';
import { ReactComponent as PersonIcon } from '../../assets/person-icon.svg';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';

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
        default:
            projectSize = 'Large (20+)'
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
                <div className='stat-item align-to-right'>
                    <TimeIcon className='stat-item-icon'/>
                    <p>{project.duration.length}</p>
                </div>
                <div className='stat-item'>
                    <PersonIcon className='stat-item-icon'/>
                    <p>{projectSize}</p>
                </div>
                <div className='stat-item'>
                    <LocationIcon className='stat-item-icon'/>
                    <p>{project.location}</p>
                </div>
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
