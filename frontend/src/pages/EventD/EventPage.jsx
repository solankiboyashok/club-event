import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import event4 from "../../images/event4.png";
import event5 from "../../images/event5.png";
import event6 from "../../images/event6.png";

const allEvents = [
  { 
    id: 1, 
    title: "Cultural Events", 
    date: "March 15, 2025", 
    location: "San Francisco, CA", 
    image: event4, 
    description: "Enjoy a night of culture and diversity with music, dance, and food.",
    highlights: [
      "Live music performances",
      "Dance showcases",
      "Cultural food festival",
      "Traditional costume contest"
    ]
  },
  { 
    id: 2, 
    title: "Technical Events", 
    date: "April 22, 2025", 
    location: "Los Angeles, CA", 
    image: event5, 
    description: "Compete in hackathons, attend tech talks, and explore the latest in technology.",
    highlights: [
      "Hackathons with cash prizes",
      "AI and ML workshops",
      "Tech startup pitch competitions",
      "Networking with industry professionals"
    ]
  },
  { 
    id: 3, 
    title: "Academic and Outreach Events", 
    date: "May 10, 2025", 
    location: "New York, NY", 
    image: event6, 
    description: "Engage in academic discussions, workshops, and outreach programs.",
    highlights: [
      "Guest lectures by renowned professors",
      "Educational workshops and seminars",
      "Community outreach and volunteering",
      "Student research paper presentations"
    ]
  },
];

const EventPage = () => {
  const { eventId } = useParams();
  const event = allEvents.find((e) => e.id === parseInt(eventId));

  if (!event) {
    return (
      <Container className="py-5 text-center">
        <h2>Event Not Found</h2>
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container className="py-5">
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="fw-bold">{event.title}</h1>
            <p className="text-muted">{event.date} | {event.location}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="shadow">
              <Card.Img variant="top" src={event.image} style={{ height: "300px", objectFit: "cover" }} />
            </Card>
          </Col>
          <Col md={6}>
            <h3>Event Details</h3>
            <p>{event.description}</p>
            <h4 className="mt-4">Event Highlights:</h4>
            <ListGroup variant="flush">
              {event.highlights.map((highlight, index) => (
                <ListGroup.Item key={index}>✅ {highlight}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EventPage;
