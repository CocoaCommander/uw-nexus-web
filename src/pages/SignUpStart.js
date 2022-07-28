import { useLocation, useNavigate } from "react-router-dom";
import "../SignUpStart.css";



const SignUpStart = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="center-text">
      <div className="text-wrapper">
        
        <p className="note-text"> <span className="note">NOTE:</span> As you go through the sign up process, 
        please keep in mind not all of the sections are required. Once 
        you complete the process, you can fill out the sections you 
        skipped in your profile page.
        </p>
      </div>

      <button className="start-button" onClick={() => {navigate('/createProfile', {state: {email: location.state.email}})}}>Start</button>

    </div>
  )

}

export default SignUpStart;