import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Userlog from "../images/Userlog.png"; // Ensure correct image path
import { FaBell } from "react-icons/fa"; // Import notification bell icon

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Notification dropdown state
  const [userName, setUserName] = useState("User"); // Default fallback
  const [notifications, setNotifications] = useState([]); // Store notifications
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user details from backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.name) {
          setUserName(response.data.name);
        } else {
          setUserName("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName("Unknown User");
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(response.data || []); // Store notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleManageAccount = () => {
    navigate("/manage-account");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm px-4">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Eve<span className="text-warning">Club</span>
        </Navbar.Brand>

        {/* Navigation Links */}
        <Nav className="d-none d-lg-flex">
          <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
          <Nav.Link as={Link} to="/clubs">Club</Nav.Link>
          <Nav.Link as={Link} to="/events">Event</Nav.Link>
        </Nav>

        {/* User Profile & Notifications */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Notification Bell Icon */}
          <div className="position-relative" ref={notificationRef}>
            <div 
              className="cursor-pointer" 
              onClick={() => setShowNotifications(!showNotifications)} 
              style={{ cursor: "pointer", fontSize: "1.5rem", position: "relative" }}
            >
              <FaBell className="text-dark" />
              {notifications.length > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {notifications.length}
                </span>
              )}
            </div>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 bg-white shadow rounded-lg p-3"
                style={{
                  width: "250px",
                  zIndex: 1000,
                  borderRadius: "8px",
                  maxHeight: "300px",
                  overflowY: "auto"
                }}
              >
                <h6 className="text-center fw-bold">Notifications</h6>
                <hr className="m-2" />
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <div key={index} className="border-bottom pb-2 mb-2">
                      <p className="mb-1 text-dark fw-semibold">{notif.title}</p>
                      <small className="text-muted">{notif.message}</small>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No new notifications</p>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="position-relative" ref={menuRef}>
            <div
              className="d-flex align-items-center gap-2 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={Userlog}
                alt="User Avatar"
                className="rounded-circle border"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <span className="fw-semibold text-dark">{userName}</span>
            </div>

            {showMenu && (
              <div
                className="position-absolute end-0 mt-2 bg-white shadow rounded-lg p-3"
                style={{
                  width: "180px",
                  zIndex: 1000,
                  borderRadius: "8px",
                }}
              >
                <div className="pb-2 border-bottom text-center">
                  <span className="fw-bold">{userName}</span>
                </div>
                <button
                  onClick={handleManageAccount}
                  className="w-100 text-start p-2 btn btn-light d-flex align-items-center"
                >
                  ✏️ <span className="ms-2">Manage Account</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-100 text-start p-2 btn btn-light text-danger d-flex align-items-center"
                >
                  🚪 <span className="ms-2">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
