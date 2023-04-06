import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/Post/PostCard";

function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [post_image, setPost_image] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/posts/posts/${postId}`)
      .then((response) => {
        console.log(response.data.post);
        setPost(response.data.post);
        setContent(response.data.post.content);
        setPlace(response.data.post.place);
        setPost_image(response.data.post.post_image);
      })
      .catch((error) => console.log(error));
  }, [postId]);

  return (
    <div>
      {post ? (
        <div>
          <div>
            <PostCard key={post._id} content={content} place={place} post_image={post_image} author={post.author} postId={post._id}/>
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetailsPage;
