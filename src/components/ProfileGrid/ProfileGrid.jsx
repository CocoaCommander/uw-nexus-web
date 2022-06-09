import './ProfileGrid.css';

const ProfileGrid = (props) => {
    const { userInfo } = props;

    // First container
    const fullName = userInfo.first_name + ' ' + userInfo.last_name;
    const email = 'jlim@uw.edu'; // this is static static for now
    const connections = 'Network: 8 connections' // static static again
    const campus = userInfo.education.campus;
    const classStanding = userInfo.education.year;
    const major = userInfo.education.major;

    // Second container
    const bio = userInfo.bio;

    // Third container
    const resume = userInfo.resume_file_id;

    // Fifth container (second one on second column)
    const projectInterests = userInfo.interests;

    // Sixth container (last one on first column)
    const technicalSkills = userInfo.skills;

    return (
        <div className="profile-grid-container">
            <div className="user-summary">
                <h1 className="item-header">{fullName}</h1>
            </div>
            <div className="user-bio">
                Bio
            </div>
            <div className="user-resume">
               Resume
            </div>
            <div className="user-project-categories">
               Project Categories
            </div>
            <div className="user-project-interests">
                Project Interests
            </div>
            <div className="user-skills">
                Technical Skills
            </div>
            <div className="logout-button">
                Log out
            </div>
        </div>
    );
}

export default ProfileGrid;