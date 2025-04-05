import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CarouselComponent.css'; // Import the CSS file

const CarouselComponent = () => {
  return (
    <Carousel interval={3000} controls={true} indicators={true}>
      <Carousel.Item className="carousel-item-custom">
        <img
          className="d-block w-100 carousel-image"
          src="/assets/img/IMG_6143.jpg"
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First Slide Label</h3>
          <p>Some description for the first slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className="carousel-item-custom">
        <img
          className="d-block w-100 carousel-image"
          src="/assets/img/product/blinds_for_windows.jpg"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h3>Second Slide Label</h3>
          <p>Some description for the second slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className="carousel-item-custom">
        <img
          className="d-block w-100 carousel-image"
          src="/assets/img/IMG_6143.jpg"
          alt="Third slide"
        />
        {/* <Carousel.Caption>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
