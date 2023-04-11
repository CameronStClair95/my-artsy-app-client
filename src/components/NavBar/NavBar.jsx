import navbarCSS from "./navbar.module.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import pageLogo from "../../images/logo192.png";

import { AuthContext } from "../../context/Auth.context";

import { Button, ButtonGroup, Dropdown, Navbar } from "react-bootstrap";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext); // Get properties from AuthContext
  const [showAlert, setShowAlert] = useState(false);

  const { userId } = useParams();

  const handleLogOut = () => {
    logOutUser();
    setShowAlert(true);
  };

  return (
    <div className={navbarCSS.navbar}>
    
      <img src={pageLogo} className={navbarCSS.logotype} alt="React Logo" />
      <Link className={navbarCSS.title_link} to="/home">
        <h3 className={navbarCSS.title}><span>Macartsy</span></h3>
      </Link>

      <div className={navbarCSS.buttons}>
        {isLoggedIn ? (
          <>
            <div className={navbarCSS.right_buttons}>
              <Link to="/posts/post">
              <Button size="sm">New Post</Button>
              </Link>

              <Dropdown>
                <Dropdown.Toggle size="sm" id="dropdown-basic">
                  More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={`/user/${user._id}`}>My Profile</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={`/home/special`}>Special Page</Link>
                  </Dropdown.Item>
      
                  <Dropdown.Item>
                    <Link to="/" onClick={handleLogOut}>Log Out</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <Link to="/about"><Button size="sm">About Page</Button></Link>

            <Link to="/signup"><Button size="sm">Sign Up</Button></Link>

            <Link to={"/login"}><Button size="sm">Login</Button></Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
