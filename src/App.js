import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

//components
import NavBar from './components/NavBar';

//pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import NewPost from './components/NewPost';
import NewArtpost from './components/NewArtpost';
import UserPage from './pages/UserPage';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import PostDetailsPage from './pages/PostDetailsPage';
import UpdatePostDetails from './pages/UpdatePostDetails';



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
      <Route path="/signup" element={<IsAnon><SignupPage/></IsAnon>} />
      <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>} />

      <Route path="/" element={<LandingPage/>}/> {/* index page */}
      <Route path="/home" element={<HomePage/>}/> {/* index page */}
      <Route path="/user" element={<UserPage/>}/> {/* chat page */}
      <Route path="/:userId/posts" /> {/* chat page */}
      <Route path="/:userId/favorites" /> {/* chat page */}

      <Route path="/new-post/post" element={<IsPrivate><NewPost /></IsPrivate>} />
      <Route path="new-post/artpost" element={<IsPrivate><NewArtpost/></IsPrivate>}/>
      <Route path="/post/:postId" element={<PostDetailsPage />} />
      <Route path="/post/:postId/update" element={<UpdatePostDetails/>} />

      {/* route for the error page with message */}
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
      
    </div>
  );
}

export default App;
