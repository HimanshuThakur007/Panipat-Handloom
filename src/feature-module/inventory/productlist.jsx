/* eslint-disable react/prop-types */
import {
  Box,
  ChevronUp,
  Edit,
  Eye,
  Filter,
  GitMerge,
  PlusCircle,
  RotateCcw,
  Sliders,
  StopCircle,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import Select from "react-select";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Brand from "../../core/modals/inventory/brand";
import { all_routes } from "../../Router/all_routes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Table from "../../core/pagination/datatable";
import { setToogleHeader } from "../../core/redux/action";
import { Download } from "react-feather";
import useFetch from "../../Hooks/useFetch";
import { set_product_list } from "../../core/redux/action";
import { ProductColumns } from "./InventryColumns/InventryColumns";
import { showConfirmationAlert } from "../../ReusableComponents/ConfirmAlert";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { filterData } from "../../common/filteredFunction";
import DataTable from "../../common/DataTable";
import ImageImport from "../../core/modals/inventory/ImageImport";


const ProductList = () => {
  const callFetch = useFetch()
  const dataSource = useSelector((state) => state.product_list);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header); 
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [categorySelect, setCategorySelect] = useState(null);
  const [addFields, setAddFields] = useState([]);
  const [categoryData, setCatrgoryData] = useState([]);
  
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const route = all_routes;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];
  const productlist = [
    { value: "choose", label: "Choose Product" },
    { value: "lenovo", label: "Lenovo 3rd Generation" },
    { value: "nike", label: "Nike Jordan" },
  ];
  const categorylist = [
    { value: "choose", label: "Choose Category" },
    { value: "laptop", label: "Laptop" },
    { value: "shoe", label: "Shoe" },
  ];
  const subcategorylist = [
    { value: "choose", label: "Choose Sub Category" },
    { value: "computers", label: "Computers" },
    { value: "fruits", label: "Fruits" },
  ];
  const brandlist = [
    { value: "all", label: "All Brand" },
    { value: "lenovo", label: "Lenovo" },
    { value: "nike", label: "Nike" },
  ];
  const price = [
    { value: "price", label: "Price" },
    { value: "12500", label: "$12,500.00" },
    { value: "13000", label: "$13,000.00" }, 
  ];

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const categorySelectHandler = (select) => {
    let value = select?.value
    setCategorySelect(select);
    loadAdditionalFields(value)
  };

  // ==========================================Product-Table-data-apiCall=======================================================
  const GetProductData = async () => {
    let url = `/api/GetProductMasterList?ID=0`;
      try {
        setLoading(true)
          const { res, got } = await callFetch(url, 'GET');
          // Handle response data
          if(res.status == 200){
            let alldata = got.data
            // setProductTableList(alldata)
            let filteredData = filterData(alldata, searchText, ['name','categoryName','skuCode'])
            // dispatch(set_product_list(alldata))
            dispatch(set_product_list(filteredData))
          }
          setLoading(false)
          console.log('GET Response:', got);
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          setLoading(false)
      }
  };
  // =============================================delete-Handler=======================================================
  const ProductDelete = async (ID) => {
    let url = `/api/DelProdMaster?ProductID=${ID}`;
      try {
        setLoading(true)
          const { res, got } = await callFetch(url, 'GET');
          // Handle response data
          if(res.status == 200){
            let alldata = got.data
            // alert(got.msg)
            GetProductData()
          return got.msg
          }
          setLoading(false)
          console.log('GET Response:', got);
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          setLoading(false)
      }
  };
  
  const columns = ProductColumns(ProductDelete)
  // =================sagment/category=============================
    const GetCategoryData = async () => {
    let url = `/api/GetMasterforOther?MasterType=4&ParentID=0`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got?.data?.map((item)=>({
          value: item.code,
          label:item.name
        }))
        console.log(alldata, "allll");
        setCatrgoryData(alldata);
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // ==========================================load-additional-fields=======================================================

  const loadAdditionalFields = async (val) => {
    // let url = `/api/GetOptionalFields?MasterType=6&ParentID=0`;
    let url = `/api/GetProductAddMasterConfig?Category=${val}`;
    console.log("Additional url", url);
    var corrData =[]
    try {
      setLoading(true)
      const { res, got } = await callFetch(url, "GET");

      if (res.status == 200) {
        let loadData = got.data;
        console.log("Additional data", loadData);
        loadData.map((item) => {
          corrData.push({
            srNo: item.srNo,
            id: item.id,
            label: item.name,
            type: item.type,
            decimalP: item.decimalP,
          });
        });
        setAddFields(corrData);
       
      }
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false)
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    GetProductData(value)
  };

  React.useEffect(()=>{

    GetCategoryData()
  },[])

  // ========================================save-from-excel======================================================================

  
  const downloadExcel = async () => {
    console.log('hello from excel')
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const additionalData = addFields.map((item) => item.label);
   
    // Sample data
    const data = [
      [
        "SR No.",
        // "Item Code",
        "Design Name",
        // "Slug",
        // "SKU",
        // "Sagment",
        "Catalogue/Album Name",
        "Product Type",
        "Brand",
        "Unit",
        // "Store",
        // "Warehouse",
        "Description",
        "Quantity",
        "Sale Price",
        "Tax Type",
        "Purchase Price",
        "MRP",
        "Discount Type",
        "Discount value",
        "Minimum Sale Price",
        "Minimum Level QYT.",
        "Reorder Level QYT.",
        "Maximum Level QYT.",
        "HSN Code",
        "Page No",
        "Product Name (Website)",
        // "Warranties",
        // "Manufacturer",
        // "Expiry",
        "Image URL1",
        "Image URL2",
        "Image URL3",
        "Image URL4",
        "Image URL5",
        ...additionalData
      ],

     
    ];
   
    console.log('Data==1', data);
    // Apply header style
    const headerRow = worksheet.addRow(data[0]);
    headerRow.eachCell((cell,colNumber) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };

      if (colNumber > 28) { // Adjust this number based on where your additional fields start
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00FF00' } };
    }
    });
  
    // Add data rows
    for (let i = 1; i < data.length; i++) {
      worksheet.addRow(data[i]);
    }
  
    // Set column widths
    worksheet.columns.forEach((column) => {
      column.width = 20;
    });
  
    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
  
    // Convert buffer to Blob
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DesignNamesample.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };
  

  React.useEffect(()=>{
    GetProductData()
  },[searchText])
  return (
    <div className="page-wrapper">
        {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Design List</h4>
              <h6>Manage your Design</h6>
          
            </div>
          </div>
          <ul className="table-top-head">
            {/* <li>
              <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Link>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li> */}
            {/* <li>
              <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link data-bs-toggle="tooltip" data-bs-placement="top">
                  <ImageWithBasePath
                    src="assets/img/icons/excel.svg"
                    alt="img"
                  />
                </Link>
              </OverlayTrigger>
            </li> */}
            {/* <li>
              <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                <Link data-bs-toggle="tooltip" data-bs-placement="top">
                  <i data-feather="printer" className="feather-printer" />
                </Link>
              </OverlayTrigger>
            </li> */}
            {/* <li>
              <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link data-bs-toggle="tooltip" data-bs-placement="top">
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li> */}
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
            <li>

          <div className="page-btn">
            <Link to={route.addproductpage} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" />
              Add New Design
            </Link>
          </div>
            </li>
          </ul>
          <div className="page-btn import">
            <Link
              to="#"
              className="btn btn-added color"
              data-bs-toggle="modal"
              data-bs-target="#view-notes"
            >
              <Download className="me-2" />
              Import Design
            </Link>
          </div>
          <div className="page-btn import">
            <Link
              to="#"
              className="btn btn-added color"
              data-bs-toggle="modal"
              data-bs-target="#import-image"
            >
              <Download className="me-2" />
              Import Image
            </Link>
          </div>
        </div>
      
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Link to className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              {/* <div className="search-path">
                <Link
                  className={`btn btn-filter ${
                    isFilterVisible ? "setclose" : ""
                  }`}
                  id="filter_search"
                >
                  <Filter
                    className="filter-icon"
                    onClick={toggleFilterVisibility}
                  />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div> */}
              {/* <div className="form-sort">
                <Sliders className="info-img" />
                <Select
                  className="select"
                  options={options}
                  placeholder="14 09 23"
                />
              </div> */}
            </div>
            {/* /Filter */}
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Box className="info-img" />
                          <Select
                            className="select"
                            options={productlist}
                            placeholder="Choose Product"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={categorylist}
                            placeholder="Choose Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <GitMerge className="info-img" />
                          <Select
                            className="select"
                            options={subcategorylist}
                            placeholder="Choose Sub Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={brandlist}
                            placeholder="Nike"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <i className="fas fa-money-bill info-img" />

                          <Select
                            className="select"
                            options={price}
                            placeholder="Price"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Link className="btn btn-filters ms-auto">
                            {" "}
                            <i
                              data-feather="search"
                              className="feather-search"
                            />{" "}
                            Search{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              {/* <Table columns={columns} dataSource={dataSource} rowKey={(record)=>record.code}/> */}
              <DataTable columns={columns} data={dataSource} rowKey={(record)=>record.code}/>
            </div>
          </div>
        </div>
        {/* /product list */}
        <Brand downloadExcel={downloadExcel} addFields={addFields} categoryData={categoryData} categorySelect={categorySelect}categorySelectHandler={categorySelectHandler}/>
        <ImageImport/>
      </div>
    </div>
  );
};

export default ProductList;
