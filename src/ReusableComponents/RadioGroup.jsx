
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({ options, selectedValue, onChange, required, name }) => {
  return (
    <div className="d-flex justify-content-between">
      {options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            style={{ height: '15px', width: '15px', cursor: 'pointer' }}
            className="form-check-input"
            type="radio"
            id={option.value}
            name={name} 
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// PropTypes validation to avoid errors
RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired, 
};

// Default props for 'required'
RadioGroup.defaultProps = {
  required: false,
};

export default RadioGroup;
