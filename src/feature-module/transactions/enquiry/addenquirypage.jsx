/* eslint-disable react/prop-types */
import {
  ArrowLeft,
  ChevronUp,
  PlusCircle,
} from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../../Router/all_routes";
import InputField from "../../../ReusableComponents/InputField";
import Select from "react-select";
import CustomermodalPage from "../../../core/modals-js/peoples/customermodalpage";
import DatePicker from "react-datepicker";
import { Table, Button } from "antd"; // Import Ant Design Table
import { setToogleHeader } from "../../../core/redux/action";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import { InputSelectWithAdd } from "../../../ReusableComponents/InputSelect";

const AddEquiryPage = ({
  work,
  setWork,
  description,
  setDescription,
  handleAdd,
  tableData,
  columns,
  enquiryNo,
  setDate,
  date,
  partyList,
  LoadParty,
  selectPartyHandler,
  selectParty,
  handleSaveEnquiry,
  loading,
  idHandler,
  handleSelectChange,
  selectedMaster,
  masterArray
}) => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.toggle_header);
  const [customerCode, setCustomerCode] = useState(0);

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
              <h4>New Enquiry</h4>
              <h6>Create new Enquiry</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link to={route.enquirylistpage} className="btn btn-secondary">
                  <ArrowLeft className="me-2" />
                  Back to Enquiry
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

        <form onSubmit={handleSaveEnquiry}>
          <div className="card">
            <div className="card-body add-product pb-0">
              <div className="row">
                {/* Enquiry No Input */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="Name"
                      label="Enquiry No"
                      value={enquiryNo}
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
                      Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      className="form-control"
                      selected={date}
                      onChange={(date) => setDate(date)}
                      disabled={true}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                {/* Party Select */}
                <div className="col-lg-4 col-sm-6 col-12">
                  {/* <div className="mb-3 add-product">
                    <div className="add-newplus">
                      <label className="form-label">
                        Party <span className="text-danger">*</span>
                      </label>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add-units"
                      >
                        <PlusCircle className="plus-down-add" />
                        <span>Add New</span>
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={partyList}
                      value={selectParty}
                      onChange={selectPartyHandler}
                      placeholder="Choose"
                      required
                    />
                  </div> */}
                    <InputSelectWithAdd
                    label="Customer"
                    modalOpen="#add-units"
                    // onClick={() => idHandler(5)}
                    options={partyList}
                    value={selectParty}
                    onChange={selectPartyHandler}
                  />
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <InputSelectWithAdd
                    label="Source"
                    modalOpen="#add-inventory"
                    onClick={() => idHandler(5)}
                    options={masterArray.source}
                    value={selectedMaster.source}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "source")
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <InputSelectWithAdd
                    label="Purpose"
                    modalOpen="#add-inventory"
                    onClick={() => idHandler(6)}
                    options={masterArray.purpose}
                    value={selectedMaster.purpose}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "purpose")
                    }
                  />
                </div>

                {/* Work Input */}
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="Work"
                      label="Work"
                      type="text"
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description Text Area */}
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Add Button */}
                <div className="col-lg-12">
                  <div className="btn-addproduct mb-4">
                    <button className="btn btn-submit" onClick={handleAdd}>
                      Add Work & Description
                    </button>
                  </div>
                </div>
                {tableData?.length > 0 && (
                  <div className="table-responsive">
                    <Table
                      dataSource={tableData}
                      columns={columns}
                      pagination={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ant Design Table */}
          {/* <div className="card">
            <div className="card-body">
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
              />
            </div>
          </div> */}

          {/* Submit and Cancel Buttons */}
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button
                type="button"
                className="btn btn-cancel me-2"
                onClick={() => navigate(route.dashboard)}
              >
                Cancel
              </button>
              <button className="btn btn-submit">Save Enquiry</button>
            </div>
          </div>
        </form>

        {/* Modal Component */}
        <CustomermodalPage
          id={"1"}
          customerCode={customerCode}
          resetHandler={() => {}}
          setCustomerCode={setCustomerCode}
          customerDataHandler={LoadParty}
        />
      </div>
    </div>
  );
};

export default AddEquiryPage;
