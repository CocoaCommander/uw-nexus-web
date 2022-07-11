import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/userState/userStateActions";
import Cookies from "universal-cookie";

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
    const location = useLocation().pathname;
    
    // fix this in future, bad style
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const projectStep = useSelector((state) => state.createProj.step);
    const profileStep = useSelector((state) => state.signUp.step);
    if (isMobile) {
        if (location === '/createProfile' || location === '/createProject') {
            let maxSteps = 4;
            if (location === '/createProject') {
                maxSteps = 6;
            }
            const step = (location === '/createProfile' ? profileStep : projectStep);
            return (
                <>
                    <div className="iterations-flex">
                        <Link to={"/"}>
                            <div className="iterations-logo-header">
                                <img src={logo} alt="Nexus Logo" className=""/>
                            </div>
                        </Link>

                        <p className={step <= maxSteps ? 'step-counter' : 'step-counter-hidden'}>Step {location === '/createProfile' ? profileStep : projectStep} of {maxSteps}</p>
                    </div>
                </>
            )
        }

        return (
            <>
                <Menu width={190}>
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton/>
                </Menu>
                <div className="flex">
                    <Link to={"/"}>
                        <div className="logo-header">
                            <img src={logo} alt="Nexus Logo" className=""/>
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
                        <img src={logo} alt="Nexus Logo" className="nexus-logo-header"/>
                    </div>
                </Link>
                <div className="header-desktop-items">
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton/>
                </div>
            </div>
        )
    }
    

}

export default Header;