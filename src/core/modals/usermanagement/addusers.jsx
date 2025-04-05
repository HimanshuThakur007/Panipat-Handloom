/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Select from "react-select";
import ImageToBase64Converter from "../../../ReusableComponents/ImageToBase64Converter";

const AddUsers = ({
  handleImageConverted,
  showPassword,
  handleTogglePassword,
  showConfirmPassword,
  handleToggleConfirmPassword,
  status,
  handleInputChange,
  formData,
  roleSelect,
  handleSelectChange,
  handleSaveUser,
  imagePath,
  errors,
  route,
  navigate,
}) => {
  const { UserName, Mobile, EmailID, Password, confirmPassword, Description } =
    formData;

  return (
    <div>
      {/* Add User */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered modal-lg custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add User</h4>
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
                  <form onSubmit={handleSaveUser}>
                    <div className="row">
                      <div className="col-lg-12">
                        <ImageToBase64Converter
                          onImageConverted={handleImageConverted}
                          imagePath={imagePath}
                        />
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>
                            User Name <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            type="text"
                            name="UserName"
                            className={
                              errors.UserName
                                ? "form-control is-invalid shakersss"
                                : "form-control"
                            }
                            value={UserName}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.UserName && (
                            <div className="invalid-feedback">
                              {errors.UserName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>
                            Mobile No. <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            type="number"
                            className={
                              errors.Mobile
                                ? "form-control is-invalid shakersss"
                                : "form-control"
                            }
                            name="Mobile"
                            id="validationServer04"
                            value={Mobile}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.Mobile && (
                            <div className="invalid-feedback">
                              {errors.Mobile}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>
                            Email <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            type="email"
                            className={
                              errors.EmailID
                                ? "form-control is-invalid shakersss"
                                : "form-control"
                            }
                            name="EmailID"
                            value={EmailID}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.EmailID && (
                            <div className="invalid-feedback">
                              {errors.EmailID}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>
                            Role <sapn className="text-danger">*</sapn>
                          </label>

                          <Select
                            className="select"
                            options={status}
                            value={roleSelect}
                            onChange={handleSelectChange}
                            placeholder="Choose Status"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* <div className="input-blocks">
                          <label>Password <sapn className="text-danger">*</sapn></label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className={errors.Password ? "form-control pass-input is-invalid shakersss":"pass-input"}
                              placeholder="Enter your password"
                              name="Password"
                              value={Password}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="d-flex"></span>
                            <span
                              className={`fas toggle-password ${
                                showPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleTogglePassword}
                            />
                             {errors.Password && (
                          <span className="invalid-feedback">
                            {errors.Password}
                          </span>)}
                          </div>
                        </div> */}

                        <div className="input-blocks">
                          <label>
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="pass-group">
                            <input
                              type={
                                errors.Password
                                  ? "text"
                                  : showPassword
                                  ? "text"
                                  : "password"
                              }
                              className={
                                errors.Password
                                  ? "form-control pass-input is-invalid shakersss"
                                  : "pass-input"
                              }
                              placeholder="Enter your password"
                              name="Password"
                              value={Password}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="d-flex"></span>
                            {!errors.Password && (
                              <span
                                className={`fas toggle-password ${
                                  showPassword ? "fa-eye" : "fa-eye-slash"
                                }`}
                                onClick={handleTogglePassword}
                              />
                            )}
                            {errors.Password && (
                              <span className="invalid-feedback">
                                {errors.Password}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>
                            Confirm Passworrd{" "}
                            <sapn className="text-danger">*</sapn>
                          </label>
                          <div className="pass-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={handleInputChange}
                              required
                            />
                            <span
                              className={`fas toggle-password ${
                                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleToggleConfirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-0 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            name="Description"
                            value={Description}
                            onChange={handleInputChange}
                          />
                          <p>Maximum 600 Characters</p>
                        </div>
                      </div>
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add User */}
    </div>
  );
};

export default React.memo(AddUsers);
