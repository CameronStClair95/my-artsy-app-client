import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArtPostCard({ artpostId }) {
  const [artpost, setArtpost] = useState(null);
  const API_URL = 'http://localhost:5005';
  /* console.log(artpostId); */

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => {
        setArtpost(response.data);
      })
      .catch((error) => {
        console.log('Error fetching artpost:', error);
      });
  }, [artpostId]);

  if (!artpost) {
    return <div>Loading...</div>;
  }

  const { artist, title, description, medium, year, dimensions, art_image, author } = artpost;

  return (
    <Link className='artpost_card_link'>

      <div className="artpost_card">
        <div>
          <img className="art-image" src={art_image} alt={`${title} by ${artist}`} />
        </div>
        <div>
          <h3>{title}</h3>
          <h5>
            {artist}, {year}
          </h5>
          <h6>{medium}</h6>
          {author && <p>added by {author}</p>}
        
        </div>
      </div>
    </Link>
  );
}

export default ArtPostCard;

