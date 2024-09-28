// src/components/Header.js

import React from 'react';
import './Header.css';


function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <img src='/assets/clacg.jpg' alt="CLACG Logo" className="logo" />
        <div className="header-text">
          <h1>Clear Lake Asian Culture Group</h1>
          <br></br>
          <p>serving the community</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
