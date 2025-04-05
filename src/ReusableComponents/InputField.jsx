/* eslint-disable react/prop-types */
import React from "react";

const InputField = ({label,name,type,value,onChange,required,dangerTag,min,inputLimit,disabled,className = "",error}) => {
  return (
    <>
      <div className="mb-3 add-product">
        <label className="form-label">{label} <span className="text-danger">{dangerTag}</span></label>
        <input type={type} name={name} className={`form-control ${className}`} value={value} onChange={onChange} required={required} min={min} disabled={disabled}/>
        <span>{error && <span className="text-danger mt-1">{error}</span>}</span>
        <span className="form-label">{inputLimit}</span>
      </div>
    </>
  );
};

export default InputField;
