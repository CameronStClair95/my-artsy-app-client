import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Card } from "react-bootstrap";
import "../App.css";

const API_URL = "http://localhost:5005/api/home";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [artPosts, setArtPosts] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllPosts() {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
        setArtPosts(response.data.artPosts);
        setNewsPosts(response.data.newsPosts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="HomePage">

    {isLoading ? (
            <h2 className='loading'>Loading...</h2>
        ) : (
            <>
            

    <div className='home-news'>
      
      {newsPosts.map(news => {
        return(
          <div key={news._id}>
            <h6>{news.title}</h6>
          </div>
        )
      })}
    </div>

    <div className='posts-artposts'>

      <div className='home-posts'>
        {posts.map(post => {
            return (
                <div key={post._id}>
                    <h4>{post.content}</h4>
                    <img src={post.post_image}/>
                    <p>{post.createdAt}</p>
                </div>
            )
        })}
      </div>

      <div className='home-artposts'>
        {artPosts.map(artpost => {
          return(
            <div key={artpost._id}>
              <h4>{artpost.title}</h4>
              <img src={artpost.art_image}/>
            </div>
          )
        })}
      </div>
    </div>

    </>
        )}
        {/* Post Card */}
        
        
        {/* Artpost Carousel */}
        {/* <div className="artpost-carousel">
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
        </div> */}
    </div>
  );
}

export default HomePage;
