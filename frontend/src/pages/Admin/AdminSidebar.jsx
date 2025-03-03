import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaTachometerAlt, FaSignOutAlt, FaBars } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#212529",
        color: "white",
        padding: "20px",
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isOpen ? "250px" : "80px",
      }}
    >
      {/* Sidebar Toggle Button */}
      <div style={{ width: "100%", textAlign: "center", marginBottom: "20px", fontSize: "1.5rem", cursor: "pointer" }}>
        <FaBars onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Sidebar Menu */}
      <ul style={{ listStyle: "none", padding: "0", width: "100%" }}>
        <li style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link
            to="/admin-dashboard"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              justifyContent: isOpen ? "flex-start" : "center",
            }}
          >
            <FaTachometerAlt style={{ fontSize: "1.2rem" }} />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link
            to="/admin-users"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              justifyContent: isOpen ? "flex-start" : "center",
            }}
          >
            <FaUsers style={{ fontSize: "1.2rem" }} />
            {isOpen && <span>Manage Users</span>}
          </Link>
        </li>
        <li style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link
            to="/createsubadmin"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              justifyContent: isOpen ? "flex-start" : "center",
            }}
          >
            <FaCalendarAlt style={{ fontSize: "1.2rem" }} />
            {isOpen && <span>Create Subadmin</span>}
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          backgroundColor: "#d9534f",
          color: "white",
          padding: "10px",
          width: "100%",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      >
        <FaSignOutAlt style={{ fontSize: "1.2rem" }} />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default AdminSidebar;
