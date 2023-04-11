import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../App.css';
import './LandingPageAnimation.css';

function LandingPage() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1000);
  };

  return (
  
    <Container fluid className="landing-page d-flex align-items-center justify-content-center">
      <div className="text-center p-4 landing-page-text-container">
      <div className="text-center p-4">
        <h1 className="display-4 landing_text_shadow">Welcome to Macartsy</h1>
        <p className="lead landing_text_shadow">
          A vibrant community for art enthusiasts and connoisseurs. Our
          platform is dedicated to celebrating the world of art, showcasing
          exhibitions, sharing favorite masterpieces, and engaging in
          insightful discussions. Join us on our journey to explore the
          beauty and intricacies of art, as we connect with fellow art
          lovers and experience the wonders of creative expression.
        </p>
        <p>
          <CSSTransition in={!animate} classNames="button" timeout={1000} unmountOnExit>
            <Button onClick={handleButtonClick} variant="outline-light" size="lg" >
              Join Macartsy Today
            </Button>
          </CSSTransition>
        </p>
      </div>
      </div>
    </Container>
    
  );
}

export default LandingPage;
