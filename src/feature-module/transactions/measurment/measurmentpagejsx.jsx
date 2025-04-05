/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  ArrowLeft,
  ChevronUp,
  Eye,
  Plus,
} from "feather-icons-react/build/IconComponents";
import { Modal, OverlayTrigger } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../../Router/all_routes";
import InputField from "../../../ReusableComponents/InputField";
import Select from "react-select";
import { Table, Button } from "antd";
import { setToogleHeader } from "../../../core/redux/action";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import { Tooltip } from "react-tooltip";
import WorkTable from "./workTable";
import MeasurmentWorkInputTable from "./measurmentWorkInputTable";
import WorkInputTable from "../sampling/workInputTable";
import MeasurmentUpdateWorkTable from "./measurmentUpdatedWorkTable";

const MeasurmentPageJsx = ({
  handleSaveMeasurment,
  loading,
  disabledValue,
  groupedWorkData,
  pathId,
  handleInputChange,
  workInputError,
  columns,
  work,
  setWork,
  tableData,
  handlePushToTable,
  handleUpdate,
  editingIndex,
  handleEditFromTable,
  itemNameOptions,
  type,
  handleDeleteFromTable
}) => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  // Tooltip for collapsing the header
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div className="page-wrapper">
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>{pathId === "1" ? "New Measurment" : "Edit Measurment"}</h4>
              <h6>
                {" "}
                {pathId === "1" ? "Create new Measurment" : "Edit Measurment"}
              </h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link
                  to={`/measurmentlist/${pathId}`}
                  className="btn btn-secondary"
                >
                  <ArrowLeft className="me-2" />
                  {pathId === "1"
                    ? "Back to New Measurment"
                    : "Back to Edit Measurment"}
                </Link>
              </div>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp className="feather-chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        <form onSubmit={() => {}}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="measurment"
                      label="Measurment No"
                      value={disabledValue.measurment}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <label className="form-label">
                      Measurment Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={disabledValue.measuremntDate}
                      // onChange={(date) => setDate(date)}
                      disabled={true}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-sm-6 col-12">
                <div className="mb-3 add-product">
                    <label className="form-label">
                      Visit Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={disabledValue.visitDate}
                      // onChange={(date) => setDate(date)}
                      disabled={true}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                 
                </div>

                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="from"
                      label="Type"
                      value={disabledValue.typeName}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="sampling"
                      label= {type === 0 ? "Sampling No" : type === 1 && "Enquiry No"}
                      value={disabledValue.sampling}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                  </div>
                </div>

                {/* Date Picker */}
                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <label className="form-label">
                      Enquiry Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={disabledValue.enqDate}
                      // onChange={(date) => setDate(date)}
                      disabled={true}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div> */}

                {/* Party Select */}
                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="enquiry"
                      label="Enquiry No"
                      value={disabledValue.enquiry}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                  </div>
                </div> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <label className="form-label">
                      {type === 0 ? "Sampling Date" : type === 1 && "Enquiry Date"} <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={disabledValue.samplingDate}
                      // onChange={(date) => setDate(date)}
                      disabled={true}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="party"
                      label="Party"
                      value={disabledValue.party}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                    {/* <Eye
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={handleOpenModal}
                    /> */}
                  </div>
                </div>
                {type == 0 ?(
                <WorkTable
                  data={groupedWorkData}
                  handleInputChange={handleInputChange}
                />
              ):(<>
                <MeasurmentWorkInputTable
                  workInputError={workInputError}
                  work={work}
                  setWork={setWork}
                  columns={columns}
                  tableData={tableData}
                  editingIndex={editingIndex}
                  handlePushToTable={handlePushToTable}
                  handleUpdate={handleUpdate}
                />
                  <MeasurmentUpdateWorkTable 
                  groupedWorkData={groupedWorkData}
                  itemNameOptions={itemNameOptions}
                  handleEditFromTable={handleEditFromTable}
                  handleDeleteFromTable={handleDeleteFromTable}
                />
              </>)}
                {/* <WorkInputTable
                  workInputError={workInputError}
                  work={work}
                  setWork={setWork}
                  columns={columns}
                  tableData={tableData}
                  editingIndex={editingIndex}
                  handlePushToTable={handlePushToTable}
                  handleUpdate={handleUpdate}
                /> */}
              
                {/* Grouped Table by Work */}
                {/* <UpdateWorkTable
                  groupedWorkData={groupedWorkData}
                  itemNameOptions={itemNameOptions}
                  handleEditFromTable={handleEditFromTable}
                  groupedWorkData={groupedWorkData}
                /> */}
              
             
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button type="button" className="btn btn-cancel me-2">
                Cancel
              </button>
              <button className="btn btn-submit" onClick={handleSaveMeasurment}>
                Save Measurment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasurmentPageJsx;
