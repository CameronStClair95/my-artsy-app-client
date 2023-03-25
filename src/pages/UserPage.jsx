import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"


import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

const API_URL = "http://localhost:5005"


function UserPage(props) {

    const {user} = useContext(AuthContext)
    console.log( "user id is ", user?._id)

    const [userInfo, setUserInfo] = useState()
    const [posts, setPosts] = useState([]);
    const [artPosts, setArtPosts] = useState([]);

    function getUserInfo(){
        axios.get(`${API_URL}/user`)
        .then((response) => {
            console.log("user info ", response)
            /* setUser(response.data.user) */
        })
    }

    function getAllPosts() {
        axios.get(`${API_URL}/api/home`)
            .then((response) => {
                
                setPosts(response.data.posts)
                setArtPosts(response.data.artPosts)
                /* setIsLoading(false); */
            })
            .catch(error => {
                console.log(error)
              /*   setIsLoading(false); */
            });
    }
    
    useEffect(() => {
        getAllPosts();
        getUserInfo()
    }, []); 

  return (
    <div>
<div className='userPage-grid'>
    <div className='userPage-info'> {/* div for user information and options to do */}
        <img src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg"/>
        <p>{user?.username}</p>
        <p>{user?.fullname}</p>
        <p>{user?.email}</p>
        <p>change name?</p>
        <p>favorite posts</p>
        <button>Delete Account</button>
    </div>

    <div className='userPage-posts'> {/* div for displaying posts created by user */}
    <h1>Posts</h1>
        {posts.map((post) => {
            return(
         post.author === user._id &&   
                <div key={post._id}>
                    <h2>{post.content}</h2>
                    <h5>{post.place}</h5>
                    <img src={post.post_image}/>
                    
                </div>
            )
        })}
    </div>

    <div className='userPage-artposts'> {/* div for displaying artposts created by user */}
       <h1>Artposts</h1>
       {artPosts.map((artpost) => {
            return(
                artpost.author === user._id &&
                <div key={artpost._id}>

                    <h2>{artpost.title}</h2>
                    <h5>{artpost.description}</h5>
                    <img src={artpost.art_image}/>
                    <p>{artpost.medium}</p>
                    <p>{artpost.year}</p>

                </div>
            )
        })}
    </div>
</div>

    </div>
  )
}

export default UserPage