import navbarCSS from "./navbar.module.css"
import React, { useState, useEffect } from 'react';

import { Link} from 'react-router-dom';


import reactLogo from "../images/logo192.png"

function NavBar() {

  
  return (
    <div className={navbarCSS.navbar}>
      <img src={reactLogo} alt="" />
      

      <h3>Macartsy</h3>

      <div className={navbarCSS.buttons}>
        <Link to={"/"}><button>About Page</button></Link>
        <Link to={"/signup"}><button>Sign Up</button></Link>
        <Link to={"/login"}><button>Login</button></Link>
      </div>
    </div>
  )
}

export default NavBar