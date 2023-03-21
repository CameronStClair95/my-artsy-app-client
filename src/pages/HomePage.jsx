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

   const [posts,setPosts] = useState([1])

   function getPosts(){
    axios.get(API_URL)
        .then((response) => {
            setPosts(response.data)
            console.log(response.data)
            /* setLoading(false) */
        })
        .catch(error => console.log(error))
}
useEffect(() => {
    getPosts();
}, []);

  return (
    <div>
    
        {!posts && "Falsy"}
        {posts && (
            posts.map(post=>{
                return(
                    <div>
                        <p>{post.content}</p>
                        <p>{post.place}</p>
                        <p>{post.post_image}</p>
                    </div>
                )
            })
        )}

    </div>
  )
}

export default HomePage