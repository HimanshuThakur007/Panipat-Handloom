/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../ReusableComponents/InputField";

const AddWarehouse = ({ masterInput, handleSaveMaster, handelMasterInput }) => {
  return (
    <>
      {/* Add Category */}
      <div className="modal fade" id="add-units-warehouse">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add New Warehouse</h4>
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
                    handleSaveMaster(e, "11");
                  }}
                >
                  <div className="modal-body custom-modal-body">
                    <div className="mb-3">
                      <InputField
                        label="Name"
                        name="warehouse"
                        type="text"
                        value={masterInput.warehouse}
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
      {/* /Add Category */}
    </>
  );
};

export default AddWarehouse;
