import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { useDispatch, 
  useSelector 
} from "react-redux";
import CreateProject from './pages/CreateProject';
import ProjectFinish from './components/ProjectFinish/ProjectFinish';
import ProjectReview from './components/ProjectReview/ProjectReview';
import CreateUser from './pages/CreateUser';
import DesktopLogin from './pages/DesktopLogin';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignUpStart from './pages/SignUpStart';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import WelcomePage from './pages/WelcomePage';
import Cookies from 'universal-cookie';
import { setLoggedIn, setUserID } from './redux/userState/userStateActions';
import ApplicationPage from './pages/ApplicationPage';
import { useLocation, useNavigate } from 'react-router-dom';
import userPic from './assets/userpic.png';

// static user info
const USER_INFO = {
  user_image: userPic,
  first_name: '',
  last_name: '',
  email: "",
  education: {
      campus: '',
      year: '',
      major: '',
      interests: [],
      skills: [
      ],
      bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      resume_file_id: '',
      private: false,
      profile_id: ''
  }
}

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [userProfile, setUserProfile] = useState(USER_INFO);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const userID = useSelector((state) => state.userState.userID);
  const [profileID, setProfileID] = useState(localStorage.getItem(localStorage.getItem("nxs-id")));
  const location = useLocation().pathname;

  if (location !== '/forgotPassword') { // fixes brightness when leaving forgotPassword page
    const headerDesktopDOM = document.getElementsByClassName('header-desktop')[0];
    document.getElementById('root').style.backdropFilter = 'brightness(100%)';
    if (headerDesktopDOM !== undefined) {
      headerDesktopDOM.style.filter = 'brightness(100%)';
    }
  }

  const navigate = useNavigate();

  const setData = (data, resumeData) => {
    let newData = {
      user_image: userPic, // Replace with image endpoint
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      education: {
        campus: data.education.campus,
        year: data.education.year,
        major: data.education.major,
        interests: data.interests,
        skills: data.skills,
        bio: data.bio,
        resume_file_id: data.resume_file_id,
        private: data.private,
      },
      profile_id: data._id,
    }
    setUserProfile(newData);
  }

  const getUserProfile = async(email) => {
    const user_id = window.localStorage.getItem("nxs-id");
    if (user_id) { // user is logged in
      const url = `/api/profile/user/${user_id}`;
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const response = await fetch(url, requestOptions);
      if (response.ok) { // profile that matches user ID found
        const profileData = await response.json();
        setData(profileData);
      } else if (response.status === 400) { // profile not yet created...
        navigate('/createProfileStart');
      }
    }
  }

  const handleFirstLogin = (email) => {
    getUserProfile(email);
  }


  useEffect(() => {
    const cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    if (jwt_token) {
      console.log("GETTING PROFILE AGAIN!");
      getUserProfile();
    }
  }, [profileID])

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 850);
    }
    window.addEventListener('resize', reactToWindowResize);

    console.log("rerendering");
    // Check if user is signed in
    const cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    if (jwt_token) {
      dispatch(setLoggedIn(true));
      dispatch(setUserID(window.localStorage.getItem("nxs-id")));
    } else {
      console.log("no cookie");
      dispatch(setLoggedIn(false));
    }
  });

  const onCreateProfile = (profile_id) => {
    setProfileID(profile_id);
  }

  return (
    <>
      <Header isMobile={isMobile} userProfile={userProfile} getProfile={getUserProfile}/>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<ProjectListPage />} />
          <Route path='/projects/:projectId' element={<ProjectListDetail />} />
          <Route path='/createProject' element={<CreateProject isMobile={isMobile}/>} />
          <Route path='/finishProject' element={<ProjectFinish email={userProfile.email}/>}/>
          <Route path='/reviewProject' element={<ProjectReview/>} email={userProfile.email}/>
          <Route path='/signUp' element={<CreateUser onLogin={handleFirstLogin}/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/login' element={<DesktopLogin onLogin={handleFirstLogin}/>}/>
          <Route path='/profile' element={<Profile isMobile={isMobile} userProfile={userProfile} userCallback={(data) => setUserProfile(data)} />}/>
          <Route path='/createProfileStart' element={<SignUpStart/>}/>
          <Route path='/createProfile' element={<SignUp onCreateProfile={onCreateProfile}/>}/>
          <Route path='/welcomePage' element={<WelcomePage/>}/>
          <Route path='/apply/:projectName/:projectRole' element={<ApplicationPage/>}/>
        </Routes>
      </div>
    </>

  );
}

export default App;