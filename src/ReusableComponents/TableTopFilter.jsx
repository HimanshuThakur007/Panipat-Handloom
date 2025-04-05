/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import { Filter, PlusCircle, Sliders, StopCircle, User, Zap } from 'react-feather';

const TableTopFilter = ({isFilterVisible,newestOptions,statusOptions,roleOptions}) => {
  return (
    <>
      <div
        className={`card${isFilterVisible ? " visible" : ""}`}
        id="filter_inputs"
        style={{ display: isFilterVisible ? "block" : "none" }}
      >
        <div className="card-body pb-0">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="input-blocks">
                <User className="info-img" />

                <Select
                  className="select"
                  options={newestOptions}
                  placeholder="Newest"
                />
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="input-blocks">
                <StopCircle className="info-img" />

                <Select
                  className="select"
                  options={statusOptions}
                  placeholder="Choose Status"
                />
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="input-blocks">
                <Zap className="info-img" />

                <Select
                  className="select"
                  options={roleOptions}
                  placeholder="Choose Role"
                />
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="input-blocks">
                <a className="btn btn-filters ms-auto">
                  {" "}
                  <i
                    data-feather="search"
                    className="feather-search"
                  /> Search{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableTopFilter;
