import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { Form, Button, Alert } from "react-bootstrap";
import "./LoginPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        console.error("error is ", error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <Form className="login-form" onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmail}
            />
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
            />
          </Form.Group>
  
          <Button variant="primary" type="submit" className="submit_button">
            Login
          </Button>
  
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
  
          <div className="alert">
            <h6 variant="light">Don't have an account yet?</h6>
            <Link to={"/signup"}><p>Sign Up</p></Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
