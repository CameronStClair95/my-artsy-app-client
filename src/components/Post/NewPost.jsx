import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context";
import postCSS from "./Post.module.css"
import { Button, Form } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function NewPost() {
  const [postForm, setPostForm] = useState(true);

  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [post_image, setPost_image] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  function togglePostForms() {
    setPostForm();
  }

  const handleContent = (e) => setContent(e.target.value);
  const handlePlace = (e) => setPlace(e.target.value);
  const handlePost_image = (e) => setPost_image(e.target.value);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const requestBody = { content, place, post_image, author: user._id };
    axios.post(`${API_URL}/api/posts`, requestBody)
      .then(() => navigate("/home"))
      .catch((error) => { console.error(error)});
  };

  const uploadImage = (file) => {
    return axios.post(`${API_URL}/api/posts/upload`, file)
      .then((res) => res.data)
      .catch((error) => console.error("error while uploading image", error));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setPost_image(response.fileUrl);
        console.log("this is the link for the image", response.fileUrl);
      })

      .catch((err) => console.error("Error while uploading the file: ", err));
  };

  return (
    <div>
      

      <Form className={postCSS.newpost_form} onSubmit={handlePostSubmit}>
      <h2>Tell us about your latest experience! Write us a Post.</h2>

        <Form.Group controlId="formContent">
          <Form.Label>Comment
          <Form.Control type="text"  value={content} onChange={handleContent}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formPlace">
          <Form.Label>Place
          <Form.Control type="text"  value={place} onChange={handlePlace}/>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image
          <Form.Control type="file" onChange={(e) => handleFileUpload(e)}/>
          </Form.Label>
        </Form.Group>

        {!post_image ? (
          <Button type="submit" disabled style={{marginTop:"10px"}}>Submit</Button>
        ): (
          <Button type="submit" style={{marginTop:"10px"}}>Submit</Button>
        )}

        <div className={postCSS.button_group}>
        <Link to="/home"><Button size="sm" variant="secondary">Go Back</Button></Link>
      
      {postForm && (
        <Link to="/posts/artpost"><Button size="sm" variant="secondary">Create Artpost</Button></Link>
      )}
      </div>
      
      </Form>
      

     {/*  <form className={postCSS.post_form} onSubmit={handlePostSubmit}>
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
          <input type="file" name="post_image" onChange={(e) => handleFileUpload(e)}/>
        </label>

        <Button type="submit" style={{marginTop:"10px"}}>Submit</Button>
      <div className={postCSS.button_group}>
        <Link to="/home"><Button size="sm" variant="secondary">Go Back</Button></Link>
      
      {postForm && (
        <Link to="/posts/artpost"><Button size="sm" variant="secondary">Create Artpost</Button></Link>
      )}
      </div>
      </form> */}
    </div>
  );
}

export default NewPost;
