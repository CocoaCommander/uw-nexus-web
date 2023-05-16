import './EditProfile.css';
import userPic from '../../assets/userpic.png';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditPictureModal from './EditPictureModal';
import EditElementsModal from './EditElementsModal';
import Modal from 'react-bootstrap/Modal';

const EditProfile = (props) => {
    const { userInfo, editCallback, editResumeCallback } = props;
    const [showPicModal, setShowPicModal] = useState(false);
    const [showElementsModal, setShowElementsModal] = useState(false);
    const [isInterestModal, setInterestModal] = useState(false);
    const [newUserImage, setNewUserImage] = useState(userInfo.user_image);
    const [newImageFile, setNewImageFile] = useState();
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
    const [newResume, setNewResume] = useState();
    const [resumeErrMsg, setResumeErrMsg] = useState('');

    // General Information
    const userImage = userInfo.user_image;
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

    document.body.style.cssText = 'overflow: auto !important';
    // might break some scrolling behavior, at the moment i experience none
    // needed for the Modal popup

    // Biography
    const biography = <Biography userBio={newBio} callback={setNewBio} />;

    // Resume
    const resume = props.resume;
    const resumeComponent = <ResumeAddIcon handleResumeEdit={(e) => handleResumeEdit(e)} />

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

    const handleEdit = async (event) => {
        event.preventDefault();

        // General Information
        userInfo.user_image = newUserImage.length === 0 ? userInfo.userImage : newUserImage;
        userInfo.first_name = newFirstName.length === 0 ? userInfo.first_name : newFirstName;
        userInfo.last_name = newLastName.length === 0 ? userInfo.last_name : newLastName;
        userInfo.education.year = newClassStanding.length === 0 ? userInfo.education.year : newClassStanding;
        userInfo.education.major = newMajor.length === 0 ? userInfo.education.major : newMajor;
        userInfo.education.campus = newCampus.length === 0 ? userInfo.education.campus : newCampus;
        userInfo.education.interests = newInterests.length === 0 ? userInfo.education.interests : newInterests;
        userInfo.education.skills = newSkills.length === 0 ? userInfo.education.skills : newSkills;

        // Biography
        userInfo.education.bio = newBio === undefined || newBio.trim().length === 0 ? 'This user has no bio.' : newBio;



        const new_resume_file_id = await updateProfile(userInfo);

        userInfo.education.resume_file_id = new_resume_file_id;
        await uploadNewImage(newImageFile);

        if (newResume) {
            const reader = new FileReader();

            reader.readAsDataURL(newResume);
            reader.onload = () => {
                editResumeCallback(reader.result.substring(28));
            };
            reader.onerror = (error) => {
            };

        }


        editCallback(false);
    }

    const updateProfile = async (userInfo) => {
        const url = `/api/profile/update/${userInfo.profile_id}`;

        let profileBody = new FormData();

        profileBody.append("first_name", userInfo.first_name);
        profileBody.append("last_name", userInfo.last_name);
        profileBody.append("education", JSON.stringify({
            "campus": userInfo.education.campus,
            "year": userInfo.education.year,
            "major": userInfo.education.major,
        }));
        profileBody.append("interests", JSON.stringify(userInfo.education.interests));
        profileBody.append("skills", JSON.stringify(userInfo.education.skills));
        profileBody.append("bio", userInfo.education.bio);
        if (newResume) {
            profileBody.append("file", newResume);
        }

        const options = {
            method: 'POST',
            body: profileBody,
            credentials: 'include'
        }

        const response = await fetch(url, options);
        const newProfile = await response.json();
        return newProfile.profile.resume_file_id;


        //profileBody.append("file", resume);

        //const resp = await fetch(url, options)
    }

    const updateUserImage = (file) => {
        setNewImageFile(file);
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setNewUserImage(reader.result)
        };
        reader.onerror = (error) => {
        };
    }

    const uploadNewImage = async (newImage) => {
        const user_id = window.localStorage.getItem("nxs-id");
        const url = `/api/profile/photo/${user_id}`;

        const imageBody = new FormData();
        imageBody.append('file', newImage);

        const options = {
            method: 'POST',
            body: imageBody,
            credentials: 'include',

        }

        const response = await fetch(url, options);
    }

    const deleteUserImage = async () => {
        const user_id = window.localStorage.getItem("nxs-id");
        const url = `/api/profile/photo/${user_id}`;

        const options = {
            method: 'DELETE',
            credentials: 'include',
        }

        const response = await fetch(url, options);
        setNewUserImage(userPic);
    }

    const convertBase64ToPDF = (resume) => {
        if (resume === 'No resume found') {
            alert('You do not have a resume uploaded.');
        } else {
            if (newResume) {
                window.open(URL.createObjectURL(newResume))
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
    }

    const saveElementsCallback = (isInterestsModal, newElements) => {
        if (isInterestsModal) {
            userInfo.education.interests = newElements;
        } else {
            userInfo.education.skills = newElements;
        }

        isInterestsModal ? setNewInterests(newElements) : setNewSkills(newElements);

    }

    const handleResumeEdit = (e) => {
        const file = e.target.files[0];
        if (file.type == "application/pdf") {
            if (file.size > 5000000) {
                alert('File is too big.');
                // setResumeErrMsg("File is too big.");
            } else {
                //   setResumeErrMsg("");
                setNewResume(file);
            }
        } else {
            alert('Incorrect file format. Please upload a pdf file.');
            // setResumeErrMsg("Incorrect file format. Please upload a pdf file");
        }
    }

    const renderResumeText = () => {
        if (resume == 'No resume found' && newResume == null) {
            return (<p className='no-resume-text'>{resume}</p>);
        } else {
            return (<p className="resume-link" onClick={() => convertBase64ToPDF(newResume ? newResume : resume)}>View Resume</p>);
        }
    }

    return (
        <div className="edit-profile-container">
            <EditPictureModal newUserImage={newUserImage} showPicModal={showPicModal} picModalCallback={setShowPicModal} userImageCallback={updateUserImage} deleteImageCallback={deleteUserImage} />
            <EditElementsModal showElementsModal={showElementsModal} elementsModalCallback={setShowElementsModal} projectInterests={projectInterests} technicalSkills={technicalSkills} isInterestModal={isInterestModal} saveElementsCallback={saveElementsCallback} />
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
                    {renderResumeText()}
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

const ResumeAddIcon = (props) => {
    const buttonRef = useRef(null);
    const handleResumeEdit = props.handleResumeEdit;
    return (
        <>
            <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => buttonRef.current.click()} />
            <input ref={buttonRef} className={"file-button"} type={"file"} onChange={(e) => handleResumeEdit(e)}></input>
        </>);

}

// No functionality for now
// Temp functions
const CardAddIcon = ({ setIsAddIconClicked }) => {
    return <FontAwesomeIcon className="add-icon" icon={faPlus} size="2xl" onClick={() => { alert('implement later!') }} />
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