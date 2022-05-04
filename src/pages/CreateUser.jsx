import { useEffect, useState } from "react";

import "../CreateUser.css";
import logo from "../assets/Logo.png";
import landingImage from "../assets/manyPpl.png";
import ssn from "../assets/ssn.PNG"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";



const CreateUser = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    var cookie = new Cookies();
    const jwt_token = cookie.get("jwt_token"); // need to check expiry date too
    if (jwt_token) {
      navigate('/projects');
      // redirect or something
    } else {
      console.log("not authenticated");
    }
  }, []);



  const handleSignUp = async(e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/auth/createUser`;

    if (email.length == 0) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (password.length == 0) {
      setErrorMsg("Please enter your password.");
      return;
    } else if (firstName.length == 0) {
      setErrorMsg("Please enter your first name.");
      return;
    } else if (lastName.length == 0) {
      setErrorMsg("Please enter your last name.");
    }

    let creds = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
  };
    
    let response = await fetch(url, requestOptions);
    if (response.ok) {
      const session = await response.json();
    } else {
      if (response.status == 404 || 400) {
        setErrorMsg("Invalid credentials. Please fill all");
      } else if (response.status == 500) {
        setErrorMsg("Something went wrong on our end. Please try again later.");
      }
    }

    navigate('/login');
  }


    return (
        <div className="desktop-container">
          <div className="main-pane">
            <img src={logo}></img>

            <p className="sign-in">Sign Up</p>
                 <form className="create-user-form">
                  <div className="form-field">

                  <input className="create-user-field"
                           type="text"
                           name="first-name" 
                           placeholder=" First Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}>
                    </input>

                    <input className="create-user-field"
                           type="text"
                           name="last-name" 
                           placeholder=" Last Name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}>
                    </input>

                     <input className="create-user-field" 
                           type="text"
                           name="e-mail" 
                           placeholder=" Email Address"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input className="create-user-field"
                           type="password"
                           name="password" 
                           placeholder=" Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}>
                    </input>
                  </div>

                </form>
                <p className="error-msg">{errorMsg}</p>

                
              <button className="create-acc-button" type="submit" onClick={(e) => {handleSignUp(e)}}>Create Account</button>
          </div>
        </div>
    );
}

export default CreateUser;