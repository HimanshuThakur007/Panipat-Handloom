/* eslint-disable react/prop-types */
import React from "react";

const AddBrand = ({ handelInputChange, formData, handleSaveMaster }) => {
  return (
    <>
      {/* Add Brand */}
      <div className="modal fade" id="add-brand">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Create Brand</h4>
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
                <div className="modal-body custom-modal-body new-employee-field">
                  <form onSubmit={(e) => handleSaveMaster(e, "7")}>
                    <div className="mb-3">
                      <label className="form-label">Brand <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handelInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Alias <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="alias"
                        value={formData.alias}
                        onChange={handelInputChange}
                        required
                      />
                    </div>

                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                      Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Brand */}
    </>
  );
};

export default AddBrand;
