/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const Addunits = ({ handleSaveMaster, masterInput, handelMasterInput }) => {
  // `/api/GetMaster?MasterType=1&ParentID=0`
  const route = all_routes;
  return (
    <>
      {/* Add Unit */}
      <div className="modal fade" id="add-unit">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Unit</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    handleSaveMaster(e, "8");
                  }}
                >
                  <div className="modal-body custom-modal-body">
                    <div className="mb-3">
                      <label className="form-label">Unit</label>
                      <input
                        name="unit"
                        type="text"
                        className="form-control"
                        value={masterInput.unit}
                        onChange={handelMasterInput}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Alias</label>
                      <input
                        name="alias"
                        type="text"
                        className="form-control"
                        value={masterInput.alias}
                        onChange={handelMasterInput}
                        required
                      />
                    </div>
                    <div className="modal-footer-btn">
                      <Link
                        to="#"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <button className="btn btn-submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Unit */}
    </>
  );
};

export default Addunits;
