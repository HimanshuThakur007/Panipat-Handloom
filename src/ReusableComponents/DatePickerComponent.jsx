/* eslint-disable react/prop-types */

// DatePickerComponent.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './DatePickerComponent.css';

const DatePickerComponent = ({
  selectedDate,
  onDateChange,
  dateFormat = 'DD/MMM/YYYY',
  placeholder = 'Select a date',
  isDisabled
}) => {
  const handleChange = (date) => {
    onDateChange(date ? moment(date).format(dateFormat) : null);
  };

  const formattedDate = selectedDate ? moment(selectedDate, dateFormat).format(dateFormat) : '';

  return (
    <div className="date-picker-container">
      {isDisabled ? (
        <input
          type="text"
          value={formattedDate}
          readOnly
          placeholder={placeholder}
          className="date-picker"
          style={{background:'gainsboro'}}
        />
      ) : (
        <DatePicker
          selected={selectedDate ? moment(selectedDate, dateFormat).toDate() : null}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          className="date-picker"
        />
      )}
    </div>
  );
};

export default DatePickerComponent;
