import './EditProfile.css';
import userPic from '../../assets/userpic.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const EditProfile = (props) => {
    const { userInfo, editCallback } = props;
    const [newFirstName, setNewFirstName] = useState(userInfo.first_name);
    const [newLastName, setNewLastName] = useState(userInfo.last_name);
    const [newClassStanding, setNewClassStanding] = useState(userInfo.education.year);
    const [newMajor, setNewMajor] = useState(userInfo.education.major);
    const [newCampus, setNewCampus] = useState(userInfo.education.campus);
    const [newBio, setNewBio] = useState(userInfo.education.bio);

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
                <h2>Resume</h2>
                <div className="resume-body">
                    <FontAwesomeIcon className="resume-icon" icon={faFile} size="2xl" />
                    <p className="item-body">{resume}</p>
                </div>
                <h2>Technical Skills</h2>
                <h2>Project Interests</h2>
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
            <textarea value={userBio} onChange={(event) => callback(event.target.value)}/>
        </form>
    )
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

export default EditProfile;