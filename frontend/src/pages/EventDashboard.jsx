import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "March 15, 2025",
    location: "San Francisco, CA",
    image: "https://source.unsplash.com/600x300/?conference,technology",
  },
  {
    id: 2,
    title: "Music Fest",
    date: "April 22, 2025",
    location: "Los Angeles, CA",
    image: "https://source.unsplash.com/600x300/?music,concert",
  },
  {
    id: 3,
    title: "Sports Championship",
    date: "May 10, 2025",
    location: "New York, NY",
    image: "https://source.unsplash.com/600x300/?sports,competition",
  },
];

const EventDashboard = () => {
  return (
    <div>
      <Header />
      <Container className="py-5">
        {/* Page Title */}
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="fw-bold">Event Dashboard</h1>
            <p className="text-muted">Manage and explore upcoming events.</p>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control type="text" placeholder="Search events..." />
          </Col>
        </Row>

        {/* Event List */}
        <Row>
          {events.map((event) => (
            <Col md={4} key={event.id} className="mb-4">
              <Card className="shadow">
                <Card.Img variant="top" src={event.image} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {event.date}
                    <br />
                    <strong>Location:</strong> {event.location}
                  </Card.Text>
                  <Button variant="primary">Register Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EventDashboard;
