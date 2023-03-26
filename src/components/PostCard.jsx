import React from 'react'
import { Button, Card } from 'react-bootstrap'


function PostCard({content, place, post_image}) {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={post_image} />
          <Card.Body>
            {/* <Card.Title>{content}</Card.Title> */}
            <Card.Text>{content}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
    </div>
  )
}

export default PostCard