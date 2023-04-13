import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context";
import artpostCSS from "./artpost.module.css"
import { Button, Form } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function NewArtpost() {
  const { user } = useContext(AuthContext);

  const [postForm, setPostForm] = useState(true);

  const [artist, SetArtist] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [art_image, setArt_image] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  function togglePostForms() {
    setPostForm();
  }
/* created staging 2 */
  const handleArtist = (e) => SetArtist(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleMedium = (e) => setMedium(e.target.value);
  const handleYear = (e) => setYear(e.target.value);
  const handleArt_image = (e) => setArt_image(e.target.value);

  const handleArtpostSubmit = (e) => {
    e.preventDefault();
    const requestBody = {artist, title, description, medium, year, art_image, author: user._id};
    axios.post(`${API_URL}/api/posts/artpost`, requestBody)
      .then(() => navigate("/home"))
      .catch((error) => console.error(error)
      );
  };
  const uploadImage = (file) => {
    return axios.post(`${API_URL}/api/posts/upload`, file)
      .then((res) => res.data)

      .catch((error) => console.error("error while uploading image: ", error));
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
        console.log("this is the link for the image", response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div>
      
        <div>

        

     

      <Form className={artpostCSS.newartpost_form} onSubmit={handleArtpostSubmit}>
      <h2>Let's create a new Artpost! </h2>

        <Form.Group controlId="formArtist">
          <Form.Label>Artist
          <Form.Control type="text" placeholder="Artist's name" value={artist} onChange={handleArtist}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formTitle">
          <Form.Label>Title
          <Form.Control type="text" placeholder="Title of the artpiece" value={title} onChange={handleTitle}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description
          <Form.Control type="text" placeholder="Artpiece Description" value={description} onChange={handleDescription}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formMedium">
          <Form.Label>Medium
          <Form.Control type="text" placeholder="Medium" value={medium} onChange={handleMedium}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formYear">
          <Form.Label>Year
          <Form.Control type="number" placeholder="Year" value={year} onChange={handleYear}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image
          <Form.Control type="file" onChange={(e) => handleFileUpload(e)}/>
          </Form.Label>
        </Form.Group>

        {!art_image ? (
          <Button type="submit" disabled style={{marginTop:"10px"}}>Submit</Button>
        ): (
          <Button type="submit" style={{marginTop:"10px"}}>Submit</Button>
        )}

        <div className={artpostCSS.button_group}>
        <Link to="/home"><Button size="sm" variant="secondary">Go Back</Button></Link>
      {postForm && (
        <Link to="/posts/post">
        <Button size="sm" variant="secondary">Create post</Button>
        </Link>
      )}
      </div>

      </Form>

      </div>
    </div>
  );
}

export default NewArtpost;
