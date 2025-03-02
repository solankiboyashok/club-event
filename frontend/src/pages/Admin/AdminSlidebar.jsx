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
    <div className={`d-flex flex-column bg-dark text-white p-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`} style={{ height: "100vh", width: isOpen ? "250px" : "80px", transition: "width 0.3s" }}>
      
      {/* Sidebar Toggle Button */}
      <div className="text-end">
        <FaBars className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} style={{ fontSize: "1.5rem", cursor: "pointer" }} />
      </div>

      {/* Sidebar Menu */}
      <ul className="list-unstyled mt-3">
        <li className="mb-3">
          <Link to="/admin-dashboard" className="text-white text-decoration-none d-flex align-items-center">
            <FaTachometerAlt className="me-2" /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin-users" className="text-white text-decoration-none d-flex align-items-center">
            <FaUsers className="me-2" /> {isOpen && "Manage Users"}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin-events" className="text-white text-decoration-none d-flex align-items-center">
            <FaCalendarAlt className="me-2" /> {isOpen && "Manage Events"}
          </Link>
        </li>
        <li className="mb-3">
          <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center">
            <FaSignOutAlt className="me-2" /> {isOpen && "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
