/* eslint-disable react/prop-types */
import React from "react";
import DateRangePickerComponent from "../../ReusableComponents/DateRangePickerComponent";
import Select from "react-select";
import { Box, Zap } from "feather-icons-react/build/IconComponents";
import DatePicker from 'react-datepicker';

const StockFilter = ({ onDateChange, options, typeValue,asOnDate,onAsOnDateChange,productSelectValues,productSelect }) => {
    const customStyles = {
        control: (base) => ({
          ...base,
           height: typeValue === "10" ? "40px" : "32px",
        //   height: "32px",
          minHeight: "32px",
        }),
        valueContainer: (base) => ({
          ...base,
          height: typeValue === "10" ? "40px" : "32px",
          padding: "0 3px",
        }),
        input: (base) => ({
          ...base,
          height: typeValue === "10" ? "40px" : "32px",
          margin: "0", 
        }),
      };
  return (
    <>

      <div className="row m-2 ">
        <div className="col-lg-3">
            <Select 
            className="select" 
            value={productSelect}
            placeholder="Select Product..."
            options={options} 
            styles={customStyles} 
            onChange={productSelectValues}
            isClearable
            />
        </div>
        <div className="col-lg-3">
        {typeValue === "10" ?
         <DatePicker 
         className="form-control"  
         selected={asOnDate}
         onChange={onAsOnDateChange}
         dateFormat="dd/MMM/yyyy"/> : 
         <DateRangePickerComponent 
         onChange={onDateChange} />
        }
        </div>
       
      </div>
    </>
  );
};

export default StockFilter;
