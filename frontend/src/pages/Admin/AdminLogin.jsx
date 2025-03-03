import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin-login"); // Redirect if already logged in
    }
  }, [navigate]);

  const staticAdmin = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.email === staticAdmin.email && credentials.password === staticAdmin.password) {
      localStorage.setItem("token", "adminToken123"); // Static token
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password");
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
            <MDBBtn type="submit" className="w-100">Login</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdminLogin;
