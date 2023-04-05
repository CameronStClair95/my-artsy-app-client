import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function UpdatePostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [post_image, setPost_image] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/posts/${postId}`)
      .then((response) => {
        const post = response.data.post;
        setContent(post.content);
        setPlace(post.place);
        setPost_image(post.post_image);
      })
      .catch((error) => console.log(error));
  }, [postId]);

  const handleContentChange = (e) => setContent(e.target.value);
  const handlePlaceChange = (e) => setPlace(e.target.value);
  const handlePostImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPost_image(e.target.files[0]);
    }
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("content", content);
    formData.append("place", place);
    formData.append("post_image", post_image);
  
    axios
      .put(`${API_URL}/api/posts/${postId}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/post/${postId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Content:
          <input type="text" placeholder={content} value={content} onChange={handleContentChange} />
        </label>
        <label>
          Place:
          <input type="text" value={place} onChange={handlePlaceChange} />
        </label>
        <label>
          Post Image:
          <input type="file" ref={fileInputRef} onChange={handlePostImageChange} />

        </label>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default UpdatePostDetails;
