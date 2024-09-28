// src/components/ImageCarousel.js

import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageCarousel.css';
import image1 from '/src/assets/Picture1.jpg';
import image2 from '/src/assets/Picture2.jpg';
import image3 from '/src/assets/Picture3.jpg';
import image4 from '/src/assets/Picture4.jpg';
import image5 from '/src/assets/Picture5.jpg';


function ImageCarousel() {
  return (
    <div className="carousel-container">
      <h2>CLACG in action</h2>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image4} alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image5} alt="Fifth slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
