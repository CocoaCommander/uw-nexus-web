import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';
import ProjectListPage from './pages/ProjectListPage';
import Home from './pages/Home';
import { useEffect } from 'react';
import CreateProject from './pages/CreateProject';


const App = () => {

  useEffect(() => {
    console.log(window.innerWidth);
  }, [])

  return (
    <>
      <Header />
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<ProjectListPage />} />
          <Route path='/projects/:projectId' element={<ProjectListDetail />} />
          <Route path='/createProject' element={<CreateProject />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
