/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
// import { all_routes } from "../../Router/all_routes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../../Router/all_routes";
import Brand from "../../../core/modals/inventory/brand";
import { setToogleHeader } from "../../../core/redux/action";
import { IoIosPricetags } from "react-icons/io";
import InputSelect from '../../../ReusableComponents/InputSelect';
import InputField from '../../../ReusableComponents/InputField';
import { Table } from 'antd';
import DatePickerComponent from '../../../ReusableComponents/DatePickerComponent';

const CustomerMapping = ({
    columns,
    dataSource,
    handleSave,
    loadCustomerTable,
    customerList,
    selectedCustomer,
    handelCustomerSelect
  }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
  
    const renderRefreshTooltip = (props) => (
      <Tooltip id="refresh-tooltip" {...props}>
        Refresh
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
            <h4>Salesman Mapping List</h4>
            <h6>Manage your salesman mapping</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <Link data-bs-toggle="tooltip" data-bs-placement="top">
                <RotateCcw />
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
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setToogleHeader(!data));
                }}
              >
                <ChevronUp />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
      <div className="card table-list-card">
        <div className="card-body">
          {/* <ul className="nav nav-tabs nav-tabs-bottom mb-3">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="#bottom-tab1"
                data-bs-toggle="tab"
                onClick={() => getTabId("tab1")}
              >
                <IoIosPricetags size={20} /> Website Manager
              </Link>
            </li>
          </ul> */}
          <div className="p-4">
            <div className='row'>
                
                <div className='col-lg-4'><InputSelect label="Customer Type" options={customerList} value={selectedCustomer} onChange={handelCustomerSelect}/></div>
                <div className='col-lg-2 mt-4 p-1'>
                    <button
                className="btn btn-submit"
                onClick={loadCustomerTable}
              >
                Load customer
              </button>
                </div>
            </div>
            {/* <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control form-control-sm formsearch"
                />
                <Link to className="btn btn-searchset">
                  <i data-feather="search" className="feather-search" />
                </Link>
                <InputSelect label="Product Group"/>
                <InputField label="date"/>
              </div>
            </div> */}
            {/* <div className="search-path">
              <button
                className="btn btn-submit"
                onClick={(e) => handleSeoSave(e)}
              >
                Load price list
              </button>
            </div> */}
          </div>

          <div className="tab-content">
            <div
              className="tab-pane show active"
              id="bottom-tab1"
              key={"tab1"}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  rowKey={(record) => record.code}
                  pagination={false}
                />
              </div>
              {/* <div className="col-12 d-flex justify-content-end p-4">
                <button
                  className="btn btn-submit"
                  onClick={(e) => handleSave(e)}
                >
                  Update
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Brand />
    </div>
  </div>
  )
}

export default CustomerMapping