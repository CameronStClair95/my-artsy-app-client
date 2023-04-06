import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import ArtpostCSS from "./artpost.module.css"
import { Button } from "react-bootstrap";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function ArtPostCard({ artist, title, description, medium, year, art_image, author, artpostId  }) {
  const [artpost, setArtpost] = useState(null);
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    axios.get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => {
        setArtpost(response.data)
        /* console.log("user is", user._id)
        console.log("artpost author", artpost.author)
        console.log("author ID", author) */
      })
      .catch((error) => {
        console.log("Error fetching artpost:", error);
      });
  }, [artpostId]);

  function handleLike() {
    console.log("handle like");
    axios.post(`${API_URL}/api/posts/like/${artpostId}/art`, user)
      .then((response) => {
        setArtpost(response.data)
        console.log(response.data.artist)
      })
      .catch((error) => console.log(error));
  }

  

  const handleDelete = () => {
    console.log(`Deleting post with id ${artpostId}`);
    axios.delete(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data);
        /* getAllPosts(); */
        navigate("/home"); // Navigate to the home page after successful deletion
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  if (!artpost) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ArtpostCSS.artpost_card}>
      
        <div className={ArtpostCSS.art_image_div}>
          <img className={ArtpostCSS.art_image}
            src={art_image} alt={`${title} by ${artist}`}
          />
        </div>

        <div className={ArtpostCSS.artpost_content}>
          <h3>{title}</h3>
          <h5>
            {artist}, {year}
          </h5>
          <h6>{medium}</h6>

          {author && (<p style={{ fontSize: "small" }}> added by {author?.username}</p>)}
        </div>

        {pathname === "/home" ? (
        <Link to={`/posts/artposts/${artpostId}`} 
              className="post_card_link">
          <Button>
            <ReadMoreIcon/> More
          </Button>
        </Link>
      ) : (
        <>
        {user?._id === author ?
        <>
          <Button> Update <EditIcon/></Button>
          
          <Button variant="danger" onClick={handleDelete}>
            Delete <DeleteOutlineIcon />
          </Button>

        </> : <p>you have no authorization</p>
        }
        </>
      )}
      
            
      <button onClick={handleLike} style={{ background: "transparent", border: "none" }}>
        {!artpost?.likedBy.includes(user._id) ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon />
        )}
      </button>
    </div>
  );
}

export default ArtPostCard;

