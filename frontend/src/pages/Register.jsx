import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpField, setShowOtpField] = useState(false); // OTP input visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        method: "otp", // Request OTP-based verification
      });

      setMessage(res.data.message);
      setShowOtpField(true); // Show OTP input field

    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      setMessage(res.data.message);

      // Redirect to login page after successful OTP verification
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>{showOtpField ? "Enter OTP" : "Register"}</h2>
      {message && <p className="message">{message}</p>}

      {!showOtpField ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Register;
