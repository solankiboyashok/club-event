import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const clubs = [
  { 
    id: 1, 
    name: "Literary Club", 
    description: "Join engaging discussions, book readings, and writing workshops to explore the world of literature.", 
    organizer: "Dr. Anjali Sharma",
    eventDate: "March 15, 2025, 5:00 PM",
    lastRegistration: "March 10, 2025",
    image: "https://primexnewsnetwork.com/wp-content/uploads/2025/01/postpressreleasecontentcaf6d7c4-c51d-40da-b45e-bede01da88de.png"
  },
  { 
    id: 2, 
    name: "Garba Club", 
    description: "Celebrate the spirit of Garba with traditional dance workshops and performances.", 
    organizer: "Prof. Raj Patel",
    eventDate: "April 1, 2025, 7:00 PM",
    lastRegistration: "March 28, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSxFzsQiCRor329Oaqst97eIMn8_E6JUPS5Q&s"
  },
  { 
    id: 3, 
    name: "Google Developer Student Club (GDSC)", 
    description: "Enhance your skills in Google technologies and collaborate on innovative projects.", 
    organizer: "Mr. Rohan Verma",
    eventDate: "March 20, 2025, 4:00 PM",
    lastRegistration: "March 18, 2025",
    image: "https://avatars.githubusercontent.com/u/112186690?s=280&v=4"
  },
  { 
    id: 4, 
    name: "AWS Cloud Club", 
    description: "Gain hands-on experience with Amazon Web Services (AWS) and cloud computing.", 
    organizer: "Ms. Priya Desai",
    eventDate: "March 22, 2025, 3:30 PM",
    lastRegistration: "March 19, 2025",
    image: "https://media.licdn.com/dms/image/v2/D4D0BAQFGsxc80XrOGw/company-logo_200_200/company-logo_200_200/0/1710954364794"
  },
  { 
    id: 5, 
    name: "Explorer Club", 
    description: "Develop management, technical, and leadership skills by organizing events at Parul University.", 
    organizer: "Dr. Nilesh Mehta",
    eventDate: "March 25, 2025, 6:00 PM",
    lastRegistration: "March 22, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKpCdj01vBrjFRrSfYRe_e1Y7veVBJXjI7w&s"
  },
  { 
    id: 6, 
    name: "Sports Club", 
    description: "Join exciting tournaments and promote fitness through team sports.", 
    organizer: "Coach Arvind Kumar",
    eventDate: "April 5, 2025, 8:00 AM",
    lastRegistration: "March 30, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_1Yjsehx0X3zbo0pfPZzLUtSyyTNgHj1TA&s"
  },
  { 
    id: 7, 
    name: "Theatre Club", 
    description: "Showcase your acting talent and participate in drama and performing arts.", 
    organizer: "Ms. Kavita Joshi",
    eventDate: "March 29, 2025, 5:30 PM",
    lastRegistration: "March 25, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-2U-jJtPkqKFOOububeK4ZYCQCNAL8CvoA&s"
  },
  { 
    id: 8, 
    name: "Arts & Craft Club", 
    description: "Unleash your creativity with painting, crafting, and other artistic activities.", 
    organizer: "Ms. Sunita Rao",
    eventDate: "April 10, 2025, 4:00 PM",
    lastRegistration: "April 5, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1ngucLkbZ4teViePc2rbVasmEnXkFxtmFw&s"
  },
  { 
    id: 9, 
    name: "Poetry Club", 
    description: "Celebrate poetry through readings, discussions, and creative writing sessions.", 
    organizer: "Dr. Meenal Shah",
    eventDate: "April 2, 2025, 6:30 PM",
    lastRegistration: "March 30, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhD6PBI2Pa-viIyPfUWxJE0ky5qjkXAqqPQ&s"
  },
  { 
    id: 10, 
    name: "Music Club", 
    description: "Showcase your musical talent in singing, instrumental music, and compositions.", 
    organizer: "Mr. Aditya Roy",
    eventDate: "April 7, 2025, 5:00 PM",
    lastRegistration: "April 3, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaixk3gAxoP5G8g4Ef-qlTvAP4lHKEkZRcTQ&s"
  },
  { 
    id: 11, 
    name: "Dance Club", 
    description: "Express yourself through various dance forms and participate in competitions.", 
    organizer: "Ms. Sneha Kapoor",
    eventDate: "April 15, 2025, 7:00 PM",
    lastRegistration: "April 10, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeeXQ8O-yr3migukZpDbYmd1iHRi8-jvZZlg&s"
  },
  { 
    id: 12, 
    name: "Photography Club", 
    description: "Capture stunning moments and learn photography techniques.", 
    organizer: "Mr. Akash Gupta",
    eventDate: "April 9, 2025, 4:30 PM",
    lastRegistration: "April 5, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBR14cTmEjMynLjjrVgb1RtxWuLeccdvkOfg&s"
  },
  { 
    id: 13, 
    name: "Film Club", 
    description: "Screen and discuss films from different genres and eras.", 
    organizer: "Prof. Vikram Choudhary",
    eventDate: "April 20, 2025, 6:00 PM",
    lastRegistration: "April 15, 2025",
    image: "https://www.arabartsfestival.com/wp-content/uploads/2023/05/Other-Cinemas-1024x559.jpg"
  },
  { 
    id: 14, 
    name: "Coding Club", 
    description: "Participate in coding hackathons and skill-enhancing workshops.", 
    organizer: "Mr. Rahul Mehta",
    eventDate: "April 12, 2025, 3:00 PM",
    lastRegistration: "April 8, 2025",
    image: "https://media.licdn.com/dms/image/v2/C4E0BAQEorz4dx9_vjA/company-logo_200_200/company-logo_200_200/0/1630653757186"
  }
];


const ClubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const club = clubs.find((c) => c.id === parseInt(id));

  if (!club) {
    return <p className="text-center mt-5">Club not found.</p>;
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Header />
      <Container className="py-5 d-flex justify-content-center">
        <Card className="shadow-lg p-4" style={{ width: "60%", borderRadius: "15px" }}>
          <Card.Img 
            variant="top" 
            src={club.image} 
            style={{ 
              height: "350px", 
              objectFit: "cover", 
              borderTopLeftRadius: "15px", 
              borderTopRightRadius: "15px" 
            }} 
          />
          <Card.Body className="text-center">
            <Card.Title className="fw-bold fs-3">{club.name}</Card.Title>
            <Card.Text className="text-muted"><strong>Description:</strong> {club.description}</Card.Text>
            <Card.Text><strong>Organizer:</strong> {club.organizer}</Card.Text>
            <Card.Text><strong>Event Date:</strong> {club.eventDate}</Card.Text>
            <Card.Text><strong>Last Registration Date:</strong> {club.lastRegistration}</Card.Text>
            
            <div className="d-flex flex-column gap-3">
            <Button 
                variant="success" 
                size="lg" 
                className="fw-bold" 
                onClick={() => navigate(`/Clubregister/${club.id}`)} // ✅ Navigate to registration form
              >
                Join Club
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="fw-bold" 
                onClick={() => navigate("/clubs")}
              >
                Back 
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ClubDetail;
