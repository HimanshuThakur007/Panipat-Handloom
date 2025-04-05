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
import WorkInputTable from "./workInputTable";
import UpdateWorkTable from "./updateWorkTable";
import PartyDetailModal from "./partydetailmodal";
import { Tooltip } from "react-tooltip";
import { partyDetails } from "./samplingcolumn";

const SamplingPageJsx = ({
  workInputError,
  handleSaveSample,
  loading,
  columns,
  work,
  setWork,
  tableData,
  editingIndex,
  handlePushToTable,
  handleUpdate,
  groupedWorkData,
  itemNameOptions,
  handleEditFromTable,
  handleDeleteFromTable,
  disabledValue,
  pathId,
  partyDetailTable,
}) => {
  const route = all_routes;
  const pColumns = partyDetails;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
              <h4>{pathId === "1" ? "New Sampling" : "Edit Sampling"}</h4>
              <h6>
                {" "}
                {pathId === "1" ? "Create new Sampling" : "Edit Sampling"}
              </h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link
                  to={`/samplinglist/${pathId}`}
                  className="btn btn-secondary"
                >
                  <ArrowLeft className="me-2" />
                  {pathId === "1"
                    ? "Back to New Sampling"
                    : "Back to Edit Sampling"}
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
                      name="sampling"
                      label="Sampling No"
                      value={disabledValue.sampling}
                      type="text"
                      dangerTag="*"
                      disabled
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="col-lg-4 col-sm-6 col-12">
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
                </div>

                {/* Party Select */}
                <div className="col-lg-4 col-sm-6 col-12">
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
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <label className="form-label"></label>
                    <div className="col-12 d-flex align-items-center justify-content-end">
                      <Eye
                        className="ms-3"
                        style={{ cursor: "pointer", color: "#5ab8fb" }}
                        onClick={handleOpenModal}
                        data-tooltip-id="party-tooltip"
                        data-tooltip-content="Click here to see enquiry details"
                      />
                    </div>
                    <Tooltip id="party-tooltip" />
                  </div>
                </div>

                {/* Work Input */}

                <WorkInputTable
                  workInputError={workInputError}
                  work={work}
                  setWork={setWork}
                  columns={columns}
                  tableData={tableData}
                  editingIndex={editingIndex}
                  handlePushToTable={handlePushToTable}
                  handleUpdate={handleUpdate}
                  
                />

                {/* Grouped Table by Work */}
                <UpdateWorkTable
                  groupedWorkData={groupedWorkData}
                  itemNameOptions={itemNameOptions}
                  handleEditFromTable={handleEditFromTable}
                  handleDeleteFromTable={handleDeleteFromTable}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button type="button" className="btn btn-cancel me-2">
                Cancel
              </button>
              <button className="btn btn-submit" onClick={handleSaveSample}>
                Save Sampling
              </button>
            </div>
          </div>
        </form>
      </div>
      <PartyDetailModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        columns={pColumns}
        tableData={partyDetailTable}
      />
    </div>
  );
};

export default SamplingPageJsx;
