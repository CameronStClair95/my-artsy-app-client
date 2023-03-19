import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
/* import { AuthContext } from "../context/auth.context"; */
import {AuthContext} from "../context/Auth.context"

const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {authenticateUser} = useContext(AuthContext)
  
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const requestBody = {email, password}
    axios.post(`${API_URL}/auth/login`, requestBody)
        .then((response) => {
            console.log("JWT token", response.data.authToken)
            localStorage.setItem("authToken", response.data.authToken)
            authenticateUser()
            navigate("/")
        .catch((error) => {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })
        })

  };
  
  return (
    <div className="login-page">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleEmail}/>
        </label>

        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handlePassword}/>
        </label>

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <div className="column">
        <alert>Don't have an account yet?</alert>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginPage;