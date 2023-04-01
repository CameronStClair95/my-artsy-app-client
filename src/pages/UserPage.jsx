import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"


import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { Button, Form, Modal } from 'react-bootstrap'
import DeleteConfirmation from '../components/DeleteConfirmation'

const API_URL = "http://localhost:5005"


function UserPage(props) {
    const {userId} = useParams()
    // to check the logged in account
    const {user, authenticateUser, removeToken} = useContext(AuthContext)
    
    //for updating the profile information
    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userInfo, setUserInfo] = useState()
    const [posts, setPosts] = useState([]);
    const [artPosts, setArtPosts] = useState([]);
    const [formUpdate, setFormUpdate] = useState(false)
    const [formDelete, setFormDelete] = useState(false)

    const handleName = (e) => setFullName(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    
    
    function getUserInfo(){
        axios.get(`${API_URL}/api/user/${userId}`)
        .then((response) => {
            //for catching user info to display
            setUserInfo(response.data)
            //for the updating the user information
            setFullName(response.data.fullname)
            setUsername(response.data.username)
            console.log("user info: ", response.data)
        })
        .catch(error => {
            console.log(error)
        });
    }
    axios.delete("/delete")

    function getAllPosts() {
        axios.get(`${API_URL}/api/home`)
            .then((response) => {
                setPosts(response.data.posts)
                setArtPosts(response.data.artPosts)
            })
            .catch(error => {
                console.log(error)
            });
    }

    function handleUpdateSubmit(e){
        e.preventDefault()
        const requestBody = {fullname, username}
        axios.put(`${API_URL}/api/user/${userId}`, requestBody)
        .then((response) => {
            console.log(response.data)
                removeToken()   
                console.log("new token is ", response.data.authToken)
                localStorage.setItem("authToken", response.data.authToken);
                authenticateUser();
            })
        .then(() => {
            getUserInfo()
        })
        .then(() => setFormUpdate(false))
                
            
            .catch(error => console.log(error))
    }
    
    useEffect(() => {
        getAllPosts();
        getUserInfo()
    }, []); 

  return (
    <div>
        <div className='userPage-grid'>
            <div className='userPage-info'> 
                <div>

                {/*  <img src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg"/> */}
                    <p>@{userInfo?.username}</p>
                    <p>{userInfo?.fullname}</p>
                    <p>{userInfo?.email}</p>
                    
                    

                    {userId === user?._id && (
                        <div>

                        <Button variant="info">favorite posts</Button>
                        
                        </div>


                    )

                        
                    }
                    <br></br>
                    <br></br>
                    {userId === user?._id &&
                        <Button onClick={() => setFormDelete(true)}>go to modal</Button>
                    }

                    

                    {userId === user?._id && 
                        <Button variant="warning" onClick={() => setFormUpdate(!formUpdate)}>
                            {formUpdate ? "Hide Form" : "Edit Account"}
                        </Button>}

                    {userId === user?._id && 
                        <Button variant="danger" onClick={() => setFormDelete(!formDelete)}>
                            Delete Account
                        </Button>}
                </div>
            <div>

            {formUpdate && 
                <Form onSubmit={handleUpdateSubmit}>
                <Button onClick={() => setFormUpdate(false)}>Go Back</Button>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text"  value={username} onChange={handleUsername}/>
                    </Form.Group>

                    <Form.Group controlId="formFullname">
                        <Form.Label>Fullname:</Form.Label>
                        <Form.Control type="text"  value={fullname} onChange={handleName}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Update</Button>
                </Form>
                }
            </div>

                {/* <div>
                    {formDelete && <DeleteConfirmation/>}
                </div> */}
            </div>

            <div className='userPage-posts'> 
            <h1>Posts</h1>
                {posts.map((post) => {
                    return(
                post.author === userInfo?._id &&   
                        <div key={post._id}>
                            <h2>{post.content}</h2>
                            <h5>{post.place}</h5>
                            <img src={post.post_image}/>
                            <p>@{user.username}</p>
                            
                        </div>
                    )
                })}
            </div>

            <div className='userPage-artposts'> 
            <h1>Artposts</h1>
            {artPosts.map((artpost) => {
                    return(
                        artpost.author === userInfo?._id &&
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