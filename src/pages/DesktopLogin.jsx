import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../DesktopLogin.css";
import logo from "../assets/Logo.png";
import landingImage from "../assets/manyPpl.png";
import ssn from "../assets/ssn.PNG"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { setUserID } from "../redux/userState/userStateActions";



const DesktopLogin = () => {

  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignIn = async(e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/auth/signIn`;

    if (email.length == 0) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (password.length == 0) {
      setErrorMsg("Please enter your password.");
      return;
    }

    let creds = {
      "email": email,
      "password": password
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
  };
    
    let response = await fetch(url, requestOptions);
    if (response.ok) {
      const session = await response.json();
      const cookie = new Cookies();
      cookie.set('jwt_token', session.accessToken);
      dispatch(setUserID(session.id));
      console.log(cookie);
    } else {
      if (response.status == 404 || 400) {
        setErrorMsg("Invalid email and/or password. Please try again.");
      } else if (response.status == 500) {
        setErrorMsg("Something went wrong on our end. Please try again later.");
      }
    }

    navigate('/projects');
  }


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
            {/* <img src={ssn} className="ssn"></img> */}

            
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
                           placeholder=" Email Address"
                           onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input className="password-textbox"
                           type="password"
                           name="password" 
                           placeholder=" Password"
                           onChange={(e) => setPassword(e.target.value)}></input>
                  </div>

                </form>
                <a className="forgot-pass" href="https://www.google.com">Forgot Password?</a>
                <p className="error-msg">{errorMsg}</p>
              </div>
              <button className="login-button" type="submit" onClick={(e) => {handleSignIn(e)}}>Login</button>
            </div>

            {/* <div className="copyright">
              <p>Copyright &copy; NEXUS UW 2020.</p>
            </div> */}
            

            

          </div>

          

        </div>
    );
}

export default DesktopLogin;