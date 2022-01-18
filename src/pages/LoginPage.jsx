import { useState } from "react";
import { loginUser } from '../apiCalls'

const LoginPage = ({
    setToken
}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const email = username;
        const token = await loginUser({
          email,
          password
        });
        setToken(token.accessToken);
    }

    return(
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }

  export default LoginPage;