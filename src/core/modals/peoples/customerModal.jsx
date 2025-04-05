/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import ImageToBase64Converter from "../../../ReusableComponents/ImageToBase64Converter";
import ReactLoader from "../../../ReusableComponents/ReactLoader";

const CustomerModal = ({
  formData,
  handleInputChange,
  handleCountrySelectChange,
  countrySelect,
  handleImageConverted,
  imagePath,
  countryData,
  showPassword,
  handleTogglePassword,
  handleSaveCustomer,
  loading,
  handleStateSelectChange,
  stateSelect,
  stateData,
  id
}) => {
  const {
    Name,
    CompanyName,
    Address,
    Mobile,
    EmailID,
    GSTN,
    PAN,
    City,
    Description,
  } = formData;

  let pathname = window.location.pathname || ''
 
  return (
    <>
      {/* Add Customer */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered modal-lg custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  {loading ? (
                    <ReactLoader
                      loaderClass="position-absolute"
                      loading={loading}
                    />
                  ) : null}
                  <div className="page-title">
                    <h4>{id === "1"? "Add Customer" : "Add Supplier"}</h4>
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
                  <form onSubmit={handleSaveCustomer}>
                    <div className="row">
                      <div className="col-lg-12">
                        <ImageToBase64Converter
                          onImageConverted={handleImageConverted}
                          imagePath={imagePath}
                        />
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">
                            Name <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={Name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">
                            {/* Email {pathname != "/add-enquiry"?<sapn className="text-danger">*</sapn> : ""} */}
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="EmailID"
                            value={EmailID}
                            onChange={handleInputChange}
                            // required = {pathname === "/add-enquiry" ? false : true}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label className="mb-2">
                            Mobile No. <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            className="form-control form-control-lg group_formcontrol"
                            id="phone"
                            name="Mobile"
                            type="text"
                            value={Mobile}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">{id === "1"? "Customer Name" : "Supplier Name"}</label>
                          <input
                            type="text"
                            className="form-control"
                            name="CompanyName"
                            value={CompanyName}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">GST</label>
                          <input
                            type="text"
                            className="form-control"
                            name="GSTN"
                            value={GSTN}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label className="mb-2">PAN</label>
                          <input
                            className="form-control form-control-lg group_formcontrol"
                            id="phone"
                            name="PAN"
                            type="text"
                            value={PAN}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label>
                            Password <sapn className="text-danger">*</sapn>
                          </label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                              name="Password"
                              value={Password}
                              onChange={handleInputChange}
                              required
                            />
                            <span
                              className={`fas toggle-password ${
                                showPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleTogglePassword}
                            />
                          </div>
                        </div>
                      </div> */}
                     
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">
                            Country <sapn className="text-danger">*</sapn>
                          </label>
                          <Select
                            className="select"
                            options={countryData}
                            value={countrySelect}
                            onChange={handleCountrySelectChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">
                            State <sapn className="text-danger">*</sapn>
                          </label>
                          <Select
                            className="select"
                            options={stateData}
                            value={stateSelect}
                            onChange={handleStateSelectChange}
                            // required
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">
                            City <sapn className="text-danger">*</sapn>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="City"
                            value={City}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 pe-0">
                        <div className="mb-3 input-blocks">
                          <label className="form-label">Address</label>
                          <textarea
                            type="text"
                            className="form-control"
                            name="Address"
                            value={Address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            name="Description"
                            value={Description}
                            onChange={handleInputChange}
                          />
                          {/* <p>Maximum 60 Characters</p> */}
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
      {/* /Add Customer */}

      {/* Edit Customer */}
      {/* <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered modal-lg custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Customer</h4>
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
                  <form>
                    <div className="modal-title-head people-cust-avatar">
                      <h6>Avatar</h6>
                    </div>
                    <div className="new-employee-field">
                      <div className="profile-pic-upload">
                        <div className="profile-pic people-profile-pic">
                          <ImageWithBasePath
                            src="assets/img/profiles/profile.png"
                            alt="Img"
                          />
                          <Link to="#">
                            <i
                              data-feather="x-square"
                              className="x-square-add"
                            />
                          </Link>
                        </div>
                        <div className="mb-3">
                          <div className="image-upload mb-0">
                            <input type="file" />
                            <div className="image-uploads">
                              <h4>Change Image</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Customer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Thomas"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue="thomas@example.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label className="mb-2">Phone</label>
                          <input
                            className="form-control form-control-lg group_formcontrol"
                            id="phone2"
                            name="phone2"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Thomas"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">GST</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue="thomas@example.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label className="mb-2">PAN</label>
                          <input
                            className="form-control form-control-lg group_formcontrol"
                            id="phone2"
                            name="phone2"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Budapester Strasse 2027259 "
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 pe-0">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <Select className="select" options={varrelOptions} />
                        </div>
                      </div>
                      <div className="col-lg-6 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <Select className="select" options={germanyOptions} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-0 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            defaultValue={""}
                          />
                          <p>Maximum 60 Characters</p>
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
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Edit Customer */}
    </>
  );
};

export default CustomerModal;
