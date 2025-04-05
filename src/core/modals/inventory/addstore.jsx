/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../ReusableComponents/InputField";

const AddStore = ({ masterInput, handleSaveMaster, handelMasterInput }) => {
  return (
    <>
      {/* Add Category */}
      <div className="modal fade" id="add-units-store">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add New Store</h4>
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
                    handleSaveMaster(e, "10");
                  }}
                >
                  <div className="modal-body custom-modal-body">
                    <div className="mb-3">
                      <InputField
                        label="Name"
                        name="store"
                        type="text"
                        value={masterInput.store}
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

export default AddStore;
