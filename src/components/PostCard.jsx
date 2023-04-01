import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PostCard({content, place, post_image}) {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
        <Link to="/user"><img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" style={{width:"25px", height:"auto"}}/></Link>
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