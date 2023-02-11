import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const allSkills = ["Software Development", "Automobile Creation", "Design-Hardware", "Professional Communication",
                   "Healthcare", "Environmentalism", "Aerospace", "Data Science", "HTML Coding", "Hackathon", "Manufacturing",
                   "Project Outreach", "Mechanical Design", "Mechatronics", "Biomedical Reseach", "Business"];

const renderInterests = () => {
    return allSkills.map( (skill) => {return <div onClick={clickInterestButton} className='interest-button'>{skill}</div>})
}

function clickInterestButton(e) {
    e.target.classList.toggle('clicked-interest');
}

const EditInterestsModal = (props) => {
    const { showInterestsModal, interestsModalCallback } = props;
    const picRef = useRef();

    return (
        <Modal className="skills-modal" show={showInterestsModal}>
            <Modal.Header>
                <div className='exit-interests'>
                    <FontAwesomeIcon size="2xl" icon={faX} onClick={ () => {interestsModalCallback(false)} } />
                </div>
            </Modal.Header>

            <Modal.Body className="pic-modal-contents">
                <p className='interests-modal-header'>Project Interests</p>
                <div className='interests-container'>
                    {renderInterests()}
                </div>
                <div className='save-interests' onClick={ () => {interestsModalCallback(false)} }>Save</div>
            </Modal.Body>
        </Modal>
    );
}

export default EditInterestsModal;