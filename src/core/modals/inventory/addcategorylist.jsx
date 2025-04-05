/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import InputToggel from '../../../ReusableComponents/InputToggel';
import ImageToBase64Converter from '../../../ReusableComponents/ImageToBase64Converter';
import InputField from '../../../ReusableComponents/InputField';

const AddCategoryList = ({handelCategoryInput,handleSaveMaster,formData,values,imagePath,handleValueChange,handleImageConverted}) => {
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
                    {/* <h4>Add New Category</h4> */}
                    <h4>Add New Sagment</h4>
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
                    handleSaveMaster(e, "4");
                  }}
                >
                  <div className="modal-body custom-modal-body">
                  <div className="col-lg-12">
                        <ImageToBase64Converter
                          onImageConverted={handleImageConverted}
                          imagePath={imagePath}
                        />
                      </div>
                    <div className="mb-3">
                      <InputField
                        label="Name"
                        name="category"
                        dangerTag="*"
                        type="text"
                        value={formData.category}
                        onChange={handelCategoryInput}
                        required
                      />

                    </div>
                    <div className="mb-3">
                      <InputField
                        label="Alias"
                        dangerTag="*"
                        name="alias"
                        type="text"
                        value={formData.alias}
                        onChange={handelCategoryInput}
                        required
                      />

                    </div>
                      {/* <InputToggel id="subcat" labelName="Catalogue"  initialValue={values.subcat} 
                      onValueChange={handleValueChange}/> */}
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
        </div>
    )
}

export default AddCategoryList
