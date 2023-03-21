import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"

const API_URL = "http://localhost:5005"


function NewArtpost() {

    const [artist, SetArtist] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [medium, setMedium] = useState("")
    const [year, setYear] = useState("")
    const [dimensionHeight, setDimensionHeight] = useState("")
    const [dimensionWidth, setDimensionWidth] = useState("")
    const [art_image, setArt_image] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined);


    const navigate = useNavigate

    const handleArtist = (e) => SetArtist(e.target.value)
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleMedium = (e) => setMedium(e.target.value)
    const handleYear = (e) => setYear(e.target.value)
    const handleDimensionHeight = (e) => setDimensionHeight(e.target.value)
    const handleDimensionWidth = (e) => setDimensionWidth(e.target.value)
    const handleArt_image = (e) => setArt_image(e.target.value)

    const handleArtpostSubmit = (e) => {
        e.preventDefault()
        const requestBody = {artist, title, description, medium, year, dimensionHeight, dimensionWidth, art_image}
        axios.post(`${API_URL}/api/new-post/artpost`, [requestBody])
            .then(response => navigate("/home"))
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

  return (
    <div>
    <h1>Art Post submit form</h1>

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
            <input type="number" placeholder='Height' name="dimensionHeight" value={dimensionHeight} onChange={handleDimensionHeight}/>
            X
            <input type="number" placeholder='Width' name="dimensionWidth" value={dimensionWidth} onChange={handleDimensionWidth}/>
        </label>

        <label>
        Image
            <input type="text" name='art_image' value={art_image} onChange={handleArt_image}/>
        </label>

    <button type="submit"> Submit</button>
    </form>

    
    </div>
  )
}

export default NewArtpost