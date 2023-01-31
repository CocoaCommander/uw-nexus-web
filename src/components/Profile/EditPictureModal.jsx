import './EditProfile.css';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import userPic from '../../assets/userpic.png';

const EditPictureModal = (props) => {
    const { newUserImage, showPicModal, picModalCallback, userImageCallback } = props;
    const picRef = useRef();

    console.log('hi')

    return (
        <Modal className="pic-modal" show={showPicModal}>
            <Modal.Header>
                <img className='template-img' src={newUserImage} />
                <p onClick={() => picModalCallback(false)}>Click to close</p>
            </Modal.Header>

            <Modal.Body className="pic-modal-contents">
                <input className="hidden-input" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e) => { console.log(e.target.files[0].name); userImageCallback(e.target.files[0].name) }} ref={picRef} />
                <p className='pic-modal-button' onClick={() => console.log(picRef.current.click())}>Choose from library</p>
                <p className='pic-modal-button' onClick={() => userImageCallback(userPic)}>Remove current photo</p>
            </Modal.Body>
        </Modal>
    );
}

export default EditPictureModal;