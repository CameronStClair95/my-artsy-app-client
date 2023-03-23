import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "../App.css";

const API_URL = "http://localhost:5005/api/home"

function HomePage() {

   const [posts, setPosts] = useState([]);
   const [artPosts, setArtPosts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   function getAllPosts() {
    axios.get(API_URL)
        .then((response) => {
            console.log(response.data)
            setPosts(response.data.posts)
            setArtPosts(response.data.artPosts)
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false);
        });
}

useEffect(() => {
    getAllPosts();
}, []); 

  return (
    <div className="HomePage">
    {isLoading ? (
        <p>Loading...</p>
    ) : (
        <>
        {/* Post Card */}
        {posts.map(post => {
            return (
                <div key={post._id}>
                    {post.content}
                </div>
            )
        })}
        
        {/* Artpost Carousel */}
        <div className="artpost-carousel">
          <Carousel>
            {artPosts.map(artpost => {
              return (
                <Carousel.Item key={artpost._id}>
                  <img
                    className="d-block w-100"
                    src={artpost.art_image}
                    alt="Art"
                  />
                  <Carousel.Caption>
                    <h3>{artpost.title}</h3>
                    <p>{artpost.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
        </>
    )}
    </div>
  )
}

export default HomePage;
