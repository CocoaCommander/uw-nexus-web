import './ProfileModal.css';
import Modal from 'react-bootstrap/modal';
const ProfileModal = (props) => {
    const { userProfile, menuRef } = props;
    return <p ref={menuRef}>it work!!!</p>;
};
    /*
    <Modal.Dialog show={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal.Dialog>
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton />
    */

export default ProfileModal;