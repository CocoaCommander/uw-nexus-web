import './ProfileModal.css';
import userPic from '../../assets/userpic.png';
import Modal from 'react-bootstrap/modal';

const ProfileModal = (props) => {
    const { userProfile, menuRef } = props;
    return (
        <Modal.Dialog ref={menuRef}>
            <Modal.Header>
                <img src={userPic} />
            </Modal.Header>

            <Modal.Body>
                <p>{userProfile.first_name + ' ' + userProfile.last_name}</p>
                <p>{'jlim@uw.edu'}</p>
            </Modal.Body>

            <Modal.Footer>
                <p>Manage your profile</p>
                <p>Log out</p>
            </Modal.Footer>
        </Modal.Dialog >
    );
};

export default ProfileModal;