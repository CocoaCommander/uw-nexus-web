import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const EditElementsModal = (props) => {
    const { showElementsModal, elementsModalCallback, projectInterests, technicalSkills, isInterestModal, saveElementsCallback } = props;
    const picRef = useRef();

    useEffect(() => {
        const skillsUrl = "/api/constants/skills";
        const interestsUrl = "/api/constants/interests";

        fetch(skillsUrl)
        .then(response => response.json())
        .then(data => setSkillsList(data))
        .catch((error) => {
        });
        
        fetch(interestsUrl)
        .then(response => response.json())
        .then(data => setInterestsList(data))
        .catch((error) => {
        });

    }, [])

    const [allSkills, setSkillsList] = useState([]);
    const [allInterests, setInterestsList] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState(technicalSkills);
    const [selectedInterests, setSelectedInterests] = useState(projectInterests);

    const renderElements = (props) => {  
        let listOfElements;
        let userElements;
        if (props.isInterestModal == true) {
            listOfElements = allInterests;
            userElements = selectedInterests;
        } else {
            listOfElements = allSkills;
            userElements = selectedSkills;
        }
        
        return listOfElements.map( (element) => {
            let elementButtonClasses = 'element-button';
            let checkIconClasses = 'circle-check';
    
            if (userElements.includes(element)) {
                elementButtonClasses = elementButtonClasses.concat(' clicked-element');
            } else {
                checkIconClasses = checkIconClasses.concat(' hidden');
            }
    
            return <div onClick={clickElementButton} className={elementButtonClasses}>
                        <div className='check-circle-container'>
                            <FontAwesomeIcon className={checkIconClasses} size="2xl" icon={faCircleCheck} />
                        </div>
                        {element}
                    </div>
        })
    }

    function clickElementButton(e) {
        const clickedElement = e.target.innerText;
        if (isInterestModal) {
            if (selectedInterests.includes(clickedElement)) {
                setSelectedInterests(prevInterests => prevInterests.filter(i => i != clickedElement));
                e.target.classList.toggle('clicked-element');
                e.target.querySelector('.circle-check').classList.toggle('hidden');
                
            } else if (selectedInterests.length < 5) {
                setSelectedInterests(prevInterests => [...prevInterests, clickedElement]);
                e.target.classList.toggle('clicked-element');
                e.target.querySelector('.circle-check').classList.toggle('hidden');
            }
        } else {
            if (selectedSkills.includes(clickedElement)) {
                setSelectedSkills(prevSkills => prevSkills.filter(s => s != clickedElement));
                e.target.classList.toggle('clicked-element');
                e.target.querySelector('.circle-check').classList.toggle('hidden');
            } else if (selectedSkills.length < 5) {
                setSelectedSkills(prevSkills => [...prevSkills, clickedElement])
                e.target.classList.toggle('clicked-element');
                e.target.querySelector('.circle-check').classList.toggle('hidden');
            }
        }
    }

    const handleSave = () => {
        elementsModalCallback(false);
        let elementsToBeSaved = [];
        if (isInterestModal) {
            elementsToBeSaved = selectedInterests;
        } else {
            elementsToBeSaved = selectedSkills;
        }
        saveElementsCallback(isInterestModal, elementsToBeSaved);

    }

    return (
        <Modal className="elements-modal" show={showElementsModal}>
            <Modal.Header>
                <div className='exit-elements'>
                    <FontAwesomeIcon size="2xl" icon={faX} onClick={ () => {elementsModalCallback(false)} } />
                </div>
            </Modal.Header>

            <Modal.Body className="pic-modal-contents">
                <p className='elements-modal-header'>{isInterestModal ? "Project Interests" : "Technical Skills"}</p>
                <div className='elements-container'>
                    {renderElements({projectInterests, technicalSkills, isInterestModal})}
                </div>
                <div className='save-elements' onClick={handleSave}>Save</div>
            </Modal.Body>
        </Modal>
    );
}

export default EditElementsModal;