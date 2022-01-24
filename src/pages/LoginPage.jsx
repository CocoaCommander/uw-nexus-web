import { useState } from "react";
import { loginUser } from '../apiCalls'

const LoginPage = ({
    setToken
}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const handleSubmit = async e => {
        e.preventDefault();
        const email = username;
        const token = await loginUser({
          email,
          password
        });
        if (token.message) { setPasswordIsValid(false) };
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
          {
          !passwordIsValid ? 
            <p>The password does not match the given account</p> : <></>
          }
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }

  export default LoginPage;