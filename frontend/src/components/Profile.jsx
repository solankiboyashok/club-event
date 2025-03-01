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
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
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
    profilePic: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User not authenticated.");
          return;
        }

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
          profilePic: response.data.profilePic || "/default-profile.png", // Retrieved from DB
          role: response.data.role || "User",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!formData.formName || !formData.age || !formData.city || !formData.state) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      const response = await axios.put("http://localhost:5000/api/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUser(response.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile.");
    }
  };

  if (!user) return <div className="text-center text-xl font-semibold">Loading profile...</div>;

  return (
    <section className="vh-100" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="8" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={formData.profilePic} alt="Profile" className="my-5" style={{ width: '100px', borderRadius: '50%' }} fluid />
                  <MDBTypography tag="h5">{user.formName || "N/A"}</MDBTypography>
                  <MDBCardText>{user.aboutMe || "A passionate learner!"}</MDBCardText>
                  <MDBCardText className="font-italic">{user.role || "User"}</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Personal Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{user.formName || "N/A"}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">{user.age || "N/A"} years</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">City</MDBTypography>
                        <MDBCardText className="text-muted">{user.city || "N/A"}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">State</MDBTypography>
                        <MDBCardText className="text-muted">{user.state || "N/A"}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBTypography tag="h6">Skills</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCardText className="text-muted">{user.skills || "N/A"}</MDBCardText>
                    <MDBTypography tag="h6">About Me</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCardText className="text-muted">{user.aboutMe || "N/A"}</MDBCardText>
                    <MDBBtn color="primary" onClick={() => setEditMode(true)}>Edit Profile</MDBBtn>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Edit Profile Modal */}
      <MDBModal isOpen={editMode} toggle={() => setEditMode(false)} tabIndex="-1">
        <MDBModalHeader toggle={() => setEditMode(false)}>Edit Profile</MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Name" name="formName" value={formData.formName} onChange={handleChange} className="mb-3" required />
          <MDBInput label="Age" name="age" type="number" value={formData.age} onChange={handleChange} className="mb-3" required />
          <MDBInput label="City" name="city" value={formData.city} onChange={handleChange} className="mb-3" required />
          <MDBInput label="State" name="state" value={formData.state} onChange={handleChange} className="mb-3" required />
          <MDBInput label="Skills" name="skills" value={formData.skills} onChange={handleChange} className="mb-3" />
          <MDBTextArea label="About Me" name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows="4" className="mb-3" />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setEditMode(false)}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={handleSave}>Save Changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </section>
  );
};

export default Profile;
