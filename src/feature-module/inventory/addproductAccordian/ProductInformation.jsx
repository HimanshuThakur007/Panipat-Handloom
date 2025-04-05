/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import InputField from "../../../ReusableComponents/InputField";
import {
  ChevronDown,
  Info,
  PlusCircle,
} from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";
import InputSelect from "../../../ReusableComponents/InputSelect";

const ProductInformation = ({
  unit,
  category,
  product,
  subcategory,
  brand,
  productInput,
  handelProductInput,
  selectedProduct,
  setSelectedProduct,
  handleSelectChange,
  masterInput,
  handelMasterInput,
  supplierData
}) => {
    // value={props.selectedValues.transport}
  // onChange={(selectedOption) =>
  //   props.handleSelectChange(
  //     selectedOption,
  //     "transport",
  //     props.setSelectedValues
  //   )
  // }
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
  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-controls="collapseOne"
            >
              <div className="addproduct-icon">
                <h5>
                  <Info className="add-info" />

                  <span>Design Information</span>
                </h5>
                <Link to="#">
                  <ChevronDown className="chevron-down-add" />
                </Link>
              </div>
            </div>
          </div>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">

            <div className="addservice-info">
                <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Product Type <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-psubcategory"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={product}
                        placeholder="Choose"
                        value={selectedProduct.productType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "productType",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        {/* <label className="form-label">Category <span className="text-danger">*</span></label> */}
                        <label className="form-label">Sagment <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-category"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={category}
                        placeholder="Choose"
                        value={selectedProduct.category}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "category",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>
                
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        {/* <label className="form-label">Sub Category</label> */}
                        <label className="form-label">Catalogue/ Album Name <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-sscategory"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={subcategory}
                        placeholder="Choose"
                        value={selectedProduct.subCategory}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "subCategory",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>

                 
                </div>
              </div>
              <div className="add-product-new">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Brand <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-brand"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={brand}
                        placeholder="Choose"
                        value={selectedProduct.brand}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "brand",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Unit <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-unit"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={unit}
                        placeholder="Choose"
                        value={selectedProduct.unit}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "unit",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                     <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Supplier <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={supplierData}
                        value={selectedProduct.supplier}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "supplier",
                            setSelectedProduct
                          )
                        }
                        styles={customStyles}
                        required
                      />
                  </div>
                  </div>

                  {/* <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <InputField
                        label="SKU"
                        type="text"
                        name="SkuCode"
                        value={productInput.SkuCode}
                        onChange={handelProductInput}
                      />
                    </div>
                  </div> */}

                
                </div>
              </div>
             
              <div className="row">
              {/* <div className="col-lg-4 col-sm-6 col-12">
                   
                      <InputSelect
                      label="Supplier"
                      options={supplierData}
                       value={selectedProduct.supplier}
                       onChange={(selectedOption) =>
                         handleSelectChange(
                           selectedOption,
                           "supplier",
                           setSelectedProduct
                         )
                       }
                       styles={customStyles}
                      />

                  </div> */}
                    <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      label="Item Code"
                      type="text"
                      name="ItemCode"
                      value={productInput.ItemCode}
                      onChange={handelProductInput}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      name="Name"
                      // label="Product Name"
                      label="Design Name"
                      type="text"
                      value={productInput.Name}
                      onChange={handelProductInput}
                      dangerTag="*"
                      required
                    />
                  </div>
                </div>
              
                <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 add-product">
                      <InputField
                        label="HSN Code"
                        type="text"
                        name="HSN"
                        value={productInput.HSN}
                        onChange={handelProductInput}
                      />
                    </div>
                  </div>
                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      label="Slug"
                      type="text"
                      name="Slug"
                      value={productInput.Slug}
                      onChange={handelProductInput}
                    />
                  </div>
                </div> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      label="Page No"
                      type="text"
                      name="pageNo"
                      value={productInput.pageNo}
                      onChange={handelProductInput}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="mb-3 add-product">
                    <InputField
                      label="Product Name (Website)"
                      type="text"
                      name="webName"
                      value={productInput.webName}
                      onChange={handelProductInput}
                    />
                  </div>
                </div>
              </div>
             
              {/* Editor */}
              <div className="col-lg-12">
                <div className="input-blocks summer-description-box transfer mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control h-100"
                    rows={3}
                    name="Description"
                    value={productInput.Description}
                    onChange={handelProductInput}
                  />
                  {/* <p className="mt-1">Maximum 60 Characters</p> */}
                </div>
              </div>
              {/* /Editor */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
