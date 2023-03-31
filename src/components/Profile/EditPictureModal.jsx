import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import userPic from '../../assets/userpic.png';

const EditPictureModal = (props) => {
    const { newUserImage, showPicModal, picModalCallback, userImageCallback, deleteImageCallback } = props;
    const [errMessage, setErrMessage] = useState("");
    const picRef = useRef();

    const handleReader = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
            userImageCallback(file);
        } else {  // invalid file type
            setErrMessage("Invalid image format. Supported types: jpg, jpeg, png");
        }
    }

    return (
        <Modal className="pic-modal" show={showPicModal}>
            <Modal.Header className='pic-modal-header'>
                <img className='template-img' src={newUserImage} />
                <FontAwesomeIcon icon={faX} size='2xl' className='pic-modal-x' onClick={() => picModalCallback(false)}>Click to close</FontAwesomeIcon>
            </Modal.Header>

            <Modal.Body className="pic-modal-contents">
                <input className="hidden-input" type="file" accept="image/*" onChange={handleReader} ref={picRef} />
                <p className='loading-button' onClick={() => picRef.current.click()}>Choose from library</p>
                <p className='loading-button' onClick={deleteImageCallback}>Remove photo</p>
            </Modal.Body>

            <p className='error-msg'>{errMessage}</p>
        </Modal>
    );
}

export default EditPictureModal;