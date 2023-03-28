import '../../App.css';
import { ReactComponent as TimeIcon } from '../../assets/time-icon.svg';
import { ReactComponent as PersonIcon } from '../../assets/person-icon.svg';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const ProjectListItem = ({
    project,
    isLoading
}) => {
    const navigate = useNavigate();
    if (isLoading) {
        return (
            <></>
        )
    }

    let projectSize = "";

    console.log(project.owner_email);



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

      const handleApplyButton = (e) => {
        if (role.isFilled) {
          e.preventDefault();
        }
      }

        const RoleSkillElements = () => {
          const [isExpanded, setExpanded] = useState(false);
          const skillRef = useRef(null);



          const renderedSkills = role.skill.map((skill, i) => {
            return (
                <div ref={skillRef} className='skill-container' key={i}>{skill}</div>
            )
          });



          if (renderedSkills.length > 3) {
            return (
              <>
                {isExpanded ? renderedSkills : renderedSkills.slice(0, 3)}
                {!isExpanded && <p className='more-roles-tag' onClick={() => setExpanded(prev => !prev)}>+{renderedSkills.length - 3}</p>}
              </>
            )
          }

          return renderedSkills;

        }
        return (
            <div className='role-container' key={i}>
                <p className='role-title'>{role.title}</p>
                <div className='skills-wrapper'>
                  <RoleSkillElements/>
                </div>
                <Link className="proj-apply-link" 
                      to={`/apply/${project.title}/${role.title}`} 
                      state={{email: project.owner_email}}
                      onClick={handleApplyButton}>
                  <button className={role.isFilled ? 'proj-apply-button-disabled' : 'proj-apply-button'}>Apply</button>
                </Link>

            </div>
        );
    });

    const projectInterests = project.interests.map(interest => {
      return <p className='proj-item-interest'>{interest}</p>
    })
    
    return (
        

            <div className={"project-list-item-container"}>
                <Link to={`/projects/${project._id}`}>
                <div className='project-list-item-top-row'>
                    <div className="project-list-item-header">
                        <h3>{project.title}</h3>
                    </div>
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

                </div>
                <div className="project-list-item-interests">
                    <p>Project Interests:</p>
                    {projectInterests}  
                </div>
                </Link>
                <div className="project-list-item-role-container">
                    {roleElements}
                </div>
            </div>
            

    )
}

export default ProjectListItem;
