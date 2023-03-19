import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"

function NewPost() {

    const [content, setContent] = useState("")
    const [place, setPlace] = useState("")
    const [post_image, setPost_image] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined);


    const navigate = useNavigate()

    const handleContent = (e) => setContent(e.target.value)
    const handlePlace = (e) => setPlace(e.target.value)
    const handlePost_image = (e) => setPost_image(e.target.value)

    const handlePostSubmit = (e) => {
        e.preventDefault()
        const requestBody = {content, place, post_image}
        axios.post(/* put the right link here */ requestBody)
            .then(response => navigate("/home"))
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage
                setErrorMessage(errorDescription) 
            })
    }


  return (
    <div>
        <h1>"Post" post submit form</h1>

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
                <input type="text" name="post_image" value={post_image} onChange={post_image}/>
            </label>
        </form>

        <button type="submit"> Submit</button>
        
    </div>
  )
}

export default NewPost