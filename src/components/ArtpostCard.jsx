import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

import EmptyLike from "../images/like-empty.png"
import FullLike from "../images/like-full.png"

function ArtPostCard({artpostId}) {
  const [artpost, setArtpost] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;  
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then(response => setArtpost(response.data))
      .catch(error => {console.log('Error fetching artpost:', error)});
  }, [artpostId]);

  

  function handleLike(){
    console.log('handle like')
    axios.post(`${API_URL}/api/posts/like/${artpostId}/art`, user)
    .then(response => setArtpost(response.data))
    .catch(error => console.log(error))
  }

  if (!artpost) {
    return <div>Loading...</div>;
  }

  const { artist, title, description, medium, year, dimensions, art_image, author } = artpost;
  /* const artpostId = artpost._id; // Get the artpostId from the artpost object */

  return (
      <div className="artpost_card">
    <Link to={`/artposts/${artpostId}`} className='artpost_card_link'>
        <div>
          <img className="art-image" src={art_image} alt={`${title} by ${artist}`} />
        </div>
        <div>
          <h3>{title}</h3>
          <h5>
            {artist}, {year}
          </h5>
          <h6>{medium}</h6>
          {author && <p>added by <b>{user?.username}</b></p>}
        </div>
    </Link>
          <img 
            style={{width:"50px", height:"50px"}}
            onClick={handleLike}
            src={!artpost.likedBy.includes(user._id) ? EmptyLike : FullLike}
          />
      </div>
  );
}

export default ArtPostCard;