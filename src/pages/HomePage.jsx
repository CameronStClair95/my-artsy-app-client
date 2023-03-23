/* 
import React, { useState, useEffect } from 'react';
import axios from "axios"

const API_URL = "http://localhost:5005/api/home"

function HomePage({}) {

    const [posts, setPosts] = useState([])
    
    const [isLoading, setLoading] = useState(true)
    
    function getPosts(){
        axios.get(API_URL)
            .then((response) => {
                setPosts(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getPosts();
    }, []);
    return(
        <div>
                            <p>Max</p>

            {isLoading ? <p>Loading</p> : (
                <div>
                    <h1>Posts</h1>
                    
                </div>
            )}
            {posts.map((post) => {
                        return(
                            <div key={post._id}>
                            <p>{post.content}</p>
                        </div>
                        )
                    })}
        </div>
    )
}
export default HomePage */

import React, { useState, useEffect } from 'react';
import axios from "axios"

const API_URL = "http://localhost:5005/api/home"

function HomePage() {

   const [posts, setPosts] = useState([1])
   const [artPosts,setArtPosts] = useState([])
 
   function getAllPosts(){
    axios.get(API_URL)
        .then((response) => {
            console.log(response.data)
            setPosts(response.data.posts)
            setArtPosts(response.data.artPosts)
            
            
        })
        .catch(error => console.log(error))
}



useEffect(() => {
    getAllPosts();
}, []); 

  return (
    <div>

    
   {/* Post Card */}
    {posts.map(post=>{
        return(
            <div>
                {post.content}
            </div>
        )
    })}
    
   {/* Artpost Card */}
   {artPosts.map(artpost => {
    return (
        <div>
            {artpost.title}
            <img src={artpost.art_image}/>
            {/* <img src={artpost.image}/> */}

        </div>
        
    )
   })}
    
    </div>
  )
}

export default HomePage