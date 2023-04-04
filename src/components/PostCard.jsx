import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/Auth.context';

import EmptyLike from "../images/like-empty.png"
import FullLike from "../images/like-full.png"

function PostCard({ content, place, post_image, postId, getAllPosts, likedBy, author }) {
  const [post, setPost] = useState(null)

  const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const {pathname} = useLocation()

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => console.log(error))
  }, [postId])

  function handleLike(){
    console.log('handle like')
    axios.post(`${API_URL}/api/posts/like/${postId}/post`, user)
      .then(response => setPost(response.data))
      .catch(error => console.log(error))
  }

  if (!post) { <div>Loading...</div>}

  const handleDelete = () => {
    console.log(`Deleting post with id ${postId}`)
    axios
      .delete(`${API_URL}/api/posts/${postId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data);
        getAllPosts()
        navigate("/home"); // Navigate to the home page after successful deletion
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return (
    <div className='post_card'>
      <div>
        <img className='post-image' src={post_image} alt={"photo from the event"}/>
      </div>

      <div>
        <h5>{content}</h5>
        <p>{place}</p>
        {author && <p>added by <b>{user?.username}</b></p>}

      </div>

      {pathname === "/home" ? 
        <Link to={`/post/${postId}`} className='post_card_link'>
          <Button>Details</Button>
        </Link> : (
        <>
        <Button>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
        </>)}

        <img 
          style={{width:"50px", height:"50px"}}
          onClick={handleLike}
          src={!post?.likedBy.includes(user._id) ? EmptyLike : FullLike}
        />
  </div>
    
  );
}

export default PostCard;