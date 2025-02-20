import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { UserPlus, Users, Calendar, Star } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Step 1: Send OTP to the user's email
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

  // Step 2: Verify OTP & Register User
  const handleRegister = async (e) => {
    e.preventDefault();

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
        alert("Registration successful! Redirecting to login...");
        window.location.href = "/login";
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
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center text-white mb-4">
              <UserPlus size={50} className="mb-3" strokeWidth={1.5} />
              <h1 className="display-6 fw-bold mb-2">Join EventHub</h1>
              <p className="lead">Create, manage, and attend amazing events</p>
            </div>
            <Card
              className="border-0"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
              }}
            >
              <Card.Body className="p-5">
                {error && <Alert variant="danger">{error}</Alert>}
                {registered && <Alert variant="success">✅ Registration successful!</Alert>}

                <Form onSubmit={handleRegister}>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                        {!otpSent ? (
                          <Button variant="secondary" className="mt-2" onClick={handleSendOtp}>
                            {loading ? "Sending OTP..." : "Send OTP"}
                          </Button>
                        ) : (
                          <Alert variant="success" className="mt-2">
                            OTP sent to your email!
                          </Alert>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {otpSent && (
                    <Form.Group className="mb-4">
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

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  {/* Role Selection */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Select Your Role</Form.Label>
                    <Row className="g-3">
                      <Col md={4}>
                        <div
                          className={`p-3 text-center rounded-3 ${
                            formData.role === "user" ? "bg-primary bg-opacity-10 border border-primary" : "bg-light"
                          }`}
                          onClick={() => setFormData({ ...formData, role: "user" })}
                          style={{ cursor: "pointer" }}
                        >
                          <Users className="mb-2" size={24} />
                          <div className="fw-semibold">User</div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div
                          className={`p-3 text-center rounded-3 ${
                            formData.role === "admin" ? "bg-primary bg-opacity-10 border border-primary" : "bg-light"
                          }`}
                          onClick={() => setFormData({ ...formData, role: "admin" })}
                          style={{ cursor: "pointer" }}
                        >
                          <Star className="mb-2" size={24} />
                          <div className="fw-semibold">Admin</div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div
                          className={`p-3 text-center rounded-3 ${
                            formData.role === "subadmin" ? "bg-primary bg-opacity-10 border border-primary" : "bg-light"
                          }`}
                          onClick={() => setFormData({ ...formData, role: "subadmin" })}
                          style={{ cursor: "pointer" }}
                        >
                          <Calendar className="mb-2" size={24} />
                          <div className="fw-semibold">Subadmin</div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 py-3 fw-bold" disabled={!otpSent}>
                    {loading ? "Registering..." : "Create Account"}
                  </Button>

                  <div className="text-center mt-3">
                    <p>
                      Already have an account?{" "}
                      <Link to="/dashboard" className="fw-bold" style={{ color: "#4776E6" }}>
                        Sign In
                      </Link>
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
