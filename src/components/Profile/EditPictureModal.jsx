import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import userPic from '../../assets/userpic.png';

const EditPictureModal = (props) => {
    const { newUserImage, showPicModal, picModalCallback, userImageCallback } = props;
    const picRef = useRef();

    const handleReader = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log('Successfully uploaded! Result: ', reader.result);
            userImageCallback(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
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
                <p className='loading-button' onClick={() => userImageCallback(userPic)}>Remove photo</p>
            </Modal.Body>
        </Modal>
    );
}

export default EditPictureModal;