/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";



const MultiSelect = ({ options, label, value, onChange, required, dangerTag, isDisabled, isMulti = false }) => {
  return (
    <div className="mb-3 add-product">
      <label className="form-label">
        {label} <span className="text-danger">{dangerTag}</span>
      </label>
      <Select
        className="select"
        value={value}
        onChange={onChange}
        options={options}
        placeholder={`Select ${label}`}
        required={required}
        isDisabled={isDisabled}
        isMulti={isMulti}  
      />
    </div>
  );
};

export default MultiSelect;
