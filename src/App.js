import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import CreateProject from './pages/CreateProject';


const App = () => {

  console.log(process.env.PORT);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const reactToWindowResize = () => {
      setIsMobile(window.innerWidth <= 450);
    }
    window.addEventListener('resize', reactToWindowResize);
  });

  return (
    <>
      <Header />
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<ProjectListPage />} />
          <Route path='/projects/:projectId' element={<ProjectListDetail />} />
          <Route path='/createProject' element={<CreateProject isMobile={isMobile}/>} />
        </Routes>
      </div>
    </>

  );
}

export default App;
