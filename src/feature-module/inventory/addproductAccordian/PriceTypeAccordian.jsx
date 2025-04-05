/* eslint-disable react/prop-types */
import React from "react";
import InputField from "../../../ReusableComponents/InputField";
import { ChevronDown } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";

const PriceTypeAccordian = ({ productInput,handelProductInput,errors}) => {
  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample5">
        <div className="accordion-item">
          <div className="accordion-header" id="headingFive">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-controls="collapseFive"
            >
              <div className="addproduct-icon list">
                <h5>
                  <i data-feather="image" className="add-info" />
                  <span>Price Type</span>
                </h5>
                <Link to="#">
                  <ChevronDown className="chevron-down-add" />
                </Link>
              </div>
            </div>
          </div>
          <div
            id="collapseFive"
            className="accordion-collapse collapse show"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample5"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    label="Purchase Price" 
                    type="number"
                    name="PurcPrice"
                    value={productInput.PurcPrice}
                    onChange={handelProductInput} 
                    min={0}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    className={`${errors.SalePrice ? "is-invalid" : ""}`}
                    label="Sale Price" 
                    type="number" 
                    name="SalePrice"
                    value={productInput.SalePrice}
                    onChange={handelProductInput}
                    min={0}
                    error={errors.SalePrice}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    className={`${errors.MRP ? "is-invalid" : ""}`}
                    label="MRP" 
                    type="number" 
                    name="MRP"
                    value={productInput.MRP}
                    onChange={handelProductInput}
                    min={0}
                    error={errors.MRP}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    label="Minimum Sale price" 
                    type="number" 
                    name="MinSPrice"
                    value={productInput.MinSPrice}
                    onChange={handelProductInput}
                    min={0}
                    />
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

export default PriceTypeAccordian;
