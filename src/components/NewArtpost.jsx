import React, { useState, useEffect, useContext } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../context/Auth.context';



const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function NewArtpost() {

    const {user} = useContext(AuthContext)

    const [postForm, setPostForm] = useState(true)

    const [artist, SetArtist] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [medium, setMedium] = useState("")
    const [year, setYear] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [art_image, setArt_image] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()

    function togglePostForms(){
        setPostForm()
      }

    const handleArtist = (e) => SetArtist(e.target.value)
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleMedium = (e) => setMedium(e.target.value)
    const handleYear = (e) => setYear(e.target.value)
    const handleDimensions = (e) => setDimensions(e.target.value)
    /* const handleDimensionWidth = (e) => setDimensionWidth(e.target.value) */
    const handleArt_image = (e) => setArt_image(e.target.value)

    const handleArtpostSubmit = (e) => {
        e.preventDefault()
        const requestBody = {artist, title, description, medium, year, dimensions, art_image, author:user._id}
        axios.post(`${API_URL}/api/new-post/artpost`, requestBody)
            .then(response => navigate("/home"))
            
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage
                setErrorMessage("this is an error you have", errorDescription)
            })
    }
    const uploadImage = (file) => {
        return axios.post(`${API_URL}/api/new-post/upload`, file)
          .then(res => res.data)

          .catch(error => console.log("error while uploading image: ", error))
      };

      const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);

          uploadImage(uploadData)
          .then((response) => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setArt_image(response.fileUrl);
            console.log("this is the link for the image", response.fileUrl)
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

  return (
    <div>
    <h1>Art Post submit form</h1>
    <Link to="/home"><button>Go Back</button></Link>
    {postForm && <Link to="/new-post/post"><button>Create Post</button></Link>}

    <form onSubmit={handleArtpostSubmit}>

        <label>
        Artist:
            <input type="text" name="artist" value={artist} onChange={handleArtist}/>
        </label>

        <label>
        Title:
            <input type="text" name="title" value={title} onChange={handleTitle}/>
        </label>        

        <label>
        Description:
            <input type="text" name="description" value={description} onChange={handleDescription}/>
        </label>

        <label>
        Medium
            <input type="text" name="medium" value={medium} onChange={handleMedium}/>
        </label>

        <label>
        Year
            <input type="number" name="year" value={year} onChange={handleYear}/>
        </label>

        <label>
        Dimension
            <input type="number" name="dimensions" value={dimensions} onChange={handleDimensions}/>
        </label>

        <label>
        Image
            {/* file upload with cloudinary */}
            <input type="file" name='art_image'  onChange={ (e) => handleFileUpload(e)}/>

            {/* file upload with no cloudinary */}
            {/* <input type="file" name='art_image' value={art_image} onChange={handleArt_image}/> */}
        </label>

    <button type="submit"> Submit</button>
    </form>

    
    </div>
  )
}

export default NewArtpost