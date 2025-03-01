import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    dashboardName: "",
    formName: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

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
            dashboardName: response.data.dashboardName || "",
            formName: response.data.formName || ""
          });
          setProfilePic(response.data.profilePicture || "");
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
        setProfilePic(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("formName", formData.formName);
      formDataToSend.append("aboutMe", formData.aboutMe);
      formDataToSend.append("skills", formData.skills);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("city", formData.city);
      if (profilePic) {
        formDataToSend.append("profilePic", profilePic);
      }

      const response = await axios.put("http://localhost:5000/api/user/update-profile", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        alert("Profile Updated Successfully!");
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Manage Account</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit}>
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
            <input type="text" name="formName" value={formData.formName} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">User ID</label>
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">About Me</label>
          <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} className="form-control" rows="3"></textarea>
        </div>

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