import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin-dashboard"); // ✅ go to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", credentials);
      const { token, user } = res.data;
      if (user?.role !== "admin") {
        setError("Access denied: not an admin account");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard className="p-4" style={{ width: "400px" }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4">Admin Login</MDBCardTitle>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <MDBInput
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <MDBBtn type="submit" className="w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdminLogin;
