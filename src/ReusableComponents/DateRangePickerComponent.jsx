/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types'; // for runtime validation (optional)
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;


const DateRangePickerComponent = ({
  format = "DD/MM/YYYY",
  showTime = false,
  picker,
  onChange,
  value,
}) => (
  <Space direction="vertical" size={12}>
    <RangePicker
      value={value}
      format={format}
      showTime={showTime}
      picker={picker}
      onChange={onChange}
    />
  </Space>
);

DateRangePickerComponent.propTypes = {
  format: PropTypes.string,
  showTime: PropTypes.bool,
  picker: PropTypes.oneOf(['date', 'week', 'month', 'quarter', 'year']),
  onChange: PropTypes.func
};

export default DateRangePickerComponent;

  export const defaultStartDate = dayjs().startOf("month");
  export const defaultEndDate = dayjs();