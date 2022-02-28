import ProjectListPage from './pages/ProjectListPage'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import ProjectListDetail from './pages/ProjectListDetail';

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path=':projectId' element={<ProjectListDetail />} />
      </Routes>
    </>

  );
}

export default App;
