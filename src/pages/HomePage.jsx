import React, { useState, useEffect } from 'react';
import axios from "axios"

const API_URL = "http://localhost:5005"



function HomePage() {

    const [posts, setPosts] = useState([])
    const {content, place, post_image} = posts

    const [artPosts, setArtposts] = useState([])
    const {artist, title, description, medium, year, dimensions, art_image} = artPosts

    function getPosts(){
        axios.get(API_URL)
            .then(response => setPosts(response.data))
            .catch(error => console.log(error))
    }

    function getArtposts(){
        axios.get(API_URL)
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

return(
   <div>
    {posts.map((post,i) => {
        <div key={i}>
            <h1>{content}</h1>
        </div>
    })}
   </div> 
)
  

}

export default HomePage