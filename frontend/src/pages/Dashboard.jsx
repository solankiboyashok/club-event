import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselComponent from "../components/Slider";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import event from "../assets/images/image.png";
import event3 from "../assets/images/event3.png";
import event2 from "../assets/images/event2.png";
import event1 from "../assets/images/event1.png";


const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        {/* Carousel Section */}
        <CarouselComponent />

        <Container className="py-5">
          {/* About the Club Section */}
          <Row className="mb-5 align-items-center">
            <Col md={6}>
              <h2 className="fw-bold">About Our Club</h2>
              <p>
                Our club is dedicated to bringing people together through exciting events and activities.
                We organize social gatherings, tech meetups, sports events, and much more!
              </p>
              <Button variant="primary">Learn More</Button>
            </Col>
            <Col md={6}>
              <img
                src={event}
                alt="Club Event"
                className="img-fluid rounded"
                style={{ height: "300px", objectFit: "cover", width: "100%" }}
              />
            </Col>
          </Row>

          {/* Upcoming Events Section */}
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold">Upcoming Events</h2>
            </Col>
          </Row>

          <Row>
            {/* Event Card 1 */}
            <Col md={4} className="mb-4">
              <Card className="shadow">
                <Card.Img variant="top" src={event1} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Tech Conference 2025</Card.Title>
                  <Card.Text>Date: March 15, 2025</Card.Text>
                  <Button variant="primary">Join Now</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Event Card 2 */}
            <Col md={4} className="mb-4">
              <Card className="shadow">
                <Card.Img variant="top" src={event2} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Music Fest</Card.Title>
                  <Card.Text>Date: April 22, 2025</Card.Text>
                  <Button variant="primary">Get Tickets</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Event Card 3 */}
            <Col md={4} className="mb-4">
              <Card className="shadow">
                <Card.Img variant="top" src={event3} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>Sports Championship</Card.Title>
                  <Card.Text>Date: May 10, 2025</Card.Text>
                  <Button variant="primary">Register Now</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
