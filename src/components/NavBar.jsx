import navbarCSS from "./navbar.module.css"
import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import reactLogo from "../images/logo192.png"
import { AuthContext } from "../context/Auth.context"; 


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
        
            <Link to="/new-post/post">
              <button>Create new Post</button>
            </Link>
            <Link to="/user"><button>User</button></Link>
            <Link to="/">
              <button className="btn btn-primary" onClick={handleLogOut}>Log Out</button>
            </Link>
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
        {/* <select>
          <option><button>change the theme</button></option>
          <option><Link to={"/UserId"}><button>Log Out</button></Link></option>
        </select> */}
      </div>
    </div>
  )
}

export default NavBar