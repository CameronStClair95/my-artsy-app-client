import React, { useState, useEffect } from 'react';
import axios from "axios"


function HomePage() {

    const [posts, setPosts] = useState([])
    const [artPosts, setArtposts] = useState([])

    function getPosts(){
        axios.get(/*  */)
            .then(response => setPosts(response.data))
            .catch(error => console.log(error))
    }

    function getArtposts(){
        axios.get(/*  */)
            .then(response => setArtposts(response.data))
            .catch(error => console.log(error))
    }

    const PostsWithArtposts = [posts, artPosts]

    useEffect(() => {
        getArtposts()
    },[])

    useEffect(() => {
        getPosts()
    },[])


  return (
    <div>
        {PostsWithArtposts.map((post) => (
            {/* 
            I just realized i can't map it the same way, because we dont have the same fields for 2 different models... 
            what should we do? *🫥face of panic🫠*
             */}
        ))}

    </div>
  )

}

export default HomePage