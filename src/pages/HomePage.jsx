import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Card } from "react-bootstrap";
import "../App.css";
import NewsCard from "../components/NewsCard";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

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
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <div className="carousel-container">
            <Carousel>
              {newsPosts.map((news, index) => {
                return (
                  <Carousel.Item
                    key={news._id}
                    className={index === 0 ? "active" : ""}
                  >
                    <img
                      className="d-block w-100 carousel-image-custom"
                      src={news.image}
                      alt="news image"
                    />
                    <Carousel.Caption className="d-none d-md-block">
                      <h3>{news.title}</h3>
                      <Link to={news.source} target="_blank">
                        <button type="button" className="btn btn-outline-light">
                          Read More
                        </button>
                      </Link>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>

          <div className="posts-artposts">
            <div className="home-posts">
              {posts.map((post) => {
                return <PostCard key={post._id} {...post} postId={post._id} />;
              })}
            </div>

            <div className="home-artposts">
              {artPosts.map((artpost) => {
                return (
                  <div key={artpost._id}>
                    <h4>{artpost.title}</h4>
                    <img src={artpost.art_image} />
                    <p>{artpost.author}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
