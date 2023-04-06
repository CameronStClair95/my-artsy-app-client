// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-2">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h6 className="footer-title">Macartsy</h6>
            <p className="text-muted small">
              Created by{' '}
              <a
                href="https://www.linkedin.com/in/cameron-a-8531531ba/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cameron Aitcheson-Labarr
              </a>{' '}
              &{' '}
              <a
                href="https://www.linkedin.com/in/maksym-kopychanskyi-380316203/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Max K
              </a>
            </p>
          </Col>
          <Col xs={12} md={6} className="text-right">
            <p className="text-muted small">
              <a
                href="https://github.com/CameronStClair95"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cameron's GitHub
              </a>{' '}
              |{' '}
              <a
                href="https://github.com/Sup-Maxx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Max's GitHub
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
