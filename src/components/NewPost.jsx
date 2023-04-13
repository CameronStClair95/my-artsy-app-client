import React, { useState, useEffect, useContext } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../context/Auth.context';

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function NewPost() {

    const [postForm, setPostForm] = useState(true)

    const [content, setContent] = useState("")
    const [place, setPlace] = useState("")
    const [post_image, setPost_image] = useState("")
    
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()

    const {user} = useContext(AuthContext)

    function togglePostForms(){
        setPostForm()
      }

    const handleContent = (e) => setContent(e.target.value)
    const handlePlace = (e) => setPlace(e.target.value)
    const handlePost_image = (e) => setPost_image(e.target.value)

    const handlePostSubmit = (e) => {
        e.preventDefault()
        const requestBody = {content, place, post_image, author:user._id}
        axios.post(`${API_URL}/api/posts`, requestBody)
            .then(response => navigate("/home"))

            .catch((error) => {
                const errorDescription = error.response.data.errorMessage
                setErrorMessage(errorDescription) 
            })
    }

    const uploadImage = (file) => {
        return axios.post(`${API_URL}/api/posts/upload`, file)
        .then(res => res.data)

        .catch(error => console.log("error while uploading image", error))
    }

    const handleFileUpload = (e) => {
        const uploadData = new FormData()

        uploadData.append("imageUrl", e.target.files[0])

        uploadImage(uploadData)
        .then((response) => {
            setPost_image(response.fileUrl)
            console.log("this is the link for the image", response.fileUrl)
        })

        .catch(err => console.log("Error while uploading the file: ", err));
    }


  return (
    <div>
        <h1>"Post" post submit form</h1>
        <Link to="/home"><button>Go Back</button></Link>
        {postForm && <Link to="/new-post/artpost"><button>Create Artpost</button></Link>}

        <form onSubmit={handlePostSubmit}>

            <label>
            What?
                <input type="text" name="content" value={content} onChange={handleContent}/>
            </label>

            <label>
            Where?
                <input type="text" name="place" value={place} onChange={handlePlace}/>
            </label>

            <label>
            Show it
                <input type="file" name="post_image"  onChange={(e) => handleFileUpload(e)}/>
            </label>

        <button type="submit">Submit</button>
        </form>

        
    </div>
  )
}

export default NewPost