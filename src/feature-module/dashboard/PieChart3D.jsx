/* eslint-disable react/prop-types */
import React from "react";
import { Chart } from "react-google-charts";

// const getRandomColor = () => {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// };

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

const generateRandomColors = (length) => {
  return Array.from({ length }, () => getRandomColor());
};

const PieChart3D = ({ rawData = [], title = "Sales Distribution", header}) => {
  if (!Array.isArray(rawData) || rawData.length < 2) {
    return <p>No data available</p>;
  }
  const colors = generateRandomColors(rawData.length - 1);

  const options = {
    // title: title,
    pieHole: 0.4, 
    is3D: true, 
    legend: { position: "bottom" },
    backgroundColor: "transparent",
    colors: colors
  };

  return (
    <>
      <div className="col-xl-6 col-sm-12 col-12 d-flex">
        <div className="card flex-fill default-cover mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">{header}</h4>
            {/* <div className="view-all-link">
                          <Link to="#" className="view-all d-flex align-items-center">
                            View All
                            <span className="ps-2 d-flex align-items-center">
                              <ArrowRight className="feather-16" />
                            </span>
                          </Link>
                        </div> */}
          </div>
          <div className="card-body">
            <Chart chartType="PieChart" data={rawData} options={options} width="100%" height="400px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChart3D;
