import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import WelcomePage from './pages/WelcomePage';
import Cookies from 'universal-cookie';
import { setLoggedIn, setUserID } from './redux/userState/userStateActions';
import ApplicationPage from './pages/ApplicationPage';

// static user info
const USER_INFO = {
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
  // const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const userID = useSelector((state) => state.userState.userID);
  const [profileID, setProfileID] = useState(localStorage.getItem(localStorage.getItem("nxs-id")));

  const setData = (data, resumeData) => {
    let newData = {
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

  const getUserProfile = async() => {
    const profile_id = window.localStorage.getItem(window.localStorage.getItem("nxs-id"));
    if (profile_id) {
      const url = `${process.env.REACT_APP_API_URL}/api/profile/${profile_id}`;

      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const profileData = await response.json();
        setData(profileData);
      } else {
        console.log("Error fetching profile!");
      }
    }
  }

  useEffect(() => {
    const cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    if (jwt_token) {
      console.log("GETTING PROFILE AGAIN!");
      getUserProfile();
    }
  }, [isLoggedIn, profileID])

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 850);
    }
    window.addEventListener('resize', reactToWindowResize);

    // Check if user is signed in
    const cookie = new Cookies();
    const jwt_token = cookie.get("fr-accessToken");
    // const user_id = cookie.get("nxs_id");
    if (jwt_token) {
      // console.log("already authenticated");
      // console.log("in app.js, user_id = " + user_id);
      dispatch(setLoggedIn(true));
      dispatch(setUserID(window.localStorage.getItem("nxs-id")));
      // dispatch(setUserID(user_id));
    } else {
      dispatch(setLoggedIn(false));
    }
  });

  const onCreateProfile = (profile_id) => {
    setProfileID(profile_id);
  }

  return (
    <>
      <Header isMobile={isMobile} userProfile={userProfile} />
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<ProjectListPage />} />
          <Route path='/projects/:projectId' element={<ProjectListDetail />} />
          <Route path='/createProject' element={<CreateProject isMobile={isMobile}/>} />
          <Route path='/finishProject' element={<ProjectFinish email={userProfile.email}/>}/>
          <Route path='/reviewProject' element={<ProjectReview/>} email={userProfile.email}/>
          <Route path='/signUp' element={<CreateUser/>}/>
          <Route path='/login' element={<DesktopLogin/>}/>
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