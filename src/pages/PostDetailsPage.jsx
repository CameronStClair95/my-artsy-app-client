import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5005/api/new-post/posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setPost(data.post);
      })
      .catch(error => console.log(error));
  }, [postId]);


  return (
    <div>
      {post ? (
        <div>
          <h2> Posts:</h2>
          <div>
              <PostCard
                key={post._id}
                content={post.content}
                place={post.place}
                post_image={post.post_image}
                postId={post._id}
              />
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetailsPage;
