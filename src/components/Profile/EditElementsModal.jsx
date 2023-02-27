import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const allInterests = ["Software Engineering", "Automobile Creation", "Design-Hardware", "Professional Communication",
                   "Healthcare", "Environmentalism", "Aerospace", "Data Science", "HTML Coding", "Hackathon", "Manufacturing",
                   "Project Outreach", "Mechanical Design", "Mechatronics", "Biomedical Reseach", "Business"];

const allSkills = ["Computer Aided Design (CAD)", "Printed Circuit Board (PCB) Design", "Finite Element Analysis (FEA)",
                   "Front-End Software", "Computational Fluid Dynamics (CFD)", "Back-End Software", "MATLAB",
                   "Soldering", "Python", "Material Selection & Ordering", "Manufacturing - Machine Shop", "Professional Communication",
                   "Manufacturing - Composite Shop", "Graphic Design", "Manufacturing - 3D Printing", "Web Design",
                   "Mechanical Design", "Design Prototyping", "Data Analysis", "Usability Testing", "Java",
                   "Bill of Material Selection", "JavaScript", "Management - Gantt Chart", "C++", "Management - Kanban",
                   "Arduino", "Management - SCRUM", "Schematic Software", "HTML/CSS"];

const renderElements = (props) => {  
    let listOfElements;
    let userElements;
    if (props.isInterestModal == true) {
        listOfElements = allInterests;
        userElements = props.projectInterests;
    } else {
        listOfElements = allSkills;
        userElements = props.technicalSkills
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
    e.target.classList.toggle('clicked-element');
    e.target.querySelector('.circle-check').classList.toggle('hidden');
}

const EditElementsModal = (props) => {
    const { showElementsModal, elementsModalCallback, projectInterests, technicalSkills, isInterestModal } = props;
    const picRef = useRef();



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
                <div className='save-elements' onClick={ () => {elementsModalCallback(false)} }>Save</div>
            </Modal.Body>
        </Modal>
    );
}

export default EditElementsModal;