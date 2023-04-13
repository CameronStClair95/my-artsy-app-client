import navbarCSS from "./navbar.module.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import macArtsy from "../../images/macArtsy.png";
import macArtsy2 from "../../images/macArtsy2.png";

import { AuthContext } from "../../context/Auth.context";

import { Button, ButtonGroup, Dropdown, Navbar } from "react-bootstrap";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  const { userId } = useParams();

  const handleLogOut = () => {
    logOutUser();
    setShowAlert(true);
  };

  return (
    <div className={navbarCSS.navbar}>
      <img src={macArtsy2} className={navbarCSS.logotype2} alt="Macartsy Logo" />
      <Link className={navbarCSS.title_link} to="/home">
        <h3 className={navbarCSS.title}>
          {/* <span>Macartsy</span> */}
          <img
            src={macArtsy}
            className={navbarCSS.logotype}
            alt="Macartsy Logo"
          />
        </h3>
      </Link>

      <div className={navbarCSS.buttons}>
        {isLoggedIn ? (
          <>
            <div className={navbarCSS.right_buttons}>
            <Link to="/posts/post">
  <Button variant="outline-dark" size="sm" className={navbarCSS.newPost}>
    New Post
  </Button>
</Link>

              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-dark"
                  size="sm"
                  id="dropdown-basic"
                >
                  More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={`/user/${user._id}`}>My Profile</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={`/home/special`}>Special Page</Link>
                  </Dropdown.Item>

                  <Dropdown>
                    <Dropdown.Toggle size="sm" id="dropdown-basic" drop={"start"}>
                      Contacts
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a href="https://www.linkedin.com/in/cameron-a-8531531ba/" target="_blank" rel="noopener noreferrer">
                          <em>Cam's LinkedIn</em>
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a href="https://www.linkedin.com/in/maksym-kopychanskyi-380316203/" target="_blank" rel="noopener noreferrer">
                          <em>Max's LinkedIn</em>
                        </a>                        
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a href="https://github.com/CameronStClair95" target="_blank" rel="noopener noreferrer">
                          <em>Cam's Github</em>
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                      <a href="https://github.com/Sup-Maxx" target="_blank" rel="noopener noreferrer">
                          <em>Max's Github</em>
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
      
                  <Dropdown.Item>
                    <Link to="/" onClick={handleLogOut}>
                      Log Out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button
                variant="outline-dark"
                size="sm"
                className={navbarCSS.signUp}
              >
                Sign Up
              </Button>
            </Link>

            <Link to={"/login"}>
              <Button variant="outline-dark" size="sm">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
