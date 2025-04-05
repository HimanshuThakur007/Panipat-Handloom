/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import Addunits from "../../core/modals/inventory/addunits";
import AddCategory from "../../core/modals/inventory/addcategory";
import AddBrand from "../../core/modals/addbrand";
import {
  ArrowLeft,
  ChevronUp,
  Plus,
  PlusCircle,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ProductInformation from "./addproductAccordian/ProductInformation";
import PricingAndStocks from "./addproductAccordian/PricingAndStocks";
import CustomFieldAccordian from "./addproductAccordian/CustomFieldAccordian";
import AddProductSubCategory from "../../core/modals/inventory/addproductsubcategory";
import AddProductSSCategory from "../../core/modals/inventory/addproductsscategory";
import TaxTypeModal from "../../core/modals/inventory/taxtypeModal";
import AdditionalFields from "../../core/modals/inventory/productadditionalfield";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import AddStore from "../../core/modals/inventory/addstore";
import AddWarehouse from "../../core/modals/inventory/addwarehouse";
import CustomermodalPage from "../../core/modals-js/peoples/customermodalpage";

const AddProduct = ({
  handleSaveMaster,
  productInput,
  handelProductInput,
  unit,
  category,
  product,
  subcategory,
  brand,
  taxType,
  selectedProduct,
  setSelectedProduct,
  handleSelectChange,
  handleProductSave,
  setSelectedImagesData,
  handleCheckboxChange,
  checkboxes,
  loading,
  additionalFieldData,
  ProductModifyData,
  modifyId,
  selectedImagesData,
  store,
  warehouse,
  handleOpenModal,
  values,
  handleValueChange,
  imagePath,
  handleImageConverted,
  masterInput,
  handelMasterInput,
  errors,
  supplierData,
  customerDataHandler
}) => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.toggle_header);
  const [customerCode,setCustomerCode] = useState(0)
  // const isCategorySelected = Boolean(selectedProduct?.category);
  console.log(selectedProduct?.category, "from no modal");
  // console.log('isCategorySelected',isCategorySelected)
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              {modifyId == 0 || modifyId == undefined ? (
                <>
                  <h4>New Design</h4>
                  <h6>Create new design</h6>
                </>
              ) : (
                <>
                  <h4>Edit Design</h4>
                  <h6>Edit your design</h6>
                </>
              )}
            </div>
          </div>
          {loading ? (
            <ReactLoader loaderClass="position-absolute" loading={loading} />
          ) : null}
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <AdditionalFields
                  additionalFieldData={additionalFieldData}
                  ProductModifyData={ProductModifyData}
                  modifyId={modifyId}
                  selectedProduct={selectedProduct}
                />
              </div>
            </li>
            <li>
              <div className="page-btn">
                <button className="btn btn-added" onClick={handleOpenModal}>
                  <PlusCircle className="me-2 iconsize" />
                  Additional Information
                </button>
              </div>
            </li>
            <li>
              <div className="page-btn">
                <Link to={route.productlist} className="btn btn-secondary">
                  <ArrowLeft className="me-2" />
                  Back to Design
                </Link>
              </div>
            </li>

            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Collapse"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp className="feather-chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        {/* /add */}
        <form onSubmit={handleProductSave}>
          <div className="card">
            <div className="card-body add-product pb-0">
              <ProductInformation
                productInput={productInput}
                handelProductInput={handelProductInput}
                masterInput={masterInput}
                handelMasterInput={handelMasterInput}
                unit={unit}
                category={category}
                product={product}
                subcategory={subcategory}
                brand={brand}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                handleSelectChange={handleSelectChange}
                supplierData={supplierData}
              />
              <PricingAndStocks
                productInput={productInput}
                handelProductInput={handelProductInput}
                masterInput={masterInput}
                handelMasterInput={handelMasterInput}
                taxType={taxType}
                store={store}
                warehouse={warehouse}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                handleSelectChange={handleSelectChange}
                setSelectedImagesData={setSelectedImagesData}
                selectedImagesData={selectedImagesData}
                modifyId={modifyId}
                errors={errors}
              />
              {/* <CustomFieldAccordian
                handleCheckboxChange={handleCheckboxChange}
                checkboxes={checkboxes}
              /> */}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <button
                type="button"
                className="btn btn-cancel me-2"
                onClick={() => navigate(route.dashboard)}
              >
                Cancel
              </button>
              <button className="btn btn-submit">Save Product</button>
            </div>
          </div>
        </form>
        {/* /add */}
      </div>
      <Addunits
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      {/* =======category / sagment====== */}
      <AddCategory
        imagePath={imagePath}
        handleImageConverted={handleImageConverted}
        handleValueChange={handleValueChange}
        values={values}
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      <AddBrand
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      {/*===== sub category/Product-type cange to product type */}
      <AddProductSubCategory
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      {/* ===============for sub category==/Add New Catalogue/ L1 Name======================= */}
      <AddProductSSCategory
        imagePath={imagePath}
        handleImageConverted={handleImageConverted}
        category={category}
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleSelectChange={handleSelectChange}
      />

      <TaxTypeModal
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      {/* ======================store=======================*/}
      <AddStore
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
      {/* ======================warehouse=======================*/}
      <AddWarehouse
        masterInput={masterInput}
        handleSaveMaster={handleSaveMaster}
        handelMasterInput={handelMasterInput}
      />
       <CustomermodalPage
        id ={2}
        customerCode={customerCode}
        resetHandler={()=>{}}
        setCustomerCode={setCustomerCode}
        customerDataHandler={customerDataHandler}
      />

      {/* <AdditionalFields additionalFieldData={additionalFieldData}/> */}
    </div>
  );
};

export default AddProduct;
