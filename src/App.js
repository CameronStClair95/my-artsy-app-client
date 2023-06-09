import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

//components

import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"


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
import ArtPostDetails from "./pages/ArtDetailsPage"
import Special from "./pages/special/Special";


function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        {/* Authorization routes */}
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}/>
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        {/* home and landing page  */}
        <Route path="/" element={<LandingPage />} /> {/* index page */}
        <Route path="/home" element={<IsPrivate><HomePage /></IsPrivate>}/>
        {/* user page */}
        <Route path="/user/:userId" element={<IsPrivate><UserPage /></IsPrivate>}/>
        {/* create new posts */}
        <Route path="/posts/post" element={<IsPrivate><NewPost /></IsPrivate>}/>
        <Route path="posts/artpost" element={<IsPrivate><NewArtpost /></IsPrivate>}/>
        {/* post details */}
        <Route path="/posts/posts/:postId" element={<IsPrivate><PostDetailsPage /></IsPrivate>} />
        <Route path="/posts/artposts/:artpostId" element={<IsPrivate><ArtPostDetails /></IsPrivate>} />        
        <Route path="/post/:postId/update" element={<UpdatePostDetails />} />
        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="home/special" element={<IsPrivate><Special/></IsPrivate>}/>
      </Routes>

      {/* <Footer/> */}
    </div>
  );
}

export default App;
