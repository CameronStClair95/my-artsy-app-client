import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import ArtpostCSS from "./artpost.module.css"

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
/* trying to fix this */
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function ArtPostCard({ artist, title, description, medium, year, art_image, author, artpostId  }) {
  const [artpost, setArtpost] = useState(null);

  const API_URL = "http://localhost:5005";

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => setArtpost(response.data))
      .catch((error) => {
        console.log("Error fetching artpost:", error);
      });
  }, [artpostId]);

  function handleLike() {
    console.log("handle like");
    axios.post(`${API_URL}/api/posts/like/${artpostId}/art`, user)
      .then((response) => {
        setArtpost(response.data)
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }

  if (!artpost) {
    return <div>Loading...</div>;
  }

  /* const { artist, title, description, medium, year, art_image, author } = artpost; */
  /* const artpostId = artpost._id; // Get the artpostId from the artpost object */

  return (
    <div className={ArtpostCSS.artpost_card}>
      
        <div className="artpost_image">
          <img
            className={ArtpostCSS.art_image}
            src={art_image}
            alt={`${title} by ${artist}`}
          />
        </div>

        <div className={ArtpostCSS.artpost_content}>
          <h3>{title}</h3>
          <h5>
            {artist}, {year}
          </h5>
          <h6>{medium}</h6>

          {author && (<p style={{ fontSize: "small" }}> added by {author.username}</p>)}
        </div>
      
            
      <button
        onClick={handleLike}
        style={{ background: "transparent", border: "none" }}
      >
        {!artpost?.likedBy.includes(user._id) ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon />
        )}

        {/* {artpost?.likedBy.includes(user._id) ? (
          <FavoriteIcon /> ) : (
          <FavoriteBorderIcon />
          )
        } */}
      </button>
    </div>
  );
}

export default ArtPostCard;

