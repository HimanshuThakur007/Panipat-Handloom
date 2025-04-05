/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, Filter, PlusCircle, RotateCcw, Sliders, StopCircle, Zap } from 'feather-icons-react/build/IconComponents';
import Layout from 'feather-icons-react/build/IconComponents/Layout';
import Select from 'react-select';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable.jsx'
import AddShift from '../../core/modals/hrm/addshift.jsx';
import EditShift from '../../core/modals/hrm/editshift.jsx';
import { setToogleHeader } from '../../core/redux/action.jsx';

const ReportsPage = ({columns,reportName}) => {
    const dataSource = useSelector((state) => state.shiftlist_data);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };
    const [isLayoutVisible, setIsLayoutVisible] = useState(false);
    const handleLayoutClick = () => {
        setIsLayoutVisible(!isLayoutVisible);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const oldandlatestvalue = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const status = [
        { value: 'Choose Status', label: 'Choose Status' },
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];
    const shift = [
        { value: 'Choose Shift', label: 'Choose Shift' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Rotating', label: 'Rotating' },
        { value: 'Split', label: 'Split' },
        { value: 'On-Call', label: 'On-Call' },
        { value: 'Weekend', label: 'Weekend' },
    ];


    const renderTooltip = (props) => (
        <Tooltip id="pdf-tooltip" {...props}>
            Pdf
        </Tooltip>
    );
    const renderExcelTooltip = (props) => (
        <Tooltip id="excel-tooltip" {...props}>
            Excel
        </Tooltip>
    );
    const renderPrinterTooltip = (props) => (
        <Tooltip id="printer-tooltip" {...props}>
            Printer
        </Tooltip>
    );
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
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>{reportName}</h4>
                                <h6>Manage your employees {reportName}</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                    <Link>
                                        <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i data-feather="printer" className="feather-printer" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
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
                                        onClick={() => {dispatch(setToogleHeader(!data)) }}
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
                            <div className="table-top">
                            <div className="search-set">
                            <div className="search-input">
                              <input
                                type="text"
                                placeholder="Search"
                                className="form-control form-control-sm formsearch"
                              />
                              <Link to className="btn btn-searchset">
                                <i data-feather="search" className="feather-search" />
                              </Link>
                            </div>
                          </div>
                                {/* <div className="search-path">
                                    <div className="d-flex align-items-center">
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
                                className={`card${isFilterVisible ? " visible" : ""}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? "block" : "none" }}
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Zap className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={shift}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <div className="input-groupicon">
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        type="date"
                                                        className="filterdatepicker"
                                                        dateFormat="dd-MM-yyyy"
                                                        placeholder='Choose Date'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <StopCircle className="info-img" />

                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Newest"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
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
                                <Table columns={columns} dataSource={dataSource} />
                            </div>
                        </div>
                    </div>
                    {/* /product list */}
                </div>
            </div>
            <AddShift />
            <EditShift />
        </div>
    )
}

export default ReportsPage
