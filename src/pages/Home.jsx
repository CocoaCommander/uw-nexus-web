import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Home = () => {
    return (
        <>
            <section className="home-section">
                <h1>Find Your Next Passion Project</h1>
                <Link to={"/projects"} className={"home-button-container"}>
                    <div className={"find-project home-button"}>
                        Find Your Project
                    </div>
                </Link>
                <div className="divider"/>
            </section>
            <section className="home-section">
                <h2>Discover 100+ self-motivated students on the NEXUS Network</h2>
                <div className="home-card-container">
                    <div className="home-card">
                        <div className="home-card-item home-card-label">Looking for a side project?</div>
                        <Link to={"/projects"}>
                            <div className="home-card-item home-button side-project">Find a Project</div>
                        </Link>
                    </div>
                    <div className="home-card">
                        <div className="home-card-item home-card-label">Looking to recruit for your own project?</div>
                        <Link to={"/"}>
                            <div className="home-card-item home-button create-project">Create Your Project</div>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="home-section">
                <h2>The NEXUS Network</h2>
                <p className="tag-line">Join a community of self-motivated and driven students. Find a teammate or explore side project opportunities. Let&#39;s fuel your future!</p>
            </section>
            <div className="community">
                <div className="people man" />
                <div className="people woman" />
            </div>
            <section className="home-section">
                <div className="company-tag">
                    <div className="logo-small">
                        <img src={logo}/>
                    </div>
                    <p className="tag-text">
                        Supporting and empowering self-motivated and driven students toward their future
                    </p>
                </div>
                <hr></hr>
                <div className="footer-links">
                    <Link to={"/projects"}>
                        <div className="footer-link-text">
                            Find Projects
                        </div>
                    </Link>
                    <Link to={"/"}>
                        <div className="footer-link-text">
                                Recruit Team
                        </div>
                    </Link>
                    <Link to={"/"}>
                    <   div className="footer-link-text">
                            Post a Project
                        </div>
                    </Link>
                </div>
                <div className="copyright-home">Copyright 2020 - NEXUS Builders</div>
                <div className="footer"/>
            </section>
        </>
    )
}

export default Home;