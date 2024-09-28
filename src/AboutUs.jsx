// src/components/AboutUs.js

import React from 'react';
import './AboutUs.css';
import aboutImage from '/src/assets/group.jpg'; // Replace with your actual image path

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <div className="about-content">
        <img src={aboutImage} alt="About CLACG" className="about-image" />
        <div className="about-text">
          <h3>Our Mission</h3>
          <p>
            We are a non-profit volunteer organization based in the Clear Lake area.
            We are committed to making a positive impact in the community through
            a variety of organized volunteer opportunities and events.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
