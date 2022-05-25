import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/userState/userStateActions";

const LoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const SIGN_OUT = `${process.env.REACT_APP_API_URL}/api/auth/signOut`;
    const handleClick = async () => {
        if (isLoggedIn) {
            await fetch(SIGN_OUT);
            dispatch(setLoggedIn(false));
        } else {
            navigate('/login')
        }
    }

    return (
        <button onClick={handleClick} className={"login-button-header"}>
            {isLoggedIn ? `Log out` : `Log in`}
        </button>
    )
}

const Header = ({
    isMobile
}) => {
    
    if (isMobile) {
        return (
            <>
                <Menu width={190}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/projects"}>Discover Projects</Link>
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
                    <Link to={"/"}>Home</Link>
                    <Link to={"/projects"}>Discover Projects</Link>
                    <LoginButton/>
                </div>
            </div>
        )
    }
    

}

export default Header;