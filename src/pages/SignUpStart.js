import { useNavigate } from "react-router-dom";
import "../SignUpStart.css";



const SignUpStart = () => {

  const navigate = useNavigate();

  return (
    <div className="center-text">
      <div className="text-wrapper">
        
        <p className="note-text"> <span className="note">NOTE:</span> As you go through the sign up process, 
        please keep in mind not all of the sections are required. Once 
        you complete the process, you can fill out the sections you 
        skipped in your profile page.
        </p>
      </div>

      <button className="start-button" onClick={() => {navigate('/createProfile')}}>Start</button>

    </div>
  )

}

export default SignUpStart;