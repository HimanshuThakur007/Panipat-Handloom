/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, FileText, PlusCircle, RotateCcw, Sliders, StopCircle, User, } from 'feather-icons-react/build/IconComponents';
import Select from 'react-select';
import { DatePicker, Table } from 'antd';
import { Filter } from 'react-feather';

const OrderListPage = ({orderTableData, columns, handleSearch}) => {
   
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
      setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    return (
      <div>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Order List</h4>
                  <h6>Manage Your Order</h6>
                </div>
              </div>
            
             
            </div>
            {/* /product list */}
            <div className="card table-list-card">
              <div className="card-body">
                <div className="table-top">
                  <div className="search-set">
                    <div className="search-input">
                      <input
                        type="text"
                        placeholder="Search"
                        className="form-control form-control-sm formsearch"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <Link to className="btn btn-searchset">
                        <i data-feather="search" className="feather-search" />
                      </Link>
                    </div>
                  </div>
                  {/* <div className="search-path">
                                    <div className="d-flex align-items-center">
                                        <div className="search-path">
                                            <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                                <Filter
                                                    className="filter-icon"
                                                    onClick={toggleFilterVisibility}
                                                />
                                                <span onClick={toggleFilterVisibility}>
                                                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="form-sort">
                                    <Sliders className="info-img" />
                                    <Select
                                        className="select"
                                        options={oldandlatestvalue}
                                        placeholder="Newest"
                                    />
                                </div> */}
                                </div>

                  {/* /Filter */}
                  {/* <div
                                className={`card${isFilterVisible ? ' visible' : ''}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? 'block' : 'none' }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="user" className="info-img" />
                                                <User className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={customername}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <FileText className="info-img" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Reference"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={paymentstatus}
                                                    placeholder="Choose Payment Status"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Link className="btn btn-filters ms-auto">
                                                    {" "}
                                                    <i data-feather="search" className="feather-search" />{" "}
                                                    Search{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* /Filter */}
            
                <div className="table-responsive">
                  <Table
                  className="table datanew dataTable no-footer"
                    columns={columns}
                    dataSource={orderTableData}
                    rowKey={(record) => record.id}
                  />
                </div>
              </div>
            </div>
            {/* /product list */}
          </div>
        </div>
        <>
          <div className="customizer-links" id="setdata">
            <ul className="sticky-sidebar">
              <li className="sidebar-icons">
                <Link
                  to="#"
                  className="navigation-add"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-original-title="Theme"
                >
                  <i data-feather="settings" className="feather-five" />
                </Link>
              </li>
            </ul>
          </div>
        </>
      </div>
      
    );
}

export default OrderListPage
