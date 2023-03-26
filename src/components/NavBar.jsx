import navbarCSS from "./navbar.module.css"
import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import reactLogo from "../images/logo192.png"
import { AuthContext } from "../context/Auth.context"; 

import { Dropdown } from "react-bootstrap";


function NavBar() {
  const { isLoggedIn, logOutUser} = useContext(AuthContext); // Get properties from AuthContext
  const [showAlert, setShowAlert] = useState(false);

  const handleLogOut = () => {
    logOutUser()
    setShowAlert(true);
  }

  return (
    <div className={navbarCSS.navbar}>
      <img src={reactLogo} alt="React Logo" />

      <Link to="/home"><h3 className={navbarCSS.h3}>Macartsy</h3></Link>

      <div className={navbarCSS.buttons}>
        
        {isLoggedIn ? (
          <>
          <div className={navbarCSS.right_buttons}>

          <Link to="/new-post/post"><button>New Post</button></Link>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              More
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to="/user">User</Link></Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
              <Dropdown.Item><Link to="/" onClick={handleLogOut}>Log Out</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          </div>
            </>
        ) : (
          <>
          <Link to="/about">
          <button className="btn btn-primary">About Page</button>
        </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to={"/login"}>
              <button>Login</button>
              </Link>
          </>
        )}
        
      </div>
    </div>
  )
}

export default NavBar