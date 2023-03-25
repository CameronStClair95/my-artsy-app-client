import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Card } from "react-bootstrap";
import "../App.css";

const API_URL = "http://localhost:5005/api/home";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [artPosts, setArtPosts] = useState([]);
  const [newsArtPosts, setNewsArtPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllPosts() {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
        setArtPosts(response.data.artPosts);
        setNewsArtPosts(response.data.newsArtPost);
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
        <p>Loading...</p>
      ) : (
        <>
          {/* NewsArtpost Carousel */}
          <div className="newsartpost-carousel">
            <Carousel>
              {newsArtPosts.map((newsArtPost) => {
                return (
                  <Carousel.Item key={newsArtPost._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={newsArtPost.news.art_image}
                        alt="Art"
                      />
                      <Card.Body>
                        <Card.Title>Hello</Card.Title>
                        <Card.Text>How are you</Card.Text>
                        <Card.Link href={`/news-art-post/${newsArtPost._id}`}>
                          View Details
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
      {/* Post Card */}
      {posts.map((post) => {
        return <div key={post._id}>{post.content}</div>;
      })}

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
          </Carousel>*/}
    </div>
  );
}

export default HomePage;
