import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    formName: "",
    age: "",
    city: "",
    state: "",
    aboutMe: "",
    skills: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({
          formName: response.data.formName || "",
          age: response.data.age || "",
          city: response.data.city || "",
          state: response.data.state || "",
          aboutMe: response.data.aboutMe || "",
          skills: response.data.skills || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5000/api/user/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <div className="text-center text-xl font-semibold">Loading profile...</div>;

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="8" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={user.profilePic || "/default-profile.png"}
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{user.formName || "N/A"}</MDBTypography>
                  <MDBCardText>{user.aboutMe || "A passionate learner!"}</MDBCardText>
                  {!editMode && (
                    <MDBIcon far icon="edit mb-5" onClick={handleEdit} style={{ cursor: 'pointer' }} />
                  )}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Personal Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        {!editMode ? (
                          <MDBCardText className="text-muted">{user.formName || "N/A"}</MDBCardText>
                        ) : (
                          <MDBInput type="text" name="formName" value={formData.formName} onChange={handleChange} />
                        )}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        {!editMode ? (
                          <MDBCardText className="text-muted">{user.age || "N/A"} years</MDBCardText>
                        ) : (
                          <MDBInput type="number" name="age" value={formData.age} onChange={handleChange} />
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">City</MDBTypography>
                        {!editMode ? (
                          <MDBCardText className="text-muted">{user.city || "N/A"}</MDBCardText>
                        ) : (
                          <MDBInput type="text" name="city" value={formData.city} onChange={handleChange} />
                        )}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">State</MDBTypography>
                        {!editMode ? (
                          <MDBCardText className="text-muted">{user.state || "N/A"}</MDBCardText>
                        ) : (
                          <MDBInput type="text" name="state" value={formData.state} onChange={handleChange} />
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBTypography tag="h6">Skills</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    {!editMode ? (
                      <MDBCardText className="text-muted">{user.skills || "N/A"}</MDBCardText>
                    ) : (
                      <MDBInput type="text" name="skills" value={formData.skills} onChange={handleChange} />
                    )}
                    <MDBTypography tag="h6">About Me</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    {!editMode ? (
                      <MDBCardText className="text-muted">{user.aboutMe || "N/A"}</MDBCardText>
                    ) : (
                      <MDBTextArea name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows="4" />
                    )}
                    {editMode && (
                      <div className="text-center mt-4">
                        <MDBBtn color="success" onClick={handleSave}>Save Changes</MDBBtn>
                        <MDBBtn color="danger" onClick={handleCancel} className="ms-2">Cancel</MDBBtn>
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
