import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/userState/userStateActions";
import Cookies from "universal-cookie";
import Modal from 'react-bootstrap/modal';

const LoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const SIGN_OUT = `${process.env.REACT_APP_API_URL}/api/auth/signOut`;
    const handleClick = async () => {
        if (isLoggedIn) {
            await fetch(SIGN_OUT);
            const prevCookie = new Cookies()
            prevCookie.remove("accessToken");
            window.localStorage.removeItem("nxs-id");
            // prevCookie.remove("nxs_id");
            dispatch(setLoggedIn(false));
            navigate('/');
        } else {
            navigate('/login')
        }
    }

    return (
        <button onClick={handleClick} className={"login-button-header"}>
            {isLoggedIn ? `Log out` : `Join the NEXUS Network`}
        </button>
    )
}

const Header = ({
    isMobile
}) => {

    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    if (isMobile) {
        return (
            <>
                <Menu width={190}>
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton />
                </Menu>
                <div className="flex">
                    <Link to={"/"}>
                        <div className="logo-header">
                            <img src={logo} alt="Nexus Logo" className="" />
                        </div>
                    </Link>
                </div>
            </>
        );
    } else {
        return (
            <div className="header-desktop">
                <Link to={"/"}>
                    <div className="logo-header">
                        <img src={logo} alt="Nexus Logo" className="nexus-logo-header" />
                    </div>
                </Link>
                <div className="header-desktop-items">
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton />
                </div>
            </div>
        )
    }


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
}

export default Header;