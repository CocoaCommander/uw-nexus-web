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

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  // const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const userID = useSelector((state) => state.userState.userID);

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 850);
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
      <Header isMobile={isMobile}/>
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
          <Route path='/profile' element={<Profile isMobile={isMobile}/>}/>
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