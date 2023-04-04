import React from 'react'
import { Button, Card } from 'react-bootstrap'

function NewsCard({title, description, News_image, source}) {
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={News_image} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      );
}

export default NewsCard