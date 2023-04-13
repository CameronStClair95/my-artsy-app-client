import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import AuthCSS from "./auth.module.css"
import styles from "./SignupPage.module.css";
import "../../App.css"

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function SignupPage(props) {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !username || !email || !password) {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    const requestBody = { fullname, username, email, password };
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then(() => navigate("/login"))
      .catch((error) => console.error("The error is", error));
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupFormContainer}>
        <Form onSubmit={handleSignupSubmit} className={styles.signupForm}>
        <h1>Sign Up</h1>
        <Form.Group controlId="formFullName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={fullname}
            onChange={handleName}
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={handleUsername}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.submitButton}>
            Sign Up
          </Button>
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}

          <div className={styles.alert}>
            <h6 variant="light">Already have an account?</h6>
            <Link to={"/login"}><p>Login</p></Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
