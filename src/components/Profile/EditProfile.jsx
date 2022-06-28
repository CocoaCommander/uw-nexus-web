import './EditProfile.css';
import userPic from '../../assets/userpic.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

const EditProfile = (props) => {
    const { userInfo, editCallback } = props;
    const [newFirstName, setNewFirstName] = useState(userInfo.first_name);
    const [newLastName, setNewLastName] = useState(userInfo.last_name);
    const [newClassStanding, setNewClassStanding] = useState(userInfo.education.year);
    const [newMajor, setNewMajor] = useState(userInfo.education.major);
    const [newCampus, setNewCampus] = useState(userInfo.education.campus);
    const [newBio, setNewBio] = useState(userInfo.education.bio);
    const [newSkills, setNewSkills] = useState(userInfo.education.skills);
    const [isSkillAddIconClicked, setSkillAddIconClicked] = useState(false);
    const [newInterests, setNewInterests] = useState(userInfo.education.interests);
    const [isInterestAddIconClicked, setInterestAddIconClicked] = useState(false);

    // General Information
    const firstName = userInfo.first_name;
    const lastName = userInfo.last_name;
    const classStanding = userInfo.education.year;
    const major = userInfo.education.major;
    const campus = userInfo.education.campus;
    const generalInfo = [firstName, lastName, classStanding, major, campus];
    const generalInfoArray = generalInfo.map((item, index) => {
        let header = '';
        let inputName = '';
        let callback;

        if (index === 0) {
            header = 'First Name';
            inputName = 'fname';
            callback = setNewFirstName;
        } else if (index === 1) {
            header = 'Last Name';
            inputName = 'lname';
            callback = setNewLastName;
        } else if (index === 2) {
            header = 'Year';
            inputName = 'year';
            callback = setNewClassStanding;
        } else if (index === 3) {
            header = 'Major/Intended Major';
            inputName = 'major';
            callback = setNewMajor;
        } else {
            header = 'University of Washington Campus';
            inputName = 'campus';
            callback = setNewCampus;
        }
        return <GeneralInfoItem userInfoItem={item} header={header} inputName={inputName} callback={callback} key={index} />
    })

    // Biography
    const biography = <Biography userBio={newBio} callback={setNewBio} />;

    // Resume
    const resume = userInfo.education.resume_file_id;
    const resumeComponent = <ResumeAddIcon />;

    // Technical Skills
    const technicalSkills = userInfo.education.skills;
    const technicalSkillsArray = technicalSkills.map((item, index) => {
        return <ProjectItem item={item} isSkill={true} key={index} />;
    });
    const skillsComponent = <CardAddIcon setIsAddIconClicked={setSkillAddIconClicked} />;
    // const addSkillsModal = <AddItemModal isAddIconClicked={isSkillAddIconClicked} />;

    // Project Interests
    const projectInterests = userInfo.education.interests;
    const projectInterestsArray = projectInterests.map((item, index) => {
        return <ProjectItem item={item} isSkill={false} key={index} />;
    });
    const interestsComponent = <CardAddIcon setIsAddIconClicked={setInterestAddIconClicked} />;
    // const addInterestsModal = <AddItemModal isAddIconClicked={isInterestAddIconClicked} />;
    
    const handleEdit = (event) => {
        event.preventDefault();

        // General Information
        userInfo.first_name = newFirstName.length === 0 ? userInfo.first_name : newFirstName;
        userInfo.last_name = newLastName.length === 0 ? userInfo.last_name : newLastName;
        userInfo.education.year = newClassStanding.length === 0 ? userInfo.education.year : newClassStanding;
        userInfo.education.major = newMajor.length === 0 ? userInfo.education.major : newMajor;
        userInfo.education.campus = newCampus.length === 0 ? userInfo.education.campus : newCampus;

        // Biography
        userInfo.education.bio = newBio.length === 0 ? "This user has not set a bio." : newBio;
        editCallback(false);
    }

    return (
        <div className="edit-profile-container">
            {/* {addSkillsModal} */}
            {/* {addInterestsModal} */}
            <div className="finalize-edits-container">
                <h3 className="finalize-edits-button" onClick={() => editCallback(false)}>Cancel</h3>
                <h3 className="finalize-edits-button" onClick={handleEdit}>Done</h3>
            </div>
            <img className="template-img" src={userPic} />
            <div className="information-container">
                <h2>General Information</h2>
                <div>
                    {generalInfoArray}
                </div>
                <h2>Bio</h2>
                {biography}
                <div className="header-container">
                    <h2>Resume</h2>
                    {resumeComponent}
                </div>
                <div className="resume-body">
                    <FontAwesomeIcon className="resume-icon" icon={faFile} size="2xl" />
                    <p className="item-body">{resume}</p>
                </div>
                <div className="header-container">
                    <h2>Technical Skills</h2>
                    {skillsComponent}
                </div>
                <div>
                    {technicalSkillsArray}
                </div>
                <div className="header-container">
                    <h2>Project Interests</h2>
                    {interestsComponent}
                </div>
                <div>
                    {projectInterestsArray}
                </div>
            </div>
        </div>
    );
}

const GeneralInfoItem = (props) => {
    const { userInfoItem, header, inputName, callback } = props;

    return (
        <form>
            <label htmlFor={inputName}>{header}</label>
            <input type="text" name={inputName} placeholder={userInfoItem} onChange={(event) => callback(event.target.value)} />
        </form>
    )
}

const Biography = (props) => {
    const { userBio, callback } = props;

    return (
        <form>
            <label className="hide-label" htmlFor="bio">User Biography</label>
            <textarea value={userBio} onChange={(event) => callback(event.target.value)} />
        </form>
    )
}

const ResumeAddIcon = () => {
    return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { alert('idk how to do this'); }} />
}

// No functionality for now
// Temp functions
const CardAddIcon = () => {
    return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { alert('implement later!'); }} />
}

// const CardAddIcon = (props) => {
//     const { setIsAddIconClicked } = props;
//     return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { setIsAddIconClicked(true); }} />;
// }

// const AddItemModal = (props) => {
//     const { isAddIconClicked } = props;

//     return (
//         <Modal show={isAddIconClicked}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//             <Modal.Footer>

//             </Modal.Footer>
//         </Modal>
//     )
// }

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

export default EditProfile;