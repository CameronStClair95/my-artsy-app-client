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

function PostCard({ content, place, post_image, postId, getAllPosts, likedBy, author }) {
  const [post, setPost] = useState(null);
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedPlace, setUpdatedPlace] = useState(place);
  const [updatedPostImage, setUpdatedPostImage] = useState(post_image);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleContentChange = (e) => setUpdatedContent(e.target.value);
  const handlePlaceChange = (e) => setUpdatedPlace(e.target.value);
  const handlePostImageChange = (e) => setUpdatedPostImage(e.target.value);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/api/posts/${postId}`, {
      content: updatedContent,
      place: updatedPlace,
      post_image: updatedPostImage
    })
    .then((response) => {
      console.log("Post updated successfully:", response.data);
      setPost(response.data);
      setShowUpdateForm(false);
    })
    .catch((error) => {
      console.error("Error updating post:", error);
    });
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("An error occurred trying to set info", error));
  }, [postId]);

  function handleLike() {
    axios.post(`${API_URL}/api/posts/like/${postId}/post`, user)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error(error));
  }

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

  const confirmDelete = () => {
    handleDelete();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className={PostCSS.post_card}>
      {author && (<p style={{ fontSize: "small"}}>{author.username}</p>)}
      <div>
        <img className={PostCSS.post_image} src={post_image}/>
      </div>

      <div className={PostCSS.post_content}>
        <h5>{content}</h5>
        <p>📌 {place}</p>
      </div>

      {pathname === "/home" ? (
        <Link to={`/posts/posts/${postId}`} className="post_card_link">
          <Button><ReadMoreIcon/> More</Button>
          </Link>
      ) : (
        <>
        { user?._id === author?._id &&
          <>
          <Button onClick={() => setShowUpdateForm(true)}>Update<EditIcon/></Button>
          <Button variant="danger" onClick={() => setShowDeleteConfirmation(true)}>Delete <DeleteOutlineIcon/></Button>
          </>
        }
        </>
      )}

      <button onClick={handleLike} style={{ background: "transparent", border: "none" }} >
        {!post?.likedBy?.includes(user._id) ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon />
        )}
      </button>

      <Modal
        show={showUpdateForm}
        onHide={() => setShowUpdateForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formContent">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                type="text"
                value={updatedContent}
                onChange={handleContentChange}
              />
            </Form.Group>

            <Form.Group controlId="formPlace">
              <Form.Label>Place:</Form.Label>
              <Form.Control
                type="text"
                value={updatedPlace}
                onChange={handlePlaceChange}
              />
            </Form.Group>

            <Form.Group controlId="formPostImage">
              <Form.Label>Post Image URL:</Form.Label>
              <Form.Control
                type="text"
                value={updatedPostImage}
                onChange={handlePostImageChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
