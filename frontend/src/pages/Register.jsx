import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email to receive an OTP.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        method: "otp",
      });

      if (res.data.message.includes("OTP")) {
        setOtpSent(true);
      } else {
        setError("Failed to send OTP. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!otpSent) {
      setError("Please verify your email with OTP first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: formData.email,
        otp: otp,
      });

      if (res.data.message.includes("verified")) {
        setRegistered(true);
        alert("Registration successful! Redirecting to dashboard...");
        window.location.href = "/dashboard";
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.collegedunia.com/public/college_data/images/appImage/1599193361PuCampus.jpg?mode=stretch")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={5}>
            <Card className="border-0 shadow-lg p-4" style={{ borderRadius: "12px", background: "#ffffff" }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-dark">Register</h1>
                    <UserPlus size={40} className="mb-2 " strokeWidth={1.5} />
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {registered && <Alert variant="success">✅ Registration successful!</Alert>}

                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email address</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <Button variant="outline-primary" onClick={handleSendOtp} disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {otpSent && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Button
                    className="w-100 py-3 fw-bold"
                    style={{ background: "linear-gradient(to right, #4776E6, #8E54E9)", border: "none" }}
                    type="submit"
                    disabled={!otpSent}
                  >
                    {loading ? "Registering..." : "Sign Up"}
                  </Button>

                  <div className="text-center mt-3">
                    <p>
                      Already have an account? <Link to="/login" className="fw-bold text-primary">Sign In</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
