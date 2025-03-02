import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBNavbar, MDBNavbarBrand, MDBSpinner
} from "mdb-react-ui-kit";
import AdminSidebar from "./AdminSlidebar"; // Import Sidebar

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/admin-login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error("Error fetching users:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin-login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user permanently?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa", overflowX: "auto" }}>
        <MDBNavbar light bgColor="light" style={{ backgroundColor: "#fff", padding: "15px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <MDBNavbarBrand>Admin Dashboard</MDBNavbarBrand>
        </MDBNavbar>

        <h2 style={{ textAlign: "center", margin: "20px 0" }}>User Management</h2>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <MDBSpinner color="primary" />
          </div>
        )}

        {/* Error Message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* User Table */}
        {!loading && !error && (
          <MDBTable bordered hover style={{ background: "white", borderRadius: "8px", overflow: "hidden" }}>
            <MDBTableHead>
              <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td style={{ padding: "12px" }}>{index + 1}</td>
                    <td style={{ padding: "12px" }}>{user.name}</td>
                    <td style={{ padding: "12px" }}>{user.email}</td>
                    <td style={{ padding: "12px" }}>{user.role}</td>
                    <td style={{ padding: "12px" }}>
                      <MDBBtn color="danger" size="sm" style={{ fontSize: "14px", padding: "5px 12px", transition: "0.3s" }} 
                        onClick={() => handleDeleteUser(user._id)}
                        onMouseOver={(e) => e.target.style.backgroundColor = "darkred"}
                        onMouseOut={(e) => e.target.style.backgroundColor = ""}>
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>No users found</td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
