import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const requestBody = {name, username, email, password}
    axios.post(`${API_URL}/auth/signup`, requestBody)
        .then(response => navigate("/login"))

        .catch((error) => {
            const errorDescription = error.response.data.errorMessage
            setErrorMessage(errorDescription)
        })
  };

  
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>

        <label>
          Name:
          <input type="text" name="name" value={name} onChange={handleName}/>
        </label>

        <label>
          Username:
          <input type="text" name="username" value={username} onChange={handleUsername}/>
        </label>

        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleEmail}/>
        </label>

        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handlePassword}/>
        </label>


        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <alert>Already have account?</alert>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;