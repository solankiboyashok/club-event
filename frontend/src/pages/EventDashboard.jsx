import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Card } from "react-bootstrap";
import event4 from "../assets/images/event4.png";
import event5 from "../assets/images/event5.png";
import event6 from "../assets/images/event6.png";

const events = [
  { id: 1, title: "Cultural Events", date: "March 15, 2025", location: "San Francisco, CA", image: event4 },
  { id: 2, title: "Technical Events", date: "April 22, 2025", location: "Los Angeles, CA", image: event5 },
  { id: 3, title: "Academic and Outreach Events", date: "May 10, 2025", location: "New York, NY", image: event6 },
];

const EventDashboard = () => {
  return (
    <div>
      <Header />
      <Container className="py-5">
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="fw-bold">All Events</h1>
            <p className="text-muted">Explore all upcoming events in one place.</p>
          </Col>
        </Row>
        <Row>
          {events.map((event) => (
            <Col md={4} key={event.id} className="mb-4">
              <Link to={`/clubs`} style={{ textDecoration: "none" }}> {/* Navigate to Club Page */}
                <Card className="shadow">
                  <Card.Img variant="top" src={event.image} style={{ height: "200px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {event.date}
                      <br />
                      <strong>Location:</strong> {event.location}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EventDashboard;
