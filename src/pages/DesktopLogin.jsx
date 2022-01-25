import { useEffect, useState } from "react";
import ProjectListItem from "../components/ProjectListItem";
import "../DesktopLogin.css";
import logo from "../assets/Logo.png";
import landingImage from "../assets/manyPpl.png";



const DesktopLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    return (
        <div className="desktop-container">
          <div className="left-pane">
            <img className="logo" src={logo}></img>
            <div className="left-pane-text">
              <h4>Project Search Engine</h4>
              <h2>Let your ideas shine.</h2>
              <h2>Together we can go further.</h2>
            </div>

            <img className="landing-image" src={landingImage}></img>
          </div>
          <div className="right-pane">
            <div className="right-pane-header">
              <p>Don't have an account? <a className="sign-up" href="https://www.google.com">Sign Up Now</a>
              </p>
            </div>

            <div className="right-pane-center">

              <div className="right-pane-third-auth">
                <div className="third-auth-child">
                  <p>Continue with Google</p>
                </div>

                <div className="third-auth-child">
                  <p>Continue with Twitter</p>
                </div>

                <div className="third-auth-child">
                  <p>Continue with Facebook</p>
                </div>
              </div>

              <h2 className="right-pane-seperator"><span>Or</span></h2>

              <div className="right-pane-sign-in">
                <p className="sign-in">Sign in</p>
                <form>
                  <div className="form-field">
                    <input className="email-textbox" 
                           type="text"
                           name="e-mail" 
                           placeholder="  Email Address"
                           onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input className="password-textbox"
                           type="text"
                           name="password" 
                           placeholder="  Password"
                           onChange={(e) => setPassword(e.target.value)}></input>
                  </div>

                </form>
                <a className="forgot-pass" href="https://www.google.com">Forgot Password?</a>
              </div>
              <button className="login-button">Login</button>
            </div>

            {/* <div className="copyright">
              <p>Copyright &copy; NEXUS UW 2020.</p>
            </div> */}
            

            

          </div>

          

        </div>
    );
}

export default DesktopLogin;