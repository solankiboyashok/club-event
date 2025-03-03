import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Users, Shield, Calendar, Building2 } from "lucide-react"; // Import Lucide icons
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Default statistics (you can later fetch from backend)
  const [stats, setStats] = useState({
    totalUsers: 8,
    totalSubAdmins: 5,
    totalEvents: 20,
    totalClubs: 10,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin-login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load users. Please try again."
        );
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin-login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: "20px", overflowX: "auto" }}>
        {/* Navbar */}
        <MDBNavbar light bgColor="light" style={{ backgroundColor: "#fff", padding: "15px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <MDBNavbarBrand className="fw-bold">Admin Dashboard</MDBNavbarBrand>
        </MDBNavbar>

        {/* Dashboard Title */}
        <h2 className="text-center my-4">Dashboard Overview</h2>

        {/* Dashboard Statistics Cards */}
        <MDBContainer>
          <MDBRow className="g-4">
            <MDBCol md="3">
              <MDBCard className="text-center shadow-sm">
                <MDBCardBody>
                  <Users size={40} strokeWidth={2} className="text-primary mb-3" />
                  <MDBCardTitle>Total Users</MDBCardTitle>
                  <p className="fw-bold fs-4">{stats.totalUsers}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="3">
              <MDBCard className="text-center shadow-sm">
                <MDBCardBody>
                  <Shield size={40} strokeWidth={2} className="text-success mb-3" />
                  <MDBCardTitle>Total Sub-Admins</MDBCardTitle>
                  <p className="fw-bold fs-4">{stats.totalSubAdmins}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="3">
              <MDBCard className="text-center shadow-sm">
                <MDBCardBody>
                  <Calendar size={40} strokeWidth={2} className="text-warning mb-3" />
                  <MDBCardTitle>Total Events</MDBCardTitle>
                  <p className="fw-bold fs-4">{stats.totalEvents}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="3">
              <MDBCard className="text-center shadow-sm">
                <MDBCardBody>
                  <Building2 size={40} strokeWidth={2} className="text-danger mb-3" />
                  <MDBCardTitle>Total Clubs</MDBCardTitle>
                  <p className="fw-bold fs-4">{stats.totalClubs}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
