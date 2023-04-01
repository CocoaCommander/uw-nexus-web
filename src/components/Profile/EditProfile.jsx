import './EditProfile.css';
import userPic from '../../assets/userpic.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditPictureModal from './EditPictureModal';
import EditElementsModal from './EditElementsModal';
import Modal from 'react-bootstrap/Modal';

const EditProfile = (props) => {
    const { userInfo, editCallback } = props;
    const [showPicModal, setShowPicModal] = useState(false);
    const [showElementsModal, setShowElementsModal] = useState(false);
    const [isInterestModal, setInterestModal] = useState(false);
    const [newUserImage, setNewUserImage] = useState(userInfo.user_image);
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

    console.log(userInfo.user_image);

    // General Information
    const userImage = userInfo.user_image;
    const firstName = userInfo.first_name;
    const lastName = userInfo.last_name;
    const classStanding = userInfo.education.year;
    const major = userInfo.education.major;
    const campus = userInfo.education.campus;
    const oldBio = userInfo.education.bio; // needed for empty biography edge case
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
    const resume = props.resume;
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
        userInfo.userImage = newUserImage.length === 0 ? userInfo.userImage : newUserImage;
        userInfo.first_name = newFirstName.length === 0 ? userInfo.first_name : newFirstName;
        userInfo.last_name = newLastName.length === 0 ? userInfo.last_name : newLastName;
        userInfo.education.year = newClassStanding.length === 0 ? userInfo.education.year : newClassStanding;
        userInfo.education.major = newMajor.length === 0 ? userInfo.education.major : newMajor;
        userInfo.education.campus = newCampus.length === 0 ? userInfo.education.campus : newCampus;

        // Biography
        userInfo.education.bio = newBio === undefined || newBio.length === 0 ? oldBio : newBio;

        updateProfile(userInfo);

        editCallback(false);
    }

    const updateProfile = async (userInfo) => {
        console.log("RUNNING UPDATE PROFILE ENDPOINT!!");
        console.log(userInfo.profile_id);
        const url = `/api/profile/update/${userInfo.profile_id}`;

        let profileBody = new FormData();

        console.log(userInfo.first_name);

        profileBody.append("first_name", userInfo.first_name);
        profileBody.append("last_name", userInfo.last_name);
        profileBody.append("education", JSON.stringify({
            "campus": userInfo.education.campus,
            "year": userInfo.education.year,
            "major": userInfo.education.major
        }));
        // profileBody.append("interests", JSON.stringify(newInterests));
        // profileBody.append("skills", JSON.stringify(newSkills));
        profileBody.append("bio", userInfo.education.bio);

        const options = {
            method: 'POST',
            body: profileBody,
            credentials: 'include'
        }

        const response = await fetch(url, options);
        console.log(response);


        //profileBody.append("file", resume);

        const resp = await fetch(url, options)
    }

    const convertBase64ToPDF = () => {
        if (resume === 'No resume found') {
            alert('You do not have a resume.');
        } else {
            var byteCharacters = window.atob(resume);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], { type: 'application/pdf;base64' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }
    }

    return (
        <div className="edit-profile-container">
            <EditPictureModal newUserImage={newUserImage} showPicModal={showPicModal} picModalCallback={setShowPicModal} userImageCallback={setNewUserImage} />
            <EditElementsModal showElementsModal={showElementsModal} elementsModalCallback={setShowElementsModal} projectInterests={projectInterests} technicalSkills={technicalSkills} isInterestModal={isInterestModal} />
            <div className="finalize-edits-container">
                <h3 className="finalize-edits-button" onClick={() => editCallback(false)}>Cancel</h3>
                <h3 className="finalize-edits-button" onClick={handleEdit}>Done</h3>
            </div>
            <div className="img-container">
                <img className="template-img" src={newUserImage} />
                <FontAwesomeIcon className="img-add-icon" icon={faPlus} size="2xl" onClick={() => setShowPicModal(true)} />
            </div>
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
                <div className="edit-resume-body">
                    <FontAwesomeIcon className="resume-icon" icon={faFile} size="2xl" />
                    {resume ? <p className="resume-link" onClick={convertBase64ToPDF}>View Resume</p> : <p className='no-resume-text'>No resume found.</p>}
                </div>
                <div className="header-container">
                    <h2>Technical Skills</h2>
                    <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={async () => {
                        setShowElementsModal(true)
                        setInterestModal(false)
                    }} />
                </div>
                <div className="skills-projects-container">
                    {technicalSkillsArray}
                </div>
                <div className="header-container">
                    <h2>Project Interests</h2>
                    <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={async () => {
                        setShowElementsModal(true)
                        setInterestModal(true)
                    }} />
                </div>
                <div className="skills-projects-container">
                    {projectInterestsArray}
                </div>
            </div>
        </div>
    );
}

const GeneralInfoItem = (props) => {
    const { userInfoItem, header, inputName, callback } = props;

    return (
        <form className="form-container">
            <label className="form-label" htmlFor={inputName}>
                <h4 className="form-text">
                    {header}
                </h4>
            </label>
            <input className="form-input" type="text" name={inputName} placeholder={userInfoItem} onChange={(event) => callback(event.target.value)} />
        </form>
    )
}

const Biography = (props) => {
    const { userBio, callback } = props;

    return (
        <form className="form-container">
            <label className="form-label" htmlFor="bio">
                <h4 className="form-text">
                    User Biography
                </h4>
            </label>
            <textarea className="form-textarea" value={userBio} onChange={(event) => callback(event.target.value)} />
        </form>
    )
}

const ResumeAddIcon = () => {
    return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { alert('idk how to do this'); }} />
}

// No functionality for now
// Temp functions
const CardAddIcon = ({ setIsAddIconClicked }) => {
    return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => {alert('implement later!')}} />
}

// const CardAddIcon = (props) => {
//     const { setIsAddIconClicked } = props;
//     return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { setIsAddIconClicked(true); }} />;
// }

// const AddItemModal = (props) => {
//     const { isAddIconClicked } = props;
//     console.log("The add icon prop is currently", {isAddIconClicked});

//     return (
//         <Modal >
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