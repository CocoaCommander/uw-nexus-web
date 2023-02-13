import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
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
            <Modal.Header>
                <img className='template-img' src={newUserImage} />
                <p onClick={() => picModalCallback(false)}>Click to close</p>
            </Modal.Header>

            <Modal.Body className="pic-modal-contents">
                <input className="hidden-input" type="file" accept="image/*" onChange={handleReader} ref={picRef} />
                <p className='pic-modal-button' onClick={() => picRef.current.click()}>Choose from library</p>
                <p className='pic-modal-button' onClick={() => userImageCallback(userPic)}>Remove current photo</p>
            </Modal.Body>
        </Modal>
    );
}

export default EditPictureModal;