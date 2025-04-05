/* eslint-disable react/prop-types */
import React from "react";
import InputField from "../../../ReusableComponents/InputField";
import { Link } from "react-router-dom";
import { ChevronDown } from "feather-icons-react/build/IconComponents";

const QuantityTypeAccordian = ({ productInput,handelProductInput,}) => {
  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample6">
        <div className="accordion-item">
          <div className="accordion-header" id="headingSix">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-controls="collapseSix"
            >
              <div className="addproduct-icon list">
                <h5>
                  <i data-feather="image" className="add-info" />
                  <span>Quantity Alert</span>
                </h5>
                <Link to="#">
                  <ChevronDown className="chevron-down-add" />
                </Link>
              </div>
            </div>
          </div>
          <div
            id="collapseSix"
            className="accordion-collapse collapse show"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample6"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    label="Minimum Level (Qty.)" 
                    type="number"
                    name="MinLevelQty"
                    value={productInput.MinLevelQty}
                    onChange={handelProductInput} 
                    min={0}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    label="Reorder Level (Qty.)" 
                    type="number" 
                    name="ROLevelQty"
                    value={productInput.ROLevelQty}
                    onChange={handelProductInput}
                    min={0}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="input-blocks add-product">
                    <InputField 
                    label="Maximum Level (Qty.)" 
                    type="number" 
                    name="MaxLevelQty"
                    value={productInput.MaxLevelQty}
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

export default QuantityTypeAccordian;
