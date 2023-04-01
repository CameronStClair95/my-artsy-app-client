import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

function ArtpostCard({artist, title, description, medium, year, dimensions, art_image, author}) {
    
    const {user} = useContext(AuthContext)

  return (
    <Link className='artpost_card_link' to="/new-post/artpost">

        <div className='artpost_card'>
            <div>
                <img className='art-image' src={art_image}/>
            </div>
            <div>
                <h3>{title}</h3>
                <h5>{artist}, {year}</h5>
                <h6>{medium}</h6>
                {author && <p>added by {user.username}</p>}
            </div>

        </div>
    </Link>
  )
}

export default ArtpostCard