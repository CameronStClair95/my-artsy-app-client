import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FooterCSS from "./Footer.module.css";

function Footer() {
  return (

    <footer className={FooterCSS.footer}>
    
      <div className={FooterCSS.footer_element}>
        <h5 className="footer-title">Macartsy</h5>
      </div>

      <div className={FooterCSS.footer_element}>
        <p className="text-muted small">
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/cameron-a-8531531ba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cameron Aitcheson-Labarr </a>
            {" "}
          &{" "}
          <a
            href="https://www.linkedin.com/in/maksym-kopychanskyi-380316203/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Max Ko.
          </a>
        </p>
      </div>

      <div className={FooterCSS.footer_element}>
        <p className="text-muted small">
          <a
            href="https://github.com/CameronStClair95"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cameron's GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/Sup-Maxx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Max's GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
