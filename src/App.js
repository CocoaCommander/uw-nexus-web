import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CreateProject from './pages/CreateProject';
import ProjectFinish from './components/ProjectFinish/ProjectFinish';
import ProjectReview from './components/ProjectReview/ProjectReview';
import CreateUser from './pages/CreateUser';
import DesktopLogin from './pages/DesktopLogin';
import SignUp from './pages/SignUp';
import SignUpStart from './pages/SignUpStart';
import WelcomePage from './pages/WelcomePage';
import Cookies from 'universal-cookie';
import { setLoggedIn } from './redux/userState/userStateActions';

const App = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 450);
    }
    window.addEventListener('resize', reactToWindowResize);

    console.log("APP.js useEffect");

    // Check if user is signed in
    const cookie = new Cookies();
    const jwt_token = cookie.get("jwt_token");
    if (jwt_token) {
      console.log("already authenticated");
      dispatch(setLoggedIn(true));
      // proceed

    } else {
      console.log("not authenticated");
      dispatch(setLoggedIn(false));
      navigate('/login')
      // redirect to Login?
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
          <Route path='login' element={<DesktopLogin/>}/>
          <Route path='createProfileStart' element={<SignUpStart/>}/>
          <Route path='createProfile' element={<SignUp/>}/>
          <Route path='welcomePage' element={<WelcomePage/>}/>
        </Routes>
      </div>
    </>

  );
}

export default App;
