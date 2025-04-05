/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  PlusCircle,
  Sliders,
  StopCircle,
  User,
  Zap,
} from "react-feather";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import Select from "react-select";

const TableTop = ({isFilterVisible,toggleFilterVisibility,options,handleSearch}) => {
  return (
    <>
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
          <Link
            className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
            id="filter_search"
          >
            <Filter className="filter-icon" onClick={toggleFilterVisibility} />
            <span onClick={toggleFilterVisibility}>
              <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
            </span>
          </Link>
        </div> */}
        {/* <div className="form-sort">
          <Sliders className="info-img" />
          <Select
            className="select"
            options={options}
            placeholder="Newest"
          />
        </div> */}
      </div>
    </>
  );
};

export default TableTop;
