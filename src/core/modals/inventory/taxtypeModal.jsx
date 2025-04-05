/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";

const TaxTypeModal = ({
  handleSaveMaster,
  masterInput,
  handelMasterInput,
}) => {
  let route = all_routes;
  return (
    <>
      <div className="modal fade" id="add-units-taxtype">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add New Tax Type</h4>
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
                    handleSaveMaster(e, "9");
                  }}
                >
                  <div className="modal-body custom-modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        name="tax"
                        type="text"
                        className="form-control"
                        value={masterInput.tax}
                        onChange={handelMasterInput}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tax %</label>
                      <input
                        name="taxPer"
                        type="text"
                        className="form-control"
                        value={masterInput.taxPer}
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
    </>
  );
};

export default TaxTypeModal;
