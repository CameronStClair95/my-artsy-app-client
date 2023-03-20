import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const requestBody = {fullname, username, email, password}
    axios.post(`${API_URL}/auth/signup`, requestBody)
        .then(response => navigate("/login"))

        .catch((error) => {
          console.log('The error is', error)
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
          <input type="text" name="name" value={fullname} onChange={handleName}/>
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

      <p>Already have an account? <Link to={"/login"}> Login</Link></p>
      
    </div>
  )
}

export default SignupPage;