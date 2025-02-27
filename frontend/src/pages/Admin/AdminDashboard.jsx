import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer, MDBTable, MDBTableHead, MDBTableBody,
  MDBBtn, MDBNavbar, MDBNavbarBrand, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem
} from "mdb-react-ui-kit";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
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
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin-login");
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

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
      }
    }
  };

  return (
    <MDBContainer fluid className="d-flex">
      {/* Sidebar */}
      <MDBCol md="2" className="bg-light vh-100 p-3">
        <h4 className="text-center">Admin Panel</h4>
        <MDBListGroup>
          <MDBListGroupItem action onClick={() => navigate("/admin-dashboard")}>
            Dashboard
          </MDBListGroupItem>
          <MDBListGroupItem action onClick={() => navigate("/manage-events")}>
            Manage Events
          </MDBListGroupItem>
          <MDBListGroupItem action onClick={() => navigate("/manage-clubs")}>
            Manage Clubs
          </MDBListGroupItem>
          <MDBListGroupItem action onClick={handleLogout} className="text-danger">
            Logout
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBCol>

      {/* Main Content */}
      <MDBCol md="10" className="p-4">
        <MDBNavbar light bgColor="light" className="mb-4 px-3">
          <MDBNavbarBrand>Admin Dashboard</MDBNavbarBrand>
          <MDBBtn color="danger" onClick={handleLogout}>Logout</MDBBtn>
        </MDBNavbar>

        <h2 className="text-center mb-4">User Management</h2>

        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
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
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <MDBBtn color="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No users found</td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </MDBCol>
    </MDBContainer>
  );
};

export default AdminDashboard;
