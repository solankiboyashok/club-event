import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">
          {/* Column 1 - Brand Info */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Your Company</h5>
            <p>Building great experiences with technology.</p>
          </Col>

          {/* Column 2 - Quick Links */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Quick Support</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="#faq" className="text-light text-decoration-none">FAQs</a></li>
            </ul>
          </Col>

          {/* Column 3 - Social Media */}
          <Col md={4} className="mb-3 text-md-end">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-light fs-4"><FaFacebook /></a>
              <a href="#" className="text-light fs-4"><FaTwitter /></a>
              <a href="#" className="text-light fs-4"><FaInstagram /></a>
              <a href="#" className="text-light fs-4"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
