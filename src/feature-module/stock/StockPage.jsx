import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import {
  ArrowLeft,
  ChevronUp,
  Download,
  PlusCircle,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
import StockAdjustmentComp from "../../core/modals/stocks/StockAdjustmentComp";
import Select from "react-select";
import { Table, Input } from "antd";
import useFetch from "../../Hooks/useFetch";
import DatePicker from "react-datepicker";
import ExcelJS from "exceljs";
import { setToogleHeader } from "../../core/redux/action";
import BulkUploadModal from "../../core/modals/stocks/BulkUploadModal";
import moment from "moment";
var labelName;
const StockPage = () => {
  const callFetch = useFetch();
  const location = useLocation();
  if(location && location.state && location.state.code !== null && location.state.code != undefined){
    var modcode = location.state.code || 0;
    var masterType = location.state.mt
  }
  const { id } = useParams();
  const dispatch = useDispatch();
  const route = all_routes;
  const navigate = useNavigate();
  const data = useSelector((state) => state.toggle_header);
// console.log('location',location)
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  // const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
  const [wareHouseList, setWareHouseList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectValues, setSelectValues] = useState({
    stockType: null,
    series: null,
    warehouse: null,
    product: null,
    bulktype: null,
    productgrp: null,
    prodType: null,
  });
  const [dates, setDates] = useState({
    physicalDate: new Date(),
    // toDate: new Date(),
  });
  const [vchNo, setVchNo] = useState("");
  const [isVchDisabled, setIsVchDisabled] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [productGroupList, setProductGroupList] = useState([]);
  const [stockTypeList, setStockTypeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    console.log(selectedOption);
    setSelectValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: selectedOption,
      };

      if (name === "series") {
        const selectedSeries = seriesList.find(
          (item) => item.value === selectedOption.value
        );

        if (selectedSeries?.voucherType === 2) {
          setIsVchDisabled(true);
          loadvchNo();
        } else {
          setIsVchDisabled(false);
          setVchNo("");
        }
      }

      if (name === "product") {
        handleAddProduct(selectedOption);
      }

      if (name === 'productgrp' || name === 'prodType'){
        // handleAddProduct(selectedOption);
        const prodData = productList.map((item,index)=>({
          sNo: index + 1,
          code: item.value || 0,
          product: item.label,
          quantity: parseFloat(0),
          stock: item.stkQty,
          unit: item.unit,
          differ: 0,
        }))
        setSelectedProducts([...prodData])
      }


      return updatedValues;
    });
  };

  React.useEffect(()=>{
    let prodValue = selectValues?.productgrp?.value ||0
    let prodType = selectValues?.prodType?.value || 0
    loadAllMaster(id,prodValue,prodType )
    console.log(selectedProducts,'sspp')
  },[id, selectValues?.productgrp, selectValues?.prodType])

  const handleAddProduct = (selectedProduct) => {
    if (selectedProduct) {
      const product = productList.find(
        (item) => item.value === selectedProduct.value
      );

      if (product) {
        const newProduct = {
          sNo: selectedProducts.length + 1,
          code: product.value || 0,
          product: product.label,
          quantity: parseFloat(0),
          stock: product.stkQty,
          unit: product.unit,
          differ: 0,
        };
        setSelectedProducts([...selectedProducts, newProduct]);
      }
    }
  };
  // const handleAddProduct1 = (selectedProduct) => {
  //   if (selectedProduct) {
  //     const product = productList.find(
  //       (item) => item.value === selectedProduct.value
  //     );

  //     if (product) {
  //       const newProduct = {
  //         sNo: selectedProducts.length + 1,
  //         code: product.value || 0,
  //         product: product.label,
  //         quantity: parseFloat(0),
  //         stock: product.stkQty,
  //         unit: product.unit,
  //         differ: 0,
  //       };
  //       setSelectedProducts([...selectedProducts, newProduct]);
  //     }
  //   }
  // };

  const handleQuantityChange = (value, record) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.sNo === record.sNo) {
        return {
          ...product,
          quantity: parseFloat(value),
          differ: value - product.stock,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };


  const incrementQuantity = (record) => {
    const updatedData = selectedProducts.map((item) =>
      item.sNo === record.sNo
        ? {
            ...item,
            quantity: item.quantity + 1,
            differ: item.quantity + 1 - item.stock, // Recalculate differ
          }
        : item
    );
    setSelectedProducts(updatedData);
  };
  
  const decrementQuantity = (record) => {
    if (record.quantity > 0) {
      const updatedData = selectedProducts.map((item) =>
        item.sNo === record.sNo
          ? {
              ...item,
              quantity: item.quantity - 1,
              differ: item.quantity - 1 - item.stock, // Recalculate differ
            }
          : item
      );
      setSelectedProducts(updatedData);
    }
  };

  const loadAllMaster = async (id,igcode,ptype) => {
    const fetchApi = [
      { apiUrl: `/api/getseriesmaster?Mastertype=504` },
      { apiUrl: `/api/Getmaster?Mastertype=309` },
      { apiUrl: `/api/GetItemStockDetails?IGCode=${igcode}&ProductType=${ptype}` },
      { apiUrl: `/api/Getmaster?Mastertype=306` },
      { apiUrl: `/api/Getmaster?Mastertype=301` },
      { apiUrl: `/api/Getmaster?Mastertype=${id}` },
    ];
    console.log(fetchApi,'aapp')

    try {
      setLoading(true);
      const promises = fetchApi.map(async (item) => {
        const { res, got } = await callFetch(item.apiUrl, "GET");
        if (res.status === 200) {
          return [
            { value: 0, label: "N/A" },
            ...got.data.map((dataItem) => ({
              value: dataItem.code,
              label: dataItem.name,
              voucherType: dataItem.voucherType,
              ...dataItem,
            })),
          ];
        } else {
          setLoading(false);
          throw new Error(`Failed to fetch data from ${item.apiUrl}`);
        }
      });

      const masterDataArray = await Promise.all(promises);
      setSeriesList(masterDataArray[0]);
      setWareHouseList(masterDataArray[1]);
      setProductList(masterDataArray[2]);
      setProductTypeList(masterDataArray[3]);
      setProductGroupList(masterDataArray[4]);
      setStockTypeList(masterDataArray[5]);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loadvchNo = async () => {
    let url = `/api/Getvchno?vchtype=8`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        const loadData = got;
        setVchNo(loadData.invNo); 
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleDelete = (sNo) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.sNo !== sNo
    );
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    // if(modcode === 0){
    //   resetHandler()
    // }
    return () => {
      resetHandler();
    };
  }, [modcode]);

  useEffect(() => {
    loadAllMaster(id);
    console.log(id, "userrr");
    switch (id) {
      case "202":
        labelName = "Super Stockist";
        // resetHandler()
        break;
      case "203":
        labelName = "Distributer";
        // resetHandler()
        break;
      case "204":
        // resetHandler()
        labelName = "Retailer";
        break;
      default:
        labelName = "stock";
        break;
    }
   
  }, [id]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "150px",
      render: (_, record) => (
        <div className="product-quantity" style={{ display: "flex", alignItems: "center" }}>
      <span className="quantity-btn" onClick={() => decrementQuantity(record)} style={{ cursor: "pointer", marginRight: "5px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather-search"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </span>
          <Input
            type="number"
            min={0}
            value={record.quantity}
            onChange={(e) =>
              handleQuantityChange(Number(e.target.value), record)
            }
            style={{ width: "50px", textAlign: "center" }}
            className="no-spinner" 
          />
           <span className="quantity-btn" onClick={() => incrementQuantity(record)} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="plus-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </span>
        </div>
      ),
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   width: "150px",
    //   render: (_, record) => (
    //     <div style={{ display: "flex", alignItems: "center" }}>
    //       <button
    //         className="btn btn-outline-secondary"
    //         onClick={() => decrementQuantity(record)}
    //         style={{ marginRight: "5px" }}
    //       >
    //         -
    //       </button>
    //       <Input
    //         type="number"
    //         min={0}
    //         value={record.quantity}
    //         onChange={(e) => handleQuantityChange(Number(e.target.value), record)}
    //         style={{ width: "60px", textAlign: "center" }}
    //       />
    //       <button
    //         className="btn btn-outline-secondary"
    //         onClick={() => incrementQuantity(record)}
    //         style={{ marginLeft: "5px" }}
    //       >
    //         +
    //       </button>
    //     </div>
    //   ),
    // },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },

    {
      title: "Differ.",
      dataIndex: "differ",
      key: "differ",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <button
    //       className="btn btn-danger"
    //       onClick={() => handleDelete(record.sNo)}
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
    {
      title: "Action",
      // dataIndex: "action",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>

            <Link
              className="confirm-text p-2"
              to="#"
              onClick={() => handleDelete(record.sNo)}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
  ];

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Sample data
    const data = [
      ["SR No.", "Product Name", "Quantity", "Stock", "Unit", "Differ"],
    ];

    const headerRow = worksheet.addRow(data[0]);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" },
      };

      if (colNumber > 33) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF00FF00" },
        };
      }
    });

    // Add data rows
    for (let i = 1; i < data.length; i++) {
      worksheet.addRow(data[i]);
    }

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "physicalsample.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveHandler = async(e) =>{
     e.preventDefault()
     let phyDate = dates.physicalDate;
     let jsonData = {
      VchCode : modcode||0,
      accCode : selectValues?.stockType?.value || 0,
      seriesCode: selectValues?.series?.value || 0,
      mcCode : selectValues?.warehouse?.value || 0,
      date: moment(phyDate).format('DD/MMM/YYYY'),
      vchNo : vchNo||'',
      mastertype : parseInt(id),
      itemDt : selectedProducts
     }
     console.log("jsonData", JSON.stringify(jsonData))
      let saveurl = `/api/SavePhyscialStock`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", jsonData);
      if (res.status === 200) {
        alert(got.msg);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error:", got.msg)
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  }

  const modifyHandler = async () => {
    let url = `/api/GetPhysicalStockList?VchCode=${modcode}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        // resetHandler()
        const loadData = got.data[0];
        const itemArr = loadData.itemDt
        console.log('modifyData', loadData)
        setSelectValues({
          stockType: {value:loadData.accCode,label:loadData.accName},
          series: {value:loadData.seriesCode,label:loadData.seriesName},
          warehouse: {value:loadData.mcCode,label:loadData.mcName},
          product: null,
          bulktype: null,
          productgrp: null,
          prodType: null,
        });
       setSelectedProducts(itemArr)
       setVchNo(loadData.vchNo)
       let sDate = moment(loadData.date, "DD/MM/YYYY")
      // let eDate = moment(loadData.toDate, "DD/MM/YYYY")

      if (sDate.isValid()) {
        setDates({
          physicalDate: sDate.toDate(),
        });
      } else {
        console.error(
          "Invalid date format received from API:",
          loadData.sDate
        );
      }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    // resetHandler()
    modifyHandler()
  },[modcode])

  const resetHandler = ()=>{
    setSelectedProducts([])
    setSelectValues({
      stockType: null,
      series: null,
      warehouse: null,
      product: null,
      bulktype: null,
      productgrp: null,
      prodType: null,
    });
    setVchNo('')
    setDates({
      physicalDate: new Date()
    });
    modcode = 0
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Add {labelName}</h4>
                <h6>Create new {labelName}</h6>
              </div>
            </div>
            {loading ? (
              <ReactLoader loaderClass="position-absolute" loading={loading} />
            ) : null}
            <ul className="table-top-head">
              <li>
                <div className="page-btn">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <PlusCircle className="me-2" />
                    Bulk upload
                  </button>
                  {/* <AdditionalFields
                  additionalFieldData={additionalFieldData}
                  ProductModifyData={ProductModifyData}
                  modifyId={modifyId}
                /> */}
                </div>
              </li>
              <li>
                <div className="page-btn">
                  <Link to="#" className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to stockList
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
          <form onSubmit={() => {}}>
            <div className="card">
              <div className="card-body add-product pb-0">
                <form>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{labelName}</label>
                        <Select
                          name="stockType"
                          className="select"
                          options={stockTypeList}
                          value={selectValues.stockType}
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>Series</label>
                        <Select
                          name="series"
                          className="select"
                          options={seriesList}
                          value={selectValues.series}
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>Date</label>
                        {/* <Select className="select" options={optionsChoose} /> */}
                        {/* <DatePickerComponent/> */}
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={dates.physicalDate}
                          onChange={(date) =>
                            handleDateChange("physicalDate", date)
                          }
                          // style={{ width: "100%" }}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>VCh No.</label>
                        <input
                          type="text"
                          className="form-control"
                          value={vchNo}
                          onChange={(e) => setVchNo(e.target.value)}
                          disabled={isVchDisabled}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>Warehouse</label>
                        <Select
                          name="warehouse"
                          className="select"
                          options={wareHouseList}
                          value={selectValues.warehouse}
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>Products</label>
                        <Select
                          name="product"
                          className="select"
                          options={productList}
                          value={selectValues.product}
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      {/* <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Add Product
                      </button> */}
                      {/* <button  className="btn btn-submit" onClick={()=>{setShowModal(true)}}>
                        Bulk upload
                      </button> */}
                      {/* <Link
                          to="#"
                          className="btn btn-added color"
                          onClick={bulkShowHandler}
                        >
                          <Download className="me-2" />
                          Bulk Import
                        </Link> */}
                    </div>
                    <div className="col-lg-12">
                      <div className="modal-body-table">
                        <div className="table-responsive">
                          <Table
                            columns={columns}
                            dataSource={selectedProducts}
                            pagination={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Create Adjustment
                      </button>
                    </div> */}
                </form>
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
                <button className="btn btn-primary" onClick={(e)=>saveHandler(e)}>Save Product</button>
              </div>
            </div>
          </form>
          {/* /add */}
        </div>
        <BulkUploadModal
          downloadExcel={downloadExcel}
          handleClose={handleClose}
          show={showModal}
          handleSelectChange={handleSelectChange}
          selectValues={selectValues}
          productGroupList={productGroupList}
          productTypeList={productTypeList}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
      </div>
    </>
  );
};

export default StockPage;
