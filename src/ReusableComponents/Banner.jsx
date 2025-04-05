/* eslint-disable react/prop-types */
import React from 'react';
import './banner.css'; // Import the CSS file

const Banner = ({ imgSrc }) => {
  return (
    <div className="banner-container mb-0">
      <img 
        src={imgSrc} // Replace with your image path
        alt="Category Banner"
        className="img-fluid w-100" // Makes the banner full-width
        style={{ height: '400px', objectFit: 'cover' }} // Adjust height as per requirement
      />
    </div>
  );
};

export default Banner;
