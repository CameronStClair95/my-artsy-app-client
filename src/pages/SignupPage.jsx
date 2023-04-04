import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import "../App.css";

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
      .then((response) => navigate("/login"))
      .catch((error) => {
        console.log("The error is", error);
       /*  const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription); */
      });
  };

  return (
    <div className="SignupPage">
      <Link to="/">Go back</Link>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignupSubmit}>
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
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Button variant="outline-primary">
            <Link to={"/login"}>Log in</Link>
          </Button>
        </p>
      </Form>
    </div>
  );
}

export default SignupPage;
