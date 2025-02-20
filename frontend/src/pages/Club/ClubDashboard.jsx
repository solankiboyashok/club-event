import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./UserDashboard.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const clubs = [
  { id: 1, name: "Literary Club", description: "Fosters a love for literature through discussions, readings, and writing workshops.",
     image: "https://primexnewsnetwork.com/wp-content/uploads/2025/01/postpressreleasecontentcaf6d7c4-c51d-40da-b45e-bede01da88de.png" },
  { id: 2, name: "Garba Club", description: "Promotes the traditional dance form of Garba, organizing workshops and performances.",
     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxFzsQiCRor329Oaqst97eIMn8_E6JUPS5Q&s" },
  { id: 3, name: "Google Developer Student Club (GDSC)", description: "Provides a platform for students to enhance their skills in Google technologies and collaborate on projects.", 
     image: "https://avatars.githubusercontent.com/u/112186690?s=280&v=4" },
  { id: 4, name: "AWS Cloud Club", description: "Educates students about Amazon Web Services (AWS) and offers hands-on experience with cloud computing.", 
     image: "https://media.licdn.com/dms/image/v2/D4D0BAQFGsxc80XrOGw/company-logo_200_200/company-logo_200_200/0/1710954364794?e=2147483647&v=beta&t=HrUtx5R08YUG5uzffaxz7FBrGPQ9UUc_q0GU_nmU-I0" },
  { id: 5, name: "Explorer Club", description: "Organizes major events within the Parul Institute of Technology, allowing students to develop skills in management, technical domains, leadership, and more.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKpCdj01vBrjFRrSfYRe_e1Y7veVBJXjI7w&s" },
  { id: 6, name: "Sports Club", description: "Encourages physical activity and team participation.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_1Yjsehx0X3zbo0pfPZzLUtSyyTNgHj1TA&s" },
  { id: 7, name: "Theatre Club", description: "Providing a platform for students interested in drama and performing arts.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-2U-jJtPkqKFOOububeK4ZYCQCNAL8CvoA&s" },
  { id: 8, name: "Arts & Craft Club", description: "Nurturing creativity through various artistic endeavors.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1ngucLkbZ4teViePc2rbVasmEnXkFxtmFw&s" },
  { id: 9, name: "Poetry Club", description: "Celebrating the art of poetry through readings and writing sessions.", 
     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhD6PBI2Pa-viIyPfUWxJE0ky5qjkXAqqPQ&s" },
  { id: 10, name: "Music Club", description: "Bringing together students passionate about various musical genres and instruments.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaixk3gAxoP5G8g4Ef-qlTvAP4lHKEkZRcTQ&s" },
  { id: 11, name: "Dance Club", description: "Promoting dance as a form of expression and exercise.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeeXQ8O-yr3migukZpDbYmd1iHRi8-jvZZlg&s" },
  { id: 12, name: "Photography Club", description: "Encouraging students to explore the art of photography.", 
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBR14cTmEjMynLjjrVgb1RtxWuLeccdvkOfg&s" },
  { id: 13, name: "Film Club", description: "Screening and discussing films from various genres.", 
     image: "https://www.arabartsfestival.com/wp-content/uploads/2023/05/Other-Cinemas-1024x559.jpg" },
  { id: 14, name: "Coding Club", description: "Enhancing coding skills through workshops and hackathons.", 
     image: "https://media.licdn.com/dms/image/v2/C4E0BAQEorz4dx9_vjA/company-logo_200_200/company-logo_200_200/0/1630653757186/coding_club_logo?e=2147483647&v=beta&t=A8b5XdTQ8SgB_5pSRjgfm_R8H3k-IbFTI60O1R7IOFE" },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // Filter clubs based on search input
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Container className="py-5">
        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control
              type="text"
              placeholder="Search Club..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        {/* Student Clubs Section */}
        <Row className="mt-5 text-center">
          <Col>
            <h2 className="fw-bold">Student Clubs at Parul University</h2>
            <p className="text-muted">Explore various student clubs to enhance your skills and interests.</p>
          </Col>
        </Row>

        {/* Club Cards */}
        <Row>
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => (
              <Col md={4} key={club.id} className="mb-4">
                <Card className="shadow h-100">
                  <Card.Img 
                    variant="top" 
                    src={club.image} 
                    style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px 10px 0 0" }} 
                  />
                  <Card.Body>
                    <Card.Title>{club.name}</Card.Title>
                    <Card.Text>{club.description}</Card.Text>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/clubs/${club.id}`)} // ✅ Navigate to ClubDetail
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p className="text-muted">No clubs found.</p>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;