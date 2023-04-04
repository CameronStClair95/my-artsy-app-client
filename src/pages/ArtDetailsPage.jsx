import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArtPostDetails() {
  const { artpostId } = useParams();
  console.log("ArtPostDetails artpostId:", artpostId);
  const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;
const [artpost, setArtPost] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => {
        console.log(response.data);
        setArtPost(response.data);
      })
      .catch((error) => console.log(error));
  }, [artpostId]);

  return (
    <div>
      {artpost ? (
        <div>
          <h2>Art Details:</h2>
          <div>
            <img src={artpost.art_image} alt={artpost.title} />
            <h3>Title: {artpost.title}</h3>
            <h4>Artist: {artpost.artist}</h4>
            {artpost.description && <p>Description: {artpost.description}</p>}
            {artpost.medium && <p>Medium: {artpost.medium}</p>}
            {artpost.year && <p>Year: {artpost.year}</p>}
            {artpost.dimensions && <p>Dimensions: {artpost.dimensions}</p>}
          </div>
        </div>
      ) : (
        <p>Loading art details...</p>
      )}
    </div>
  );
}

export default ArtPostDetails;
