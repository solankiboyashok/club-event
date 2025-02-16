import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls
import Userlog from "../assets/images/Userlog.png"; // Ensure correct image path

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("User"); // Default fallback
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user details from backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token for authentication
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.name) {
          setUserName(response.data.name); // Set username from database
        } else {
          setUserName("Unknown User"); // Fallback if name is missing
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName("Unknown User");
      }
    };

    fetchUser();
  }, [navigate]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
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

        {/* User Profile Section */}
        <div className="d-flex align-items-center gap-3">
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
              <span className="fw-semibold text-dark">{userName}</span> {/* Correct username */}
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
                  <span className="fw-bold">{userName}</span> {/* Correct username */}
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
