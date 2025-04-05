/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import ImageToBase64Converter from "../../../ReusableComponents/ImageToBase64Converter";

const AddSubcategory = ({
  catrgoryTable,
  selectCategory,
  handleCategoryChange,
  formData,
  handleSaveMaster,
  handelInputChange,
  handleImageConverted,
  imagePath
}) => {
  const categories = catrgoryTable?.map((category) => ({
    value: category.code,
    label: category.name,
  }));

  console.log("selectCategory", selectCategory);

  return (
    <div>
      {/* Add Category */}
      <div className="modal fade" id="add-category">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Create Catalogue</h4>
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
                  <form onSubmit={(e) => handleSaveMaster(e, "6")}>
                  <div className="col-lg-12">
                        <ImageToBase64Converter
                          onImageConverted={handleImageConverted}
                          imagePath={imagePath}
                        />
                      </div>
                    {/* <div className="mb-3">
                      <label className="form-label">Sagment</label>
                      <Select
                        className="select"
                        options={categories}
                        value={selectCategory}
                        onChange={handleCategoryChange}
                      />
                    </div> */}
                    <div className="mb-3">
                      <label className="form-label">Catalogue Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="subCategory"
                        value={formData.subCategory}
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
                   
                    {/* <div className="mb-3">
                                            <label className="form-label">Category Code</label>
                                            <input type="text" className="form-control" />
                                        </div> */}
                    {/* <div className="mb-3 input-blocks">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" defaultValue={""} />
                                        </div> */}
                    {/* <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input
                                                    type="checkbox"
                                                    id="user2"
                                                    className="check"
                                                    defaultChecked="true"
                                                />
                                                <label htmlFor="user2" className="checktoggle" />
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
      {/* /Add Category */}
    </div>
  );
};

export default AddSubcategory;
