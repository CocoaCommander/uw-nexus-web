import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    
    return (
        <>
            <Menu width={190}>
                <Link to={"/"}>Home</Link>
                <Link to={"/projects"}>Discover Projects</Link>
                <Link to={"/"}>Profile</Link>
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
}

export default Header;