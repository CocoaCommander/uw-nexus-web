import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../WelcomePage.css";



const WelcomePage = () => {

  const navigate = useNavigate();
  const fullName = useSelector((state) => state.signUp.fullName);

  return (
    <div className="center-text">
      <div className="text-wrapper">
        
        <p className="welcome-text">  Welcome <span className="welcome-name">James</span></p>
        <p className="sub-text"> You can now begin searching projects.</p>
      </div>

      <button className="start-search-button" onClick={() => {navigate('/projects')}}>Start Searching</button>

    </div>
  )

}

export default WelcomePage;