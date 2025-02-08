import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../assets/images/event1.png";
import slide2 from "../assets/images/event2.png";
import slide3 from "../assets/images/event3.png";
import "./slider.css";  // Import the CSS file

const CarouselComponent = () => {
  return (
    <div className="container-fluid p-0">
      <Carousel fade interval={3000} className="carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={slide1} alt="Tech Conference" />
          <Carousel.Caption>
            <h3>Tech Conference 2025</h3>
            <p>Join the biggest tech event of the year.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Music Fest" />
          <Carousel.Caption>
            <h3>Music Fest</h3>
            <p>Experience the best live music performances.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={slide3} alt="Sports Championship" />
          <Carousel.Caption>
            <h3>Sports Championship</h3>
            <p>Cheer for your favorite team!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
