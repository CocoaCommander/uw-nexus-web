import './ProfileModal.css';
import { Link, useNavigate } from 'react-router-dom';
import userPic from '../../assets/userpic.png';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from "../../redux/userState/userStateActions";
import Cookies from "universal-cookie";

const ProfileModal = (props) => {
    const { userProfile, menuRef } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const SIGN_OUT = `/api/auth/signOut`;

    const handleSignOut = async() => {
      if (isLoggedIn) {
        const options = {
          method: 'DELETE'
        };
        await fetch(SIGN_OUT, options);
        const prevCookie = new Cookies()
        prevCookie.remove("fr-accessToken");
        window.localStorage.removeItem("nxs-id");
        dispatch(setLoggedIn(false));
        navigate('/');
      }
    }

    return (
        <Modal.Dialog className="entire-modal" ref={menuRef}>
            <Modal.Header>
                <img className="user-pic" src={userPic} />
            </Modal.Header>

            <Modal.Body className="user-info">
                <p className="user-name">{userProfile.first_name + ' ' + userProfile.last_name}</p>
                <p className="user-email">{userProfile.email}</p>
            </Modal.Body>

            <Modal.Footer className="options-info">
                <Link className="manage-profile-button" to="/profile">Manage your profile</Link>
                <p className="modal-logout-button" onClick={handleSignOut}>Log out</p>
            </Modal.Footer>
        </Modal.Dialog >
    );
};

export default ProfileModal;