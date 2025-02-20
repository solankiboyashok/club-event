import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ClubRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration Successful for Club ID: ${id}\nName: ${formData.firstName} ${formData.lastName}`);
    navigate("/"); // Redirect to home after submission
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Header />
      <Container className="py-5 d-flex justify-content-center">
        <Card className="shadow-lg p-4" style={{ width: "50%", borderRadius: "15px" }}>
          <Card.Body>
            <h2 className="text-center fw-bold">Join the Club</h2>
            <p className="text-center text-muted">Fill in your details to register.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>WhatsApp Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="whatsapp" 
                  value={formData.whatsapp} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <div className="d-flex flex-column gap-3">
                <Button variant="primary" type="submit" className="fw-bold">
                  Submit Registration
                </Button>
                <Button variant="secondary" className="fw-bold" onClick={() => navigate("/clubs")}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ClubRegistration;
