/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import ImageWithBasePath from "../../img/imagewithbasebath";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx";
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import moment from "moment/moment";
import InputSelect from "../../../ReusableComponents/InputSelect";
const Brand = ({ downloadExcel, addFields, categoryData, categorySelect, categorySelectHandler}) => {

  let callFetch = useFetch();
  const product = [
    { value: "choose", label: "Choose" },
    { value: "boldV3.2", label: "Bold V3.2" },
    { value: "nikeJordan", label: "Nike Jordan" },
    { value: "iphone14Pro", label: "Iphone 14 Pro" },
  ];
  const category = [
    { value: "choose", label: "Choose" },
    { value: "laptop", label: "Laptop" },
    { value: "electronics", label: "Electronics" },
    { value: "shoe", label: "Shoe" },
  ];
  const status = [
    { value: "choose", label: "Choose" },
    { value: "lenovo", label: "Lenovo" },
    { value: "bolt", label: "Bolt" },
    { value: "nike", label: "Nike" },
  ];
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  //   const handleFileSelect = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //   };
  //   console.log(selectedFile,'selectedFile')
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

      // Extract headers
      const headers = data[0];

      // Initialize output data
      const formattedData = [];

      // Loop through rows starting from the second row (index 1)
      for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        const formattedRow = {};

        // Loop through each cell in the row
        for (let j = 0; j < headers.length; j++) {
          const header = headers[j];
          const cellData = rowData[j] || "";
          formattedRow[header] = cellData;
        }

        formattedData.push(formattedRow);
      }

      console.log("formattedData", formattedData);
      const productSave = formattedData.map((item, index) => ({
        SrNo: index + 1,
        Code: 0,
        // ItemCode: item["Item Code"].toString() || '',
        ItemCode: '',
        Name: item["Design Name"].toString() || '',
        // Slug: item["Slug"],
        // SkuCode: item["SKU"],
        // Category: item["Sagment"].toString() || '',
        Category: categorySelect?.label || '',
        SubCategory: item["Catalogue/Album Name"].toString() || '',
        ProductType: item["Product Type"],
        Brand: item["Brand"].toString() || '',
        Unit: item["Unit"].toString() || '',
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
        PageNo: item["Page No"].toString()||'',
        Website: item["Product Name (Website)"].toString()||'',
        // Store: item["Store"] || "",
        // WH: item["Warehouse"] || "",
        // Warranty: parseInt(item["Warranties"] || 0),
        // Manufacture: parseInt(item["Manufacturer"] || 0),
        // Expiry: parseInt(item["Expiry"] || 0),
        ImgUrl1: item["Image URL1"] || "",
        ImgUrl2: item["Image URL2"] || "",
        ImgUrl3: item["Image URL3"] || "",
        ImgUrl4: item["Image URL4"] || "",
        ImgUrl5: item["Image URL5"] || "",
        ImgUrl6: item["Image URL6"] || "",
        AdditionalInfo:[],
        AddInfo:[],
        ProductMasterAddInfo: addFields.map((field, fieldIndex) => {
          let fieldValue = item[field.label] || "";
          if (field.type === 4 && fieldValue) {
            fieldValue = moment(fieldValue, "DD/MM/YYYY").format("DD/MMM/YYYY");
          }
          return {
            SrNo: index + 1,
            ParentID: field.id,
            ID: 0,
            MasterID: 0,
            Name: fieldValue?.toString()||'',
            Type: field.type,
          };
        }),

        //   AdditionalInfo: addFields.map((field, fieldIndex) => ({
        //     SrNo: index + 1,
        //     ParentID: field.id,
        //     ID: 0,
        //     MasterID: 0,
        //     Name: item[field.label] || "",
        //     Type: field.type
        // }))
      }));
      setExcelData(productSave);
      console.log("productSave", productSave);
    };

    reader.readAsBinaryString(file);
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    const requestBody = Object.values(excelData);
    var body = {
      ProductMasterList: requestBody,
    };
    console.log("Excel-json", JSON.stringify(body));
    let saveurl = `/api/ImportProductMaster`;
    console.log("saveurl", saveurl);
    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", body);
      if (res.status == 200) {
        // showToastMessage(got.msg);
        alert(got.msg);

        setLoading(false);
      } else {
        // showToastError(got.msg);
        setLoading(false);
      }
      // Handle response data
      console.log("POST Response:", got);
    } catch (error) {
      // Handle errors
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} message="Saving..."/>
      ) : null}
      {/* Import Product */}
      <div className="modal fade" id="view-notes">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Import Design</h4>
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
                        <div className="row">
                      <div className="col-lg-12 col-sm-6 col-12">
                            <InputSelect
                            label="Sagment"
                            options={categoryData}
                            value={categorySelect}
                            onChange={categorySelectHandler}
                            />
                             </div>
                          {categorySelect !== null && (<>
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
                      </div>
                  
                    <div className="col-lg-12">
                      <div className="modal-footer-btn">
                        <button
                          type="button"
                          className="btn btn-cancel me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <Link
                          to="#"
                          className="btn btn-submit"
                          onClick={handleProductSave}
                        >
                          Submit
                        </Link>
                      </div>
                    </div></>)}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Import Product */}
    </div>
  );
};

export default Brand;
