import navbarCSS from "./navbar.module.css"
import React, { useState, useEffect } from 'react';

import { Link} from 'react-router-dom';


import reactLogo from "../images/logo192.png"

function NavBar() {

  return (
    <div className={navbarCSS.navbar}>
      <img src={reactLogo} alt="" />

      
      {/* <h3 className={navbarCSS.h3}>Macartsy</h3> */}
      <Link to={"/home"}><h3>Macartsy</h3></Link>

      <div className={navbarCSS.buttons}>
        <Link to={"/about"}><button>About</button></Link>
        {/* <Link to={"/home"}><button>Home</button></Link> */}
        <Link to={"/signup"}><button>Sign Up</button></Link>
        <Link to={"/login"}><button>Login</button></Link>
        <Link to={"/new-post/post"}><button>Create new Post</button></Link>
        <Link to={"/user"}><button>User</button></Link>
        {/* <select>
          <option><button>change the theme</button></option>
          <option><Link to={"/UserId"}><button>Log Out</button></Link></option>
        </select> */}
      </div>
    </div>
  )
}

export default NavBar