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


const BulkUploadModal = ({ downloadExcel, addFields, handleClose, show, handleSelectChange, selectValues, productGroupList, productTypeList, setSelectedProducts,selectedProducts }) => {
    const typeData = [
        {value:1, label:'From Excel'},
        {value:2, label:'From Product Group'}
     ]
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

      const productSave = formattedData.map((item, index) => {
        const quantity = parseFloat(item["Quantity"]) || 0; // Ensure Quantity is numeric
        const stock = parseFloat(item["Stock"]) || 0;      // Ensure Stock is numeric
  
        return {
          sNo: index + 1,
          Code: 0,
          product: item["Product Name"] || "",
          quantity: quantity,
          stock: stock,
          unit: item["Unit"] || "",
          differ: quantity - stock, 
        };
      });
  
      setSelectedProducts(productSave);
    };

    reader.readAsBinaryString(file);
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    // const requestBody = Object.values(selectedProducts);
    // var body = {
    //   ProductMasterList: requestBody,
    // };
    // console.log('body-data', JSON.stringify(body))
    
    // let saveurl = `/api/ImportProductMaster`;
    // try {
    //   setLoading(true);
    //   const { res, got } = await callFetch(saveurl, "POST", body);
    //   if (res.status === 200) {
    //     alert(got.msg);
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.error("Error:", error);
    // }
  };

  

  return (
    <>
      {loading && (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      )}
      {/* <Button variant="primary" onClick={() => handleClose()}>
        Open Bulk Upload Modal
      </Button> */}

      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={downloadExcel}>
            Download Sample File
          </Button> */}
          <Link to="#" className="btn btn-primary" onClick={() => handleClose()}>
            Submit
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BulkUploadModal;
