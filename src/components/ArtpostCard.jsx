import React from 'react';
import { Link } from 'react-router-dom';

function ArtPostCard({ artpost }) {
  if (!artpost) {
    return <div>Loading...</div>;
  }

  const { artist, title, description, medium, year, dimensions, art_image, author } = artpost;
  const artpostId = artpost._id; // Get the artpostId from the artpost object

  return (
    <Link to={`/artposts/${artpostId}`} className='artpost_card_link'>
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
