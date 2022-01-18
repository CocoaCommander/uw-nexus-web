import PropTypes from 'prop-types';
import ProjectListPage from './pages/ProjectListPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import useToken from './components/Login/useToken';
import './App.css';

const App = () => {
  const {token, setToken} = useToken();

  console.log(token);

  if (!token) return <LoginPage setToken={setToken} />;

  return (
    <div className={"dev-test"}>
      <div>
        <h1>App</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/Projects">
              <ProjectListPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default App;
