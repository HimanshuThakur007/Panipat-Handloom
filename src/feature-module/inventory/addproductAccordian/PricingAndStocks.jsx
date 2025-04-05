/* eslint-disable react/prop-types */
import React from "react";
import InputField from "../../../ReusableComponents/InputField";
import {
  ChevronDown,
  Info,
  LifeBuoy,
  PlusCircle,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import { Link } from "react-router-dom";
import PriceTypeAccordian from "./PriceTypeAccordian";
import QuantityTypeAccordian from "./QuantityTypeAccordian";
import ImageAccordian from "./ImageAccordian";

const PricingAndStocks = ({
  productInput,
  handelProductInput,
  taxType,
  selectedProduct,
  setSelectedProduct,
  handleSelectChange,
  setSelectedImagesData,
  selectedImagesData,
  modifyId,
  store,
  warehouse,
  errors
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: "38px", // Adjust the height here
      minHeight: "38px", // Ensures the minimum height
    }),
    valueContainer: (base) => ({
      ...base,
      height: "38px", // Matches the control height
      padding: "0 6px", // Adjust padding for better alignment
    }),
    input: (base) => ({
      ...base,
      height: "38px", // Matches the control height
      margin: "0", // Ensures proper alignment
    }),
  };

  const discounttype = [
    { value: 1, label: "Percentage" },
    { value: 2, label: "Cash" },
  ];

  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample2">
        <div className="accordion-item">
          <div className="accordion-header" id="headingTwo">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-controls="collapseTwo"
            >
              <div className="text-editor add-list">
                <div className="addproduct-icon list icon">
                  <h5>
                    <LifeBuoy className="add-info" />
                    <span>Pricing &amp; Stocks</span>
                  </h5>
                  <Link to="#">
                    <ChevronDown className="chevron-down-add" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample2"
          >
            <div className="accordion-body">
              
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks add-product">
                        <InputField 
                        label="Opening Quantity" 
                        type="number"
                        name="Qty"
                        value={productInput.Qty}
                        onChange={handelProductInput}
                        min={0}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Tax Type <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-taxtype"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={taxType}
                        placeholder="Choose"
                        value={selectedProduct.taxType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "taxType",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>
                   
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks add-product">
                        <label>Discount Type</label>
                        <Select
                          className=""
                          options={discounttype}
                          placeholder="Choose"
                          value={selectedProduct.discType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "discType",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="mb-3 add-product">
                        <InputField 
                        label="Discount Value" 
                        type="text"
                        name="DiscValue"
                        value={productInput.DiscValue}
                        onChange={handelProductInput} 
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-3 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Store</label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-store"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={store}
                        placeholder="Choose"
                        value={selectedProduct.store||{value:0, label:'N/A'}}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "store",
                            setSelectedProduct
                          )
                        }
                      />
                    </div>
                  </div> */}
                    {/* <div className="col-lg-3 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Warehouse</label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-warehouse"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={warehouse}
                        placeholder="Choose"
                        value={selectedProduct.warehouse||{value:0, label:'N/A'}}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "warehouse",
                            setSelectedProduct
                          )
                        }
                      />
                    </div>
                  </div> */}

                  <div className="col-lg-3 col-sm-6 col-12">
                      <div className="mb-3 add-product">
                        <InputField 
                        label="Expected Delivery" 
                        type="text"
                        name="expectedDelivery"
                        value={productInput.expectedDelivery}
                        onChange={handelProductInput} 
                        />
                      </div>
                    </div>
                  </div>
                  {/* --------------------------price-type------------------------ */}
                  <PriceTypeAccordian 
                  productInput={productInput} 
                  handelProductInput={handelProductInput}
                  errors={errors}
                  />
                  {/* --------------------------Quantity-Alert------------------------ */}
                  <QuantityTypeAccordian 
                  productInput={productInput} 
                  handelProductInput={handelProductInput}
                  errors={errors}
                  />
                  {/* ---------------------image-accordian--------------------- */}
                  <ImageAccordian
                    setSelectedImagesData={setSelectedImagesData}
                    selectedImagesData={selectedImagesData}
                    modifyId={modifyId}
                  />
                </div>
                {/* <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row select-color-add">
                    <div className="col-lg-6 col-sm-6 col-12">
                      <div className="input-blocks add-product">
                        <label>Variant Attribute</label>
                        <div className="row">
                          <div className="col-lg-10 col-sm-10 col-10">
                            <select
                              className="form-control variant-select select-option"
                              id="colorSelect"
                            >
                              <option>Choose</option>
                              <option>Color</option>
                              <option value="red">Red</option>
                              <option value="black">Black</option>
                            </select>
                          </div>
                          <div className="col-lg-2 col-sm-2 col-2 ps-0">
                            <div className="add-icon tab">
                              <Link
                                className="btn btn-filter"
                                data-bs-toggle="modal"
                                data-bs-target="#add-units"
                              >
                                <PlusCircle className="feather feather-plus-circle" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="selected-hide-color" id="input-show">
                        <div className="row align-items-center">
                          <div className="col-sm-10">
                            <div className="input-blocks">
                              <input
                                className="input-tags form-control"
                                id="inputBox"
                                type="text"
                                data-role="tagsinput"
                                name="specialist"
                                defaultValue="red, black"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="input-blocks ">
                              <Link to="#" className="remove-color">
                                <Trash2 />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal-body-table variant-table"
                    id="variant-table"
                  >
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Variantion</th>
                            <th>Variant Value</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th className="no-sort">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="color"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="red"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={1234}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="product-quantity">
                                <span className="quantity-btn">
                                  <i
                                    data-feather="minus-circle"
                                    className="feather-search"
                                  />
                                </span>
                                <input
                                  type="text"
                                  className="quntity-input"
                                  defaultValue={2}
                                />
                                <span className="quantity-btn">
                                  +
                                  <i
                                    data-feather="plus-circle"
                                    className="plus-circle"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={50000}
                                />
                              </div>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <div className="input-block add-lists">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked="" />
                                    <span className="checkmarks" />
                                  </label>
                                </div>
                                <Link
                                  className="me-2 p-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-variation"
                                >
                                  <i
                                    data-feather="plus"
                                    className="feather-edit"
                                  />
                                </Link>
                                <Link className="confirm-text p-2" to="#">
                                  <i
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="color"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="black"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={2345}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="product-quantity">
                                <span className="quantity-btn">
                                  <i
                                    data-feather="minus-circle"
                                    className="feather-search"
                                  />
                                </span>
                                <input
                                  type="text"
                                  className="quntity-input"
                                  defaultValue={3}
                                />
                                <span className="quantity-btn">
                                  +
                                  <i
                                    data-feather="plus-circle"
                                    className="plus-circle"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="add-product">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={50000}
                                />
                              </div>
                            </td>
                            <td className="action-table-data">
                              <div className="edit-delete-action">
                                <div className="input-block add-lists">
                                  <label className="checkboxs">
                                    <input type="checkbox" defaultChecked="" />
                                    <span className="checkmarks" />
                                  </label>
                                </div>
                                <Link
                                  className="me-2 p-2"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-units"
                                >
                                  <i
                                    data-feather="plus"
                                    className="feather-edit"
                                  />
                                </Link>
                                <Link className="confirm-text p-2" to="#">
                                  <i
                                    data-feather="trash-2"
                                    className="feather-trash-2"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default PricingAndStocks;
