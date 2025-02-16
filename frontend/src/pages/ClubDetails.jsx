import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Card, Button } from "react-bootstrap";

// Sample club data (You can fetch this from an API)
const clubs = [
  { id: 1, name: "Literary Club", description: "Fosters a love for literature through discussions, readings, and writing workshops.",
    image: "https://primexnewsnetwork.com/wp-content/uploads/2025/01/postpressreleasecontentcaf6d7c4-c51d-40da-b45e-bede01da88de.png" },
  { id: 2, name: "Garba Club", description: "Promotes the traditional dance form of Garba, organizing workshops and performances.",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxFzsQiCRor329Oaqst97eIMn8_E6JUPS5Q&s" },
];

const ClubDetails = () => {
  const { id } = useParams(); // Get club ID from URL
  const club = clubs.find((c) => c.id === parseInt(id)); // Find club by ID

  if (!club) {
    return <h2 className="text-center">Club not found</h2>;
  }

  return (
    <div>
      <Header />
      <Container className="py-5">
        <Card className="shadow p-4">
          <Card.Img 
            variant="top" 
            src={club.image} 
            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }} 
          />
          <Card.Body>
            <Card.Title>{club.name}</Card.Title>
            <Card.Text>{club.description}</Card.Text>
            <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ClubDetails;
