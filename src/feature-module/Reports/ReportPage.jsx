/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import DateRangePickerComponent from "../../ReusableComponents/DateRangePickerComponent";
import DataTable from "../../common/DataTable";
import { exportToExcel } from "../../core/utility/reuseFunctions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronUp } from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import Select from "react-select";
import StockFilter from "./stockFilter";

const ReportPage = ({
  onDateChange,
  reportTableData,
  columns,
  heading,
  productList,
  typeValue,
  asOnDate,
  onAsOnDateChange,
  productSelectValues,
  productSelect,
  dates
}) => {
  const data = useSelector((state) => state.toggle_header);
  const dispatch = useDispatch();
  const handleExcelClick = (e) => {
    e.preventDefault();
    exportToExcel(reportTableData, columns, heading);
  };
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>{heading} List</h4>
              <h6>Manage your {heading.toLowerCase()}</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  onClick={handleExcelClick}
                >
                  <ImageWithBasePath
                    src="assets/img/icons/excel.svg"
                    alt="img"
                  />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            {typeValue === "9" || typeValue === "10" ? (
              <StockFilter
                onDateChange={onDateChange}
                options={productList}
                typeValue={typeValue}
                asOnDate={asOnDate}
                onAsOnDateChange={onAsOnDateChange}
                productSelectValues={productSelectValues}
                productSelect={productSelect}
              />
            ) : (
              <div className="table-top">
                <DateRangePickerComponent value={dates} onChange={onDateChange} />
                {/* <Select options={[]}/> */}
              </div>
            )}
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={reportTableData}
                rowKey={(index) => index}
              />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default ReportPage;
