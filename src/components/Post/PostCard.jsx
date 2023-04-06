import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import PostCSS from "./Post.module.css"

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function PostCard({content, place, post_image, postId, getAllPosts, likedBy, author}) {
  const [post, setPost] = useState(null);
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);

  /* const [userInfo, setUserInfo] = useState(); */

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/post/${postId}`)
      .then((response) => {
        const updatedPost = {...response.data}
        console.log(response.data)
        setPost(updatedPost)
      })
      .catch((error) => console.log(error));
  }, [postId]);

  function handleLike() {
    console.log("handle like");
    axios.post(`${API_URL}/api/posts/like/${postId}/post`, user)
      .then((response) => {
        setPost(response.data)
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }

  if (!post) {
    <div>Loading...</div>;
  }

  const handleDelete = () => {
    console.log(`Deleting post with id ${postId}`);
    axios
      .delete(`${API_URL}/api/posts/${postId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data);
        /* getAllPosts(); */
        navigate("/home"); // Navigate to the home page after successful deletion
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return (
    <div className={PostCSS.post_card}>
    {author && (<p style={{ fontSize: "small"}}>{author.username}</p>)}
      <div>
        <img className={PostCSS.post_image} src={post_image}/>
      </div>

      <div className={PostCSS.post_content}>
        <h5>{content}</h5>
        <p>{place}</p>
      </div>

      {pathname === "/home" ? (
        <Link to={`/post/${postId}`} className="post_card_link">
          <Button>
            <ReadMoreIcon /> More{" "}
          </Button>
        </Link>
      ) : (
        <>
          <Button> Update <EditIcon/></Button>
          
          <Button variant="danger" onClick={handleDelete}>
            Delete <DeleteOutlineIcon />
          </Button>
        </>
      )}

      <button
        onClick={handleLike}
        style={{ background: "transparent", border: "none" }}
      >
        {!post?.likedBy.includes(user._id) ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon />
        )}
      </button>
      
    </div>
  );
}

export default PostCard;

/* 
{author === user?._id && 
          <>
          <Button>Update<EditIcon/></Button>
          <Button onClick={handleDelete}>Delete <DeleteOutlineIcon/></Button>
          </>
        }
*/
