import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

//components
import NavBar from './components/NavBar';

//pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';



/* 
to use ThemeContext in each component:
1. import {ThemeContext}
2. const {theme, toggleTheme} = useContext(ThemeContext)
3. in example of the toggle theme (dark - light) -> className={"class " + theme}
4. to toggle theme -> 
    <button className='theme-btn' onClick={toggleTheme}>
        {theme === "dark" ? "light theme" : "dark theme"}
      </button>
*/

function App() {
  return (
    <div className="App">
    <NavBar/>

    <Routes>
      {/* Authorization routes */}
      <Route to="/signup" element={<SignupPage/>}/>
      <Route to="/login" element={<LoginPage/>}/>

      <Route to="/home" element={<LandingPage/>}/> {/* index page */}
      <Route to=":userId" /> {/* chat page */}
      <Route to=":userId/posts" /> {/* chat page */}
      <Route to=":userId/favorites" /> {/* chat page */}

      <Route to="/new-post" /> {/* main page */}

      {/* route for the error page with message */}
      <Route to="*" element={<ErrorPage/>}/>
    </Routes>
      
    </div>
  );
}

export default App;
