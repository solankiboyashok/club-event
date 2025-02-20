import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <MDBContainer className="my-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <MDBTable striped hover>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};

export default AdminDashboard;
