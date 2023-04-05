import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

//components
import NavBar from "./components/NavBar/NavBar";

//pages
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import NewPost from "./components/Post/NewPost";
import NewArtpost from "./components/Artpost/NewArtpost";
import UserPage from "./pages/UserPage";
import IsAnon from "./components/auth/IsAnon";
import IsPrivate from "./components/auth/IsPrivate";
import PostDetailsPage from "./pages/Post/PostDetailsPage";
import UpdatePostDetails from "./pages/Post/UpdatePostDetails";
import ArtPostDetails from "./pages/ArtPost/ArtDetailsPage";

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
      <NavBar />

      <Routes>
        {/* Authorization routes */}
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/" element={<LandingPage />} /> {/* index page */}
        <Route
          path="/home"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />{" "}
        {/* index page */}
        <Route
          path="/user/:userId"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />{" "}
        {/* chat page */}
        <Route path="/:userId/posts" /> {/* put inside of the isPrivate*/}
        <Route path="/:userId/favorites" /> {/* chat page with isPrivate */}
        <Route
          path="/posts/post"
          element={
            <IsPrivate>
              <NewPost />
            </IsPrivate>
          }
        />
        <Route
          path="posts/artpost"
          element={
            <IsPrivate>
              <NewArtpost />
            </IsPrivate>
          }
        />
        <Route path="/post/:postId" element={<PostDetailsPage />} />
        <Route path="/post/:postId/update" element={<UpdatePostDetails />} />
        <Route path="/artposts/:artpostId" element={<ArtPostDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
