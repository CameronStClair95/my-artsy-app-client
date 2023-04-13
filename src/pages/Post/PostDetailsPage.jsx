import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/Post/PostCard";
import Comment from "../../components/Comment";

import PostCSS from "../../components/Post/Post.module.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [post_image, setPost_image] = useState("");

  function getInfo(){
    axios.get(`${API_URL}/api/posts/posts/${postId}`)
    .then((response) => {
      console.log(response.data.post);
      setPost(response.data.post);
      setContent(response.data.post.content);
      setPlace(response.data.post.place);
      setPost_image(response.data.post.post_image);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getInfo()
  }, [postId]);

  return (
    <div >
      {post ? (
        <div className={PostCSS.post_details_div}>
          <div className={PostCSS.post_and_comment}>
            <div>
              <PostCard key={post._id} content={content} getInfo={getInfo} place={place} post_image={post_image} author={post.author} postId={post._id} />
            </div>

            <Comment />
          </div>
        </div>

      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetailsPage;
