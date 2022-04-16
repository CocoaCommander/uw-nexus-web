import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    
    return (
        <>
            <Menu width={190}>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Discover Projects</Link>
                <Link to={"/"}>Profile</Link>
            </Menu>
            <div className="flex">
                <div className="logo">
                    <img src={logo} alt="Nexus Logo" className="logo"/>
                </div>

            </div>
        </>
    );
}

export default Header;