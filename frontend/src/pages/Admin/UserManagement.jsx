import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import AdminSidebar from "./AdminSidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user permanently?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  return (
    <div>
      <style>
        {`
          /* General Layout */
          .admin-container {
            display: flex;
            height: 100vh;
          }

          .admin-sidebar {
            width: 250px;
            background-color: #212529;
            color: white;
            padding: 20px;
            transition: width 0.3s;
          }

          .admin-content {
            flex: 1;
            padding: 20px;
            background: #f8f9fa;
          }

          /* Table Styling */
          .table-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }

          .table-container h3 {
            margin-bottom: 20px;
          }

          /* Table Adjustments */
          .table {
            width: 100%;
            border-collapse: collapse;
          }

          .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }

          .table th {
            background: #f1f1f1;
          }

          /* Button Styling */
          .btn-danger {
            padding: 6px 12px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
          }

          .btn-danger:hover {
            background: #c82333;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .admin-sidebar {
              width: 80px;
            }

            .admin-sidebar ul {
              text-align: center;
            }

            .admin-content {
              padding: 10px;
            }

            .table-container {
              padding: 10px;
            }

            .table th, .table td {
              padding: 8px;
            }

            .btn-danger {
              padding: 4px 8px;
              font-size: 12px;
            }
          }
        `}
      </style>

      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-content">
          <div className="table-container">
            <h3>Registered Users</h3>
            {loading ? (
              <MDBSpinner color="primary" />
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <MDBTable hover striped className="table">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
