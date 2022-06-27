import './ProfileGrid.css';
import userPic from '../../assets/userpic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFile } from '@fortawesome/free-solid-svg-icons';

const ProfileGrid = (props) => {
    const { userInfo, editCallback } = props;

    // First container
    const fullName = userInfo.first_name + ' ' + userInfo.last_name;
    const email = 'jlim@uw.edu'; // this is static static for now
    const connections = 8; // static static again
    const campus = userInfo.education.campus;
    const classStanding = userInfo.education.year;
    const major = userInfo.education.major;
    const summaryArray = [email, connections, campus, classStanding, major];
    const summaryGridArray = summaryArray.map((item, index) => {
        return <SummaryItem item={item} index={index} key={index} />
    })

    // Second container
    const bio = userInfo.education.bio;

    // Third container
    const resume = userInfo.education.resume_file_id;

    // Fourth container (first one on second column)
    const projectCategories = ['All', 'Current', 'Accepted', 'Pending', 'Declined'];
    const projectCategoriesArray = projectCategories.map((item, index) => {
        return <ProjectCategory item={item} index={index} key={index} />;
    });

    // Fifth container (second one on second column)
    const projectInterests = userInfo.education.interests;
    const projectInterestsArray = projectInterests.map((item, index) => {
        return <ProjectItem item={item} isSkill={false} key={index} />
    });

    // Sixth container (last one on first column)
    const technicalSkills = userInfo.education.skills;
    const technicalSkillsArray = technicalSkills.map((item, index) => {
        return <ProjectItem item={item} isSkill={true} key={index} />
    });

    return (
        <div className="profile-grid-container">
            <div className="grid-column">
                <div className="user-summary">
                    <img src={userPic} />
                    <div>
                        <div className="bio-header">
                            <h1 className="item-header">{fullName}</h1>
                            <FontAwesomeIcon className="edit-profile-icon" icon={faPenToSquare} size="2xl" onClick={() => editCallback(true)}/>
                        </div>
                        <div className="summary-flexbox">
                            {summaryGridArray}
                        </div>
                    </div>
                </div>
                <div className="user-bio">
                    <h1 className="item-header">Bio</h1>
                    <p className="item-body">{bio}</p>
                </div>
                <div className="user-resume">
                    <h1 className="item-header">Resume</h1>
                    <div className="resume-body">
                        <FontAwesomeIcon className="resume-icon" icon={faFile} size="2xl" />
                        <p className="item-body">{resume}</p>
                    </div>
                </div>
                <div className="user-skills">
                    <h1 className="item-header">Technical Skills</h1>
                    <div className="summary-flexbox">
                        {technicalSkillsArray}
                    </div>
                </div>
            </div>
            <div className="grid-column">
                <div className="project-row">
                    <div className="project-categories-container">
                        <h1 className="item-header">Projects</h1>
                        <div className="project-categories">
                            {projectCategoriesArray}
                        </div>
                    </div>
                    <div className="user-project-interests">
                        <h1 className="item-header">Project Interests</h1>
                        <div className="summary-flexbox">
                            {projectInterestsArray}
                        </div>
                    </div>
                </div>
                <div className="logout-button">
                    <p className="logout-button-text">Log out</p>
                </div>
            </div>
        </div>
    );
}

// this is cursed
const SummaryItem = (props) => {
    const { item, index } = props;
    if (index === 0) {
        return <p className="summary-item">{item}</p>;
    } else if (index === 1) {
        return <p className="summary-item">Network: {item} connections</p>;
    } else if (index === 2) {
        return <p className="summary-item">Campus: {item}</p>;
    } else if (index === 3) {
        return <p className="summary-item">Class Standing: {item}</p>;
    } else {
        return <p className="summary-item">Major: {item}</p>;
    }
}

const ProjectCategory = (props) => {
    const { item, index } = props;
    if (index === 0) {
        return <p className="selected-category">{item}</p>;
    } else {
        return (
            <div>
                <hr className="category-divider" />
                <p>{item}</p>
            </div>
        );
    }
}

const ProjectItem = (props) => {
    const { item, isSkill } = props;
    let projectSelector = '';
    if (isSkill) {
        projectSelector = 'skill-item';
    } else {
        projectSelector = 'project-item';
    }
    return <p className={projectSelector}>{item}</p>
}

export default ProfileGrid;