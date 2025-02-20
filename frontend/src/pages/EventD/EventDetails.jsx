import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const events = [
  {
    id: 1,
    title: "Projection 2025",
    date: "Feb 15, 2025",
    location: "Parul University, Vadodara",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL07EcqFVjnL7ooz9Nm73OF_A4b4MuVqLcSQ&s",
    description: "An event showcasing future technology and innovations."
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    date: "March 15, 2025",
    location: "Parul University, Vadodara",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMI9UPxPe6Nfn6qY3scRrXPA6IPQyvLnO6Fg&s",
    description: "A gathering of tech enthusiasts to discuss cutting-edge technologies."
  },
  {
    id: 3,
    title: "Music Fest",
    date: "March 17, 2025",
    location: "Parul University, Vadodara",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqo7vJf35Tf3MNdBRV40RcQkVoIhEp9DnNw&s",
    description: "A night of electrifying music and performances."
  },
  {
    id: 4,
    title: "Dhoom Annual Fest",
    date: "March 26, 2025",
    location: "Parul University, Vadodara",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIPglzm0hncdl4MlIdVeOILSHat2w8zM_YxQ&s",
    description: "Annual cultural fest featuring various performances and competitions."
  },
  {
    id: 5,
    title: "Fresher Party",
    date: "Nov 29, 2025",
    location: "Parul University, Vadodara",
    image: "https://i.ytimg.com/vi/jgKWfgnsw8A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASWAeMaZXj68CKS5KOcr4X8U3KLg",
    description: "A welcome party for new students to meet and enjoy."
  },
  {
    id: 6,
    title: "Vadodara Hackathon",
    date: "Dec 15, 2025",
    location: "Parul University, Vadodara",
    image: "https://www.northeasternchronicle.in/wp-content/uploads/2023/08/65FECEC5-F438-4960-AFC7-3AEEC0A0EA8A-1024x665.jpeg",
    description: "A competitive coding event for developers to solve real-world problems."
  }
  // Add other events...
];

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <h2 className="text-center">Event not found</h2>;
  }

  return (
    <div>
      <Header />
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <Card className="shadow">
              <Card.Img variant="top" src={event.image} style={{ height: "300px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {event.date} <br />
                  <strong>Location:</strong> {event.location} <br />
                  <strong>Description:</strong> {event.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h3>Register for {event.title}</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" />
              </Form.Group>
              <Button variant="primary" type="submit">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EventDetails;