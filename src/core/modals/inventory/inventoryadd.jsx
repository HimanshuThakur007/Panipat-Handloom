/* eslint-disable react/prop-types */
import React from "react";

const AddInventory = ({
  formData,
  id,
  handelInputChange,
  handleSaveMaster,
}) => {
  console.log(id, "id from Master")
  return (
    <div>
      {/* Edit Category */}
      <div className="modal fade" id="add-inventory">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>
                      Add{" "}
                      {id == 1
                        ? "Product Type"
                        : id == 2
                        ? "Tax Type"
                        : id == 3
                        ? "Store"
                        : id == 4
                        ? "WareHouse"
                        : id == 5
                        ? "Source"
                        : id == 6
                        ? "Purpose"
                        : ""}
                    </h4>
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
                <div className="modal-body custom-modal-body">
                  <form
                    onSubmit={(e) =>
                      handleSaveMaster(
                        e,
                        id === "1"
                          ? "5"
                          : id === "2"
                          ? "9"
                          : id === "3"
                          ? "10"
                          : id === "4"
                          ? "11"
                          : id === "5"
                          ? "12"
                          : id === "6"
                          ? "13"
                          : ""
                      )
                    }
                  >
                    <div className="mb-3">
                      <label className="form-label">
                        {" "}
                        {id == 1
                          ? "Product Type"
                          : id == 2
                          ? "Tax Type"
                          : id == 3
                          ? "Store"
                          : id == 4
                          ? "WareHouse"
                          : id == 5
                          ? "Source"
                          : id == 6
                          ? "Purpose"
                          : ""}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={
                          id == 1
                            ? "productType"
                            : id == 2
                            ? "taxType"
                            : id == 3
                            ? "Store"
                            : id == 4
                            ? "WareHouse"
                            : id == 5
                            ? "source"
                            : id == 6
                            ? "purpose"
                            : ""
                        }
                        value={
                          id == 1
                            ? formData.productType
                            : id == 2
                            ? formData.taxType
                            : id == 3
                            ? formData.store
                            : id == 4
                            ? formData.wareHouse
                            : id == 5
                            ? formData.source
                            : id == 6
                            ? formData.purpose
                            :''
                        }
                        onChange={handelInputChange}
                        required
                      />
                    </div>
                    {id == 1 || id == 2 ? (
                    <div className="mb-3">
                      <label className="form-label">
                        {id === "2" ? "Tax %" : "Alias"}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name={id === "2" ? "taxPer" : "alias"}
                        type="text"
                        className="form-control"
                        value={id === "2" ? formData.taxPer : formData.alias}
                        onChange={handelInputChange}
                        required
                      />
                    </div>
                    ): null} 
                    {/* <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input
                                                    type="checkbox"
                                                    id="user3"
                                                    className="check"
                                                    defaultChecked="true"
                                                />
                                                <label htmlFor="user3" className="checktoggle" />
                                            </div>
                                        </div> */}
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
      {/* /Edit Category */}
    </div>
  );
};

export default AddInventory;
