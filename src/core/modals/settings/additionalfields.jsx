/* eslint-disable react/prop-types */
import React, { useState } from "react";
import InputField from "../../../ReusableComponents/InputField";
import InputSelect from "../../../ReusableComponents/InputSelect";

const Additionalfields = ({
  typefields,
  label,
  handleLabelChange,
  handelSelectedValue,
  selectedValue,
  addField,
  editCode,
  catrgoryData
}) => {
  return (
    <>
      <div>
        {/* Add Additional Field */}
        <div className="modal fade" id="add-additional-field">
          <div className="modal-dialog modal-dialog-centered custom-modal-two">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Add New Additional Fields</h4>
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
                    <form onSubmit={addField}>
                      <div className="row">
                      {/* <div className="col-lg-12">
                          <InputSelect 
                          label="Category"
                          dangerTag="*"
                          options={catrgoryData}
                          value={selectedValue.category}
                          onChange={(selectedOption)=>handelSelectedValue(selectedOption,'category')}
                          required
                          isDisabled={editCode != 1 ? false : true}
                          />
                        </div> */}
                        <div className="col-lg-12">
                            <InputField
                              label="Name"
                              dangerTag="*"
                              value={label}
                              onChange={handleLabelChange}
                              required
                            />
                        </div>
                        {/* {editCode != 1 ? ( */}
                        <div className="col-lg-12">
                          <InputSelect 
                          label="Field Type"
                          dangerTag="*"
                          options={typefields}
                          value={selectedValue.type}
                          onChange={(selectedOption)=>handelSelectedValue(selectedOption,'type')}
                          required
                          isDisabled={editCode != 1 ? false : true}
                          />
                        </div>
                        {/* ):""} */}
                      </div>
                      <div className="modal-footer-btn">
                        <button
                          type="button"
                          className="btn btn-cancel me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button className="btn btn-submit">Add Field</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Additionalfields;
