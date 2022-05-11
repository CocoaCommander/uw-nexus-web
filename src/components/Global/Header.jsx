import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({
    isMobile
}) => {

    if (isMobile) {
        return (
            <>
                <Menu width={190}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/projects"}>Discover Projects</Link>
                    {/* <Link to={"/signup"}>Profile</Link> */}
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
                        <img src={logo} alt="Nexus Logo" className=""/>
                    </div>
                </Link>
                <div className="header-desktop-items">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/projects"}>Discover Projects</Link>
                    {/* <Link to={"/signup"}>Profile</Link> */}
                </div>
            </div>
        )
    }
    

}

export default Header;