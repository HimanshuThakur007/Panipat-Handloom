/* eslint-disable react/prop-types */
import React from 'react';
import './CategoryCard.css'; // Import the CSS file

const CategoryCard = ({ imageSrc, categoryName }) => {
    return (
        <>
        <div className="card category-card">
            <img src={imageSrc} className="card-img-top category-img" alt={categoryName} />
            {/* <div className="card-body text-center">
                <h5 className="card-title">{categoryName}</h5>
            </div> */}
        </div>
        {/* <p className="text-center">{categoryName}</p> */}
        </>
    );
};

export default CategoryCard;
