import React from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function PostCard({ content, place, post_image, postId }) {
  const API_URL = "http://localhost:5005";
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log(`Deleting post with id ${postId}`);

    axios
      .delete(`${API_URL}/api/posts/${postId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data);
        navigate("/home"); // Navigate to the home page after successful deletion
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={post_image} />
        <Card.Body>
          {/* <Card.Title>{content}</Card.Title> */}
          <Card.Text>{content}</Card.Text>
          <Link to={`/post/${postId}`}>
            <Button variant="primary">Post Details</Button>
          </Link>
          <Link to={`/post/${postId}/update`}>
            <Button variant="warning" className="mx-2">
              Update Post
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostCard;
