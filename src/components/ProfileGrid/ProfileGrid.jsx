import './ProfileGrid.css';
// import fontawesome for resume

const ProfileGrid = (props) => {
    const { userInfo } = props;

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
            <div className="user-summary">
                <h1 className="item-header">{fullName}</h1>
                <div className="summary-grid">
                    {summaryGridArray}
                </div>
            </div>
            <div className="user-bio">
                <h1 className="item-header">Bio</h1>
                <p className="item-body">{bio}</p>
            </div>
            <div className="user-resume">
                <h1 className="item-header">Resume</h1>
                <p className="item-body">{resume}</p>
            </div>
            <div className="user-project-categories">
                <h1 className="item-header">Projects</h1>
            </div>
            <div className="user-project-interests">
                <h1 className="item-header">Project Interests</h1>
                <div className="summary-grid">
                    {projectInterestsArray}
                </div>
            </div>
            <div className="user-skills">
                <h1 className="item-header">Technical Skills</h1>
                <div className="summary-grid">
                    {technicalSkillsArray}
                </div>
            </div>
            <div className="logout-button">
                <p className="logout-button-text">Log out</p>
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