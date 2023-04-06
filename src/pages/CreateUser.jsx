import { useState } from "react";
import { useDispatch } from "react-redux";
import "../CreateUser.css";
import logo from "../assets/Logo.png";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { setLoggedIn, setUserID } from "../redux/userState/userStateActions";
import LoadingButton from "../components/LoadingButton/LoadingButton";
import landingImage from "../assets/manyPpl.png";



const CreateUser = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async(e) => {
    e.preventDefault();
    const url = `/api/auth/createUser`;

    if (email.length === 0) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (password.length === 0) {
      setErrorMsg("Please enter your password.");
      return;
    } else if (firstName.length === 0) {
      setErrorMsg("Please enter your first name.");
      return;
    } else if (lastName.length === 0) {
      setErrorMsg("Please enter your last name.");
      return;
    } else if (!document.getElementById("email-input").validity.valid) {
      setErrorMsg("Please enter a valid email.")
      return;
    }

    setIsLoading(true);
    let creds = {
      "email": email,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
  };
    
    let response = await fetch(url, requestOptions);
    if (!response.ok) {
      if (response.status === 404 || 400) {
        setErrorMsg("Invalid credentials. Please fill all");
        return;
      } else if (response.status === 500) {
        setErrorMsg("Something went wrong on our end. Please try again later.");
        return;
      }
    }

    // sign in user after sign up, setting access token and user id and redirecting to projects page
    await handleSignIn();

    setIsLoading(false);

    if (!localStorage.getItem(localStorage.getItem("nxs-id"))) {
      navigate('/createProfileStart', {state: {email: email}});
    } else {
      navigate('/projects');
    }

  }

  const handleSignIn = async(e) => {
    const url = `/api/auth/signIn`;

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
      cookie.set('fr-accessToken', "loggedin", {maxAge: 24 * 60 * 60, path: "/"});
      window.localStorage.setItem("nxs-id", session.id);
      dispatch(setLoggedIn(true));
      console.log(cookie);
    }
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
        handleSignUp(e);
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
              <p className="sign-in">Sign Up</p>
              <form className="desktop-form">
                <div className="form-field">
                  <input className="email-textbox"
                      type="text"
                      name="first-name"
                      placeholder=" First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyDown={(e) => handleKeypress(e)}>
                      </input>

                      <input className="email-textbox"
                      type="text"
                      name="last-name"
                      placeholder=" Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyDown={(e) => handleKeypress(e)}>
                      </input>

                    <input className="email-textbox"
                      type="email"
                      name="e-mail"
                      id="email-input"
                      placeholder=" Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => handleKeypress(e)}>
                    </input>

                    <input className="password-textbox"
                      type="password"
                      name="password"
                      placeholder=" Password"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => handleKeypress(e)}>
                      </input>
                </div>
              </form>
              <p className="error-msg">{errorMsg}</p>
  
            </div>
            {/* <button className="login-button" type="submit" onClick={(e) => { handleSignIn(e) }}>Login
  
            </button> */}
  
            <LoadingButton
              title="Create Account"
              isLoading={isLoading}
              onClick={(e) => handleSignUp(e)}
              />
  
          </div>
          <div className="or-separator-signup">
            <hr className="or-hr" />
            <p className="or-text">OR</p>
            <hr className="or-hr" />
          </div>
          <div className="right-pane-footer">
            <p>Already have an account? <a className="sign-up" onClick={() => navigate('/login')}>Sign In</a>
            </p>
          </div>
        </div>
      </div>
    );
}

export default CreateUser;