/* eslint-disable react/prop-types */
import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ data, categories, height = 273, color = "#FF9F43",header }) => {
    console.log('data===>',data,"category===>", categories)
    const maxDataValue = data.length > 0 ? Math.ceil(Math.max(...data)) : 60
    console.log("maxDataValue",maxDataValue)
    const formatValue = (val) => {
        if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr"; // 1Cr = 10,000,000
        if (val >= 100000) return (val / 100000).toFixed(1) + "L"; // 1L = 100,000
        if (val >= 1000) return (val / 1000).toFixed(1) + "K"; // 1K = 1,000
        return val; // If less than 1000, show as is
      };
  const options = {
    series: [
      {
        name: "Sales Analysis",
        data: data || [],
      },
    ],
    chart: {
      height,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    colors: [color],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      categories:
        categories || [ ],
        
    },
    yaxis: {
        min: 0, 
        max: maxDataValue,
        tickAmount: 5,
        labels: {
            // formatter: (val) => val + "K",
            formatter: (val) => formatValue(val),
        },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

//   return <Chart options={options} series={options.series} type="area" height={height} />;
return (
    <>
     <div className="col-xl-12 col-sm-12 col-12 d-flex">
            <div className="card flex-fill default-cover mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">{header}</h4>
               
              </div>
              <div className="card-body">
              <Chart options={options} series={options.series} type="area" height={height} />
              </div>
            </div>
          </div>
    </>
)
};

export default AreaChart;
