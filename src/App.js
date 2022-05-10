import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import CreateProject from './pages/CreateProject';
import ProjectFinish from './components/ProjectFinish/ProjectFinish';
import ProjectReview from './components/ProjectReview/ProjectReview';
import CreateUser from './pages/CreateUser';
import DesktopLogin from './pages/DesktopLogin';
import SignUp from './pages/SignUp';
import SignUpStart from './pages/SignUpStart';
import WelcomePage from './pages/WelcomePage';

const App = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 450);
    }
    window.addEventListener('resize', reactToWindowResize);
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
