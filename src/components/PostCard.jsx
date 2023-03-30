import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function PostCard({ content, place, post_image, postId }) {
  const handleDelete = () => {
    console.log(`Deleting post with id ${postId}`);
    // add code here to make a DELETE request to delete the post from the server
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
          <Link to={`/api/new-post/posts/${postId}`}>
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
