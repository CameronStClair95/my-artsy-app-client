import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';

function ArtPostCard({ artpostId }) {
  const [artpost, setArtpost] = useState(null);
  const API_URL = 'http://localhost:5005';

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artposts/${artpostId}`)
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

  const { artist, title, description, medium, year, dimensions, art_image } = artpost;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={art_image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Artist: {artist}</ListGroup.Item>
        <ListGroup.Item>Medium: {medium}</ListGroup.Item>
        <ListGroup.Item>Year: {year}</ListGroup.Item>
        <ListGroup.Item>Dimensions: {dimensions}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={`/artpost/${artpostId}`}>View Details</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ArtPostCard;
