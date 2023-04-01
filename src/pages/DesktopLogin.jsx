import { useState } from "react";
import { useDispatch } from "react-redux";
import "../DesktopLogin.css";
import landingImage from "../assets/manyPpl.png";
import Cookies from 'universal-cookie';
import { useNavigate, Link } from "react-router-dom";
import { setLoggedIn, setUserID } from "../redux/userState/userStateActions";
import { TailSpin } from "react-loader-spinner";
import LoadingButton from "../components/LoadingButton/LoadingButton";

const DesktopLogin = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignIn = async (e) => {
    e.preventDefault();

    const url = "/api/auth/signIn";

    if (email.length === 0) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (password.length === 0) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setIsLoading(true);
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
      cookie.set('fr-accessToken', "loggedin", {maxAge: 24 * 60 * 60, path: '/'});
      window.localStorage.setItem("nxs-id", session.id);
      dispatch(setLoggedIn(true));
      props.onLogin(email);
      setIsLoading(false);
      navigate('/projects');
    } else {
      setIsLoading(false);
      if (response.status === 404 || 400) {
        setErrorMsg("Invalid email and/or password. Please try again.");
      } else if (response.status === 500) {
        setErrorMsg("Something went wrong on our end. Please try again later.");
      }
    }
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
        handleSignIn(e);
    }
};

  return (
    <div className="desktop-container">
      <div className="left-pane">
        <div className="left-pane-text">
          <p className="first-subtitle">Project Search Engine</p>
          <p className="second-subtitle">Let your ideas shine.</p>
          <p className="second-subtitle">Together we can go further.</p>
        </div>

        <img className="landing-image" src={landingImage} alt="landing"></img>
      </div>
      <div className="right-pane">
        <div className="right-pane-center">
          <div className="right-pane-sign-in">
            <p className="sign-in">Sign In</p>
            <form className="desktop-form">
              <div className="form-field">
                <input className="email-textbox"
                  type="text"
                  name="e-mail"
                  placeholder=" Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeypress(e)}>
                </input>
                <input className="password-textbox"
                  type="password"
                  name="password"
                  placeholder=" Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeypress(e)}></input>
                <Link className="forgot-pass" to='/forgotPassword'>Forgot Password?</Link>
              </div>
            </form>
            <p className="error-msg">{errorMsg}</p>

          </div>
          {/* <button className="login-button" type="submit" onClick={(e) => { handleSignIn(e) }}>Login

          </button> */}

          <LoadingButton
           title="Login"
           isLoading={isLoading} 
           onClick={(e) => handleSignIn(e)}
           />

        </div>
        <div className="or-separator">
          <hr className="or-hr" />
          <p className="or-text">OR</p>
          <hr className="or-hr" />
        </div>
        <div className="right-pane-footer">
          <p>Don't have an account? <a className="sign-up" onClick={() => navigate('/signUp')}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesktopLogin;