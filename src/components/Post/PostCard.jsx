import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import PostCSS from "./Post.module.css";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function PostCard({ content, place, post_image, postId, getAllPosts, author }) {

  const [post, setPost] = useState(null);
  const [likedBy, setLikedBy] = useState(null)
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedPlace, setUpdatedPlace] = useState(place);
  const [updatedPostImage, setUpdatedPostImage] = useState(post_image);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleContentChange = (e) => setUpdatedContent(e.target.value);
  const handlePlaceChange = (e) => setUpdatedPlace(e.target.value);
  const handlePostImageChange = (e) => { setUpdatedPostImage(e.target.files[0]) };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", updatedContent);
    formData.append("place", updatedPlace);
    {updatedPostImage && formData.append("post_image", updatedPostImage)}

    axios.put(`${API_URL}/api/posts//${postId}/update`, formData, {headers: {"Content-Type": "multipart/form-data",}})
      .then((response) => {
        setUpdatedContent(response.data)
        setUpdatedPlace(response.data)
      })
      .then(() => getPosts())
      .then(() => setShowEditForm(false))
      .catch((error) => {console.error("Error updating post:", error)});
  };

  function getPosts() {
    axios.get(`${API_URL}/api/posts/posts/${postId}`)
      .then((response) => {
        /* console.log(response.data.post) */
        setPost(response.data)
        setLikedBy(response.data.post.likedBy)
        /* console.log("liked by is", response.data.post.likedBy) */
      })
      .catch((error) => console.error("an error trying to set info", error));
  }

  function handleLike() {
    axios.post(`${API_URL}/api/posts/like/${postId}/post`, user)
      .then((response) => {
        console.log("this is the response for the post like ", response.data)
        setPost(response.data)
        getPosts()
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getPosts()
  }, [postId]);

  const handleDelete = () => {
    console.log(`Deleting post with id ${postId}`);
    axios.delete(`${API_URL}/api/posts/${postId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data);
        navigate("/home"); // Navigate to the home page after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className={PostCSS.post_card}>

      <div className={PostCSS.update_form_outside}>
        {showEditForm && (
          <div className={PostCSS.update_form}>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formContent">
                <Form.Label>Content:</Form.Label>
                <Form.Control type="text" value={updatedContent} onChange={handleContentChange} />
              </Form.Group>

              <Form.Group controlId="formPlace">
                <Form.Label>Place:</Form.Label>
                <Form.Control type="text" value={updatedPlace} onChange={handlePlaceChange} />
              </Form.Group>

              <Form.Group controlId="formPostImage">
                <Form.Label>Post Image:</Form.Label>

                <Form.Control type="file" onChange={handlePostImageChange} /></Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        )}
      </div>

      <div className={PostCSS.post_card_content}>
      {author && (<p style={{ fontSize: "small" }}>{author.username}</p>)}
      <div>
        <img className={PostCSS.post_image} src={post_image} />
      </div>

      <div className={PostCSS.post_content}>
        <h5>{content}</h5>
        <p>📌 {place}</p>
      </div>

      {pathname === "/home" ? (
        <Link to={`/posts/posts/${postId}`} className="post_card_link">
          <Button><ReadMoreIcon /> More</Button>
        </Link>
      ) : (
        <>
          {user?._id === author?._id &&
            <>
              <Button onClick={() => setShowEditForm(!showEditForm)}>
                {showEditForm ? "Hide Form" : "Edit"} <EditIcon/>
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteConfirmation(true)}>Delete <DeleteOutlineIcon /></Button>
            </>
          }
        </>
      )}

      <button onClick={handleLike} style={{ background: "transparent", border: "none" }} >
        {

          !likedBy?.includes(user._id) ? (
            <FavoriteBorderIcon />
          ) : (
            <FavoriteIcon />
          )}
      </button>
    </div>


      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}

export default PostCard;

