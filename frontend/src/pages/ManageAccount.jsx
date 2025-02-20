import React, { useState, useEffect } from "react";
import axios from "axios";
import Userlog from "../images/Userlog.png"; // Default user image

const ManageAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    profilePicture: "",
    aboutMe: "",
    skills: "",
    state: "",
    city: "",
    languagesKnown: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user details on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setFormData({
            name: response.data.name || "",
            userId: response.data.userId || "",
            profilePicture: response.data.profilePicture || "",
            aboutMe: response.data.aboutMe || "",
            skills: response.data.skills || "",
            state: response.data.state || "",
            city: response.data.city || "",
            languagesKnown: response.data.languagesKnown || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setMessage("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result }); // Set base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5000/api/user/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Manage Account</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div className="mb-3 text-center">
          <img
            src={formData.profilePicture || Userlog}
            alt="Profile"
            className="rounded-circle border"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <label className="btn btn-primary mt-2">
            Upload Picture
            <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} hidden />
          </label>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">User ID</label>
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        {/* About Me Section */}
        <div className="mb-3">
          <label className="form-label">About Me</label>
          <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} className="form-control" rows="3"></textarea>
        </div>

        {/* Skills Section */}
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="form-control" />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
          </div>
        </div>

        {/* Languages Known */}
        <div className="mb-3">
          <label className="form-label">Languages Known</label>
          <input type="text" name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default ManageAccount;
