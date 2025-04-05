/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import ImageWithBasePath from "../../img/imagewithbasebath";
import * as XLSX from "xlsx";
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import moment from "moment/moment";
import { Modal, Button, Form } from "react-bootstrap";

const StockAdjustmentComp = ({
  downloadExcel,
  addFields,
  handleClose,
  show,
  handleSelectChange,
  selectValues,
  productTypeList,
  productGroupList
}) => {
  const typeData = [
    { value: 1, label: "From Excel" },
    { value: 2, label: "From Product Group" },
  ];
  let callFetch = useFetch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = data[0];
      const formattedData = [];

      for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        const formattedRow = {};

        for (let j = 0; j < headers.length; j++) {
          const header = headers[j];
          const cellData = rowData[j] || "";
          formattedRow[header] = cellData;
        }

        formattedData.push(formattedRow);
      }

      const productSave = formattedData.map((item, index) => ({
        SrNo: index + 1,
        Code: 0,
        ItemCode: item["Item Code"],
        Name: item["Product Name"],
        Slug: item["Slug"],
        SkuCode: item["SKU"],
        Category: item["Category"],
        SubCategory: item["Sub Category"],
        ProductType: item["Product Type"],
        Brand: item["Brand"],
        Unit: item["Unit"],
        Description: item["Description"],
        Qty: parseFloat(item["Quantity"] || 0),
        SalePrice: parseFloat(item["Sale Price"] || 0),
        TaxType: item["Tax Type"].toString(),
        PurcPrice: parseFloat(item["Purchase Price"] || 0),
        MRP: parseFloat(item["MRP"] || 0),
        DiscType: parseFloat(item["Discount Type"] || 0),
        DiscValue: parseFloat(item["Discount value"] || 0),
        MinSPrice: parseFloat(item["Minimum Sale Price"] || 0),
        MinLevelQty: parseFloat(item["Minimum Level QYT."] || 0),
        ROLevelQty: parseFloat(item["Reorder Level QYT."] || 0),
        MaxLevelQty: parseFloat(item["Maximum Level QYT."] || 0),
        HSN: item["HSN Code"].toString() || "",
        Store: item["Store"] || "",
        WH: item["Warehouse"] || "",
        Warranty: parseInt(item["Warranties"] || 0),
        Manufacture: parseInt(item["Manufacturer"] || 0),
        Expiry: parseInt(item["Expiry"] || 0),
        ImgUrl1: item["Image URL1"] || "",
        ImgUrl2: item["Image URL2"] || "",
        ImgUrl3: item["Image URL3"] || "",
        ImgUrl4: item["Image URL4"] || "",
        ImgUrl5: item["Image URL5"] || "",
        ImgUrl6: item["Image URL6"] || "",
        AdditionalInfo: addFields.map((field) => {
          let fieldValue = item[field.label] || "";
          if (field.type === 4 && fieldValue) {
            fieldValue = moment(fieldValue, "DD/MM/YYYY").format("DD/MMM/YYYY");
          }
          return {
            SrNo: index + 1,
            ParentID: field.id,
            Code: 0,
            MasterID: 0,
            Name: fieldValue,
            Type: field.type,
          };
        }),
      }));
      setExcelData(productSave);
    };

    reader.readAsBinaryString(file);
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    const requestBody = Object.values(excelData);
    var body = {
      ProductMasterList: requestBody,
    };
    let saveurl = `/api/ImportProductMaster`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", body);
      if (res.status === 200) {
        alert(got.msg);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-blocks">
              <label>Bulk Import</label>
              <Select
                name="bulktype"
                className="select"
                options={typeData}
                value={selectValues.bulktype}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          {selectValues?.bulktype?.value === 2 && (<>
          <div className="col-lg-6">
            <div className="input-blocks">
              <label>Product Group</label>
              <Select
                name="productgrp"
                className="select"
                options={productGroupList}
                value={selectValues.productgrp}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-blocks">
              <label>Product Type</label>
              <Select
                name="prodType"
                className="select"
                options={productTypeList}
                value={selectValues.prodType}
                onChange={handleSelectChange}
              />
            </div>
          </div></>)}
          {selectValues?.bulktype?.value === 1 && (<>
          <div className="col-lg-12 col-sm-6 col-12">
            <div className="row">
              <div>
                <div className="modal-footer-btn download-file">
                  <button
                    className="btn btn-submit"
                    onClick={(e) => {
                      e.preventDefault();
                      downloadExcel(e);
                    }}
                  >
                    Download Sample File
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="input-blocks image-upload-down">
              <label> Upload Excel File</label>
              <div className="image-upload download">
                <input type="file" onChange={handleFileChange} />
                <div className="image-uploads">
                  {selectedFile ? (
                    <h4>{selectedFile.name}</h4>
                  ) : (
                    <>
                      <ImageWithBasePath
                        src="assets/img/download-img.png"
                        alt="img"
                      />
                      <h4>
                        Drag and drop a <span>file to upload</span>
                      </h4>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div></>)}
          <div className="col-lg-12">
            <div className="modal-footer-btn">
              <button
                type="button"
                className="btn btn-cancel me-2"
                //   data-bs-dismiss="modal"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <Link to="#" className="btn btn-submit" onClick={() => {}}>
                Submit
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default StockAdjustmentComp;
