import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, link } from 'react-router-dom';
import NavBar from './components/NavBar';

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
      <Route to="" /> {/* index page */}
      <Route to="" /> {/* signup page */}
      <Route to="" /> {/* login page */}
      <Route to="" /> {/* main page */}
      <Route to="" /> {/* chat page */}
    </Routes>
      
    </div>
  );
}

export default App;
