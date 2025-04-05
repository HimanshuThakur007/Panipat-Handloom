/* eslint-disable react/prop-types */
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const InputSelect = ({options,label,value,onChange,required,dangerTag,isDisabled}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: "38px",
      minHeight: "38px",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "38px", 
      padding: "0 6px",
    }),
    input: (base) => ({
      ...base,
      height: "38px",
      margin: "0", 
    }),
  };
  return (
    <>
      <div className="mb-3 add-product">
        <label className="form-label">{label} <span className="text-danger">{dangerTag}</span></label>
        <Select
          className="select"
          value={value}
          onChange={onChange}
          options={options}
          placeholder={`Select ${label}`}
          required={required}
          isDisabled={isDisabled}
          styles={customStyles}
          // isClearable
        />
      </div>
    </>
  );
};

export default InputSelect;

export const InputSelectWithAdd = ({
  options,
  label,
  value,
  onChange,
  required,
  dangerTag,
  isDisabled,
  modalOpen,
  onClick
}) => {
  const customStyles = {
    singleValue: (base) => ({
      ...base,
      // color: value ? "#FF9F43" : base.color, 
    }),
  };
  return (
    <>
      <div className="mb-3 add-product">
        <div className="add-newplus">
          <label className="form-label">
            {label} <span className="text-danger">{dangerTag}</span>
          </label>
          <Link to="#" data-bs-toggle="modal" data-bs-target={modalOpen} onClick={onClick}>
            <PlusCircle className="plus-down-add" />
            <span>Add New</span>
          </Link>
        </div>
        <Select
          className="select"
          value={value}
          onChange={onChange}
          options={options}
          placeholder={`Select ${label}`}
          required={required}
          isDisabled={isDisabled}
          styles={customStyles}
        />
      </div>
    </>
  );
};

