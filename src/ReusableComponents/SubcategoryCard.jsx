/* eslint-disable react/prop-types */
import React from 'react';
import './SubcategoryCard.css'; // Import CSS for styling

const SubcategoryCard = ({ imageSrc, name, btnName }) => {
  return (
    <div className="card subcategory-card">
    <img src={imageSrc} className="card-img-top subcategory-img" alt={name} />
    <div className="overlay">
        <button className="view-product-btn">{btnName ||"View Product"}</button>
    </div>
</div>
  );
};

export default SubcategoryCard;
