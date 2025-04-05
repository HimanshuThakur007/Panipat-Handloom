import React, { useState } from 'react';
import ReactLoader from '../../../ReusableComponents/ReactLoader';
import ImageWithBasePath from '../../img/imagewithbasebath';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import useFetch from '../../../Hooks/useFetch';

var datalength;
const ImageImport = () => {
  const [loading, setLoading] = useState(false);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [excelFileName, setExcelFileName] = useState(''); 
  const callFetch = useFetch()

  const handleFolderSelection = (e) => {
    const files = Array.from(e.target.files); 
    const validImages = files.filter((file) =>
      file.type.startsWith('image/')
    ); 
    // console.log(validImages);
    setImageFiles(validImages); 
  };

  const sanitizeString = (str) => {
    return str
      .replace(/[\\/:*"<>|]/g, "")
      .trim();
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setExcelFileName(file.name); 

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const productNames = sheetData.map((row) => sanitizeString(row["Product Name"]));
      processImages(productNames);
    };
    reader.readAsBinaryString(file);
  };

  const processImages = async (productNames) => {
    const result = productNames.map((productName) => {
      const matchedImages = imageFiles.filter((file) =>
        file.name.startsWith(productName)
      );
      const base64Images = matchedImages.map((image) =>
        convertImageToBase64(image)
      );
      return { productName, images: base64Images };
    });

    const finalResult = await Promise.all(
      result.map(async (item) => ({
        productName: item.productName,
        images: await Promise.all(item.images),
      }))
    );
    const filteredResult = finalResult.filter((item) => item.images.length > 0);
    // const filteredResult1 = finalResult.filter((item) => item.images.length > 1);
    //  console.log('filteredResult1',filteredResult1)
    datalength = filteredResult?.length
    setJsonOutput(filteredResult);
  };
  
  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(imageFile);
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    var body = jsonOutput

    console.log("userJson", JSON.stringify(body));
    let saveurl = `/api/BulkProductImageUplaod`;
    console.log("saveurl", saveurl);
    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", body);
      if (res.status == 200 && got.status == 1) {
        // showToastMessage(got.msg);
        alert(got.msg);

        setLoading(false);
      } else {
        // showToastError(got.msg);
        console.log('ressss',res)
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


  console.log('jsonOutput==>>', jsonOutput);

  return (
    <>
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      {/* Import Product */}
      <div className="modal fade" id="import-image">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Import Product Images</h4>
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
                  <form onSubmit={handleSave}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label htmlFor="folderInput" className="form-label">
                            Select Image Folder:
                          </label>
                          <input
                            id="folderInput"
                            type="file"
                            webkitdirectory="true"
                            multiple
                            onChange={handleFolderSelection}
                          />
                        </div>
                        <div className="input-blocks image-upload-down">
                          <label> Upload Excel File</label>
                          <div className="image-upload download">
                            <input
                              type="file"
                              accept=".xlsx, .xls"
                              onChange={handleExcelUpload}
                            />
                            <div className="image-uploads">
                              {excelFileName ? (
                                <h4>Selected File: {excelFileName}</h4>
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
                        {jsonOutput && jsonOutput?.length > 0 && <label>Total Product Image : {datalength}</label>}
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
                        <button
                        
                          className="btn btn-submit"
                        
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageImport;
