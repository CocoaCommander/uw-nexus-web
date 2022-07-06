import './ProfileModal.css';
import { Link } from 'react-router-dom';
import userPic from '../../assets/userpic.png';
import Modal from 'react-bootstrap/modal';

const ProfileModal = (props) => {
    const { userProfile, menuRef } = props;
    return (
        <Modal.Dialog className="entire-modal" ref={menuRef}>
            <Modal.Header>
                <img className="user-pic" src={userPic} />
            </Modal.Header>

            <Modal.Body className="user-info">
                <p className="user-name">{userProfile.first_name + ' ' + userProfile.last_name}</p>
                <p className="user-email">{'jlim@uw.edu'}</p>
            </Modal.Body>

            <Modal.Footer className="options-info">
                <Link className="manage-profile-button" to="/profile">Manage your profile</Link>
                <p className="modal-logout-button">Log out</p>
            </Modal.Footer>
        </Modal.Dialog >
    );
};

export default ProfileModal;