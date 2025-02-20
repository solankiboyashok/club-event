import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { CalendarCheck } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login Response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("Token stored:", localStorage.getItem("token"));

        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.collegedunia.com/public/college_data/images/appImage/1599193361PuCampus.jpg?mode=stretch")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-center text-white mb-4">
              <CalendarCheck size={50} className="mb-3" strokeWidth={1.5} />
              <h1 className="display-6 fw-bold mb-2">EventHub</h1>
              <p className="lead">Your Gateway to Amazing Events</p>
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
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: "#2c3e50" }}>Welcome Back</h2>
                  <p className="text-muted">Sign in to manage your events</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-2 px-3"
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="py-2 px-3"
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-3 mb-4 fw-bold"
                    style={{
                      borderRadius: "10px",
                      background: "linear-gradient(to right, #4776E6, #8E54E9)",
                      border: "none",
                      transition: "transform 0.2s ease",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-none fw-bold"
                      style={{ color: "#4776E6" }}
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
