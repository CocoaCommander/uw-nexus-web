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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [userProfile, setUserProfile] = useState(USER_INFO);
  // const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const userID = useSelector((state) => state.userState.userID);

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 450);
    }
    window.addEventListener('resize', reactToWindowResize);

    // Check if user is signed in
    const cookie = new Cookies();
    const jwt_token = cookie.get("accessToken");
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

  return (
    <>
      <Header isMobile={isMobile} userProfile={userProfile} />
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<ProjectListPage />} />
          <Route path='/projects/:projectId' element={<ProjectListDetail />} />
          <Route path='/createProject' element={<CreateProject isMobile={isMobile}/>} />
          <Route path='/finishProject' element={<ProjectFinish/>}/>
          <Route path='/reviewProject' element={<ProjectReview/>}/>
          <Route path='/signUp' element={<CreateUser/>}/>
          <Route path='/login' element={<DesktopLogin/>}/>
          <Route path='/profile' element={<Profile isMobile={isMobile} userProfile={userProfile} userCallback={setUserProfile} />}/>
          <Route path='/createProfileStart' element={<SignUpStart/>}/>
          <Route path='/createProfile' element={<SignUp/>}/>
          <Route path='/welcomePage' element={<WelcomePage/>}/>
          <Route path='/apply' element={<ApplicationPage/>}/>
        </Routes>
      </div>
    </>

  );
}

export default App;