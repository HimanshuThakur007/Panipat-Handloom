/* eslint-disable react/prop-types */
import { ChevronDown, List } from "feather-icons-react/build/IconComponents";
import React from "react";
import { Link } from "react-router-dom";

const CustomFieldAccordian = ({ checkboxes, handleCheckboxChange }) => {
  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample4">
        <div className="accordion-item">
          <div className="accordion-header" id="headingFour">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-controls="collapseFour"
            >
              <div className="text-editor add-list">
                <div className="addproduct-icon list">
                  <h5>
                    <List className="add-info" />
                    <span>Custom Fields</span>
                  </h5>
                  <Link to="#">
                    <ChevronDown className="chevron-down-add" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            id="collapseFour"
            className="accordion-collapse collapse show"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample4"
          >
            <div className="accordion-body">
              <div className="text-editor add-list add">
                <div className="custom-filed">
                  <div className="input-block add-lists">
                    <label className="checkboxs">
                      <input
                        id="warranties"
                        type="checkbox"
                        checked={checkboxes.warranties === 1}
                        onChange={() => handleCheckboxChange("warranties")}
                      />
                      <span className="checkmarks" />
                      Warranties
                    </label>
                    <label className="checkboxs">
                      <input
                        id="manufacturer"
                        type="checkbox"
                        checked={checkboxes.manufacturer === 1}
                        onChange={() => handleCheckboxChange("manufacturer")}
                      />
                      <span className="checkmarks" />
                      Manufacturer
                    </label>
                    <label className="checkboxs">
                      <input
                        id="expiry"
                        type="checkbox"
                        checked={checkboxes.expiry === 1}
                        onChange={() => handleCheckboxChange("expiry")}
                      />
                      <span className="checkmarks" />
                      Expiry
                    </label>
                  </div>
                </div>
                {/* <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks add-product">
                              <label>Discount Type</label>
                              <Select
                                className="select"
                                options={discounttype1}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks add-product">
                              <label>Quantity Alert</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks">
                              <label>Manufactured Date</label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  selected={selectedDate}
                                  onChange={handleDateChange}
                                  type="date"
                                  className="datetimepicker"
                                  dateFormat="dd-MM-yyyy"
                                  placeholder="Choose Date"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="input-blocks">
                              <label>Expiry On</label>
                              <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  selected={selectedDate1}
                                  onChange={handleDateChange1}
                                  type="date"
                                  className="datetimepicker"
                                  dateFormat="dd-MM-yyyy"
                                  placeholder="Choose Date"
                                />
                              </div>
                            </div>
                          </div>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFieldAccordian;
