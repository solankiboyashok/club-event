import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
          <Nav.Link as={Link} to="/clubs">Club</Nav.Link>
          <Nav.Link as={Link} to="/events">Event</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
