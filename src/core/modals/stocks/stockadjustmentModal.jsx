import React,{useState,useEffect} from "react";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { Table, Input } from "antd";
import useFetch from "../../../Hooks/useFetch";
import DatePicker from "react-datepicker";
import ExcelJS from 'exceljs';
import { Download } from "feather-icons-react/build/IconComponents";
const typeData = [
  {value:1, label:'From Excel'},
  {value:2, label:'From Product Group'}
]
const StockadjustmentModal = () => {
  const callFetch = useFetch();
  // const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
  const [wareHouseList, setWareHouseList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectValues, setSelectValues] = useState({
    series: null,
    warehouse: null,
    product: null,
    bulktype:null,
    productgrp: null,
    prodType: null
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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const bulkShowHandler =()=>{
    setShowModal(!showModal)
  }
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
  
      return updatedValues;
    });
  };

  const handleAddProduct = (selectedProduct) => {
    if (selectedProduct) {
      const product = productList.find((item) => item.value === selectedProduct.value);
  
      if (product) {
        const newProduct = {
          sNo: selectedProducts.length + 1,
          product: product.label,
          quantity: 0, 
          stock: product.purPrice, 
          unit: product.unit,
          differ: 0, 
        };
        setSelectedProducts([...selectedProducts, newProduct]);
      }
    }
  };
  

  const handleQuantityChange = (value, record) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.sNo === record.sNo) {
        return {
          ...product,
          quantity: value,
          differ: value - product.stock, // Calculate the difference
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const loadAllMaster = async () => {
    const fetchApi = [
      { apiUrl: `/api/getseriesmaster?Mastertype=504` },
      { apiUrl: `/api/Getmaster?Mastertype=309` },
      { apiUrl: `/api/getItemDetails` },
      { apiUrl: `/api/Getmaster?Mastertype=306` },
      { apiUrl: `/api/Getmaster?Mastertype=301` },
    ];

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
      setProductTypeList(masterDataArray[3])
      setProductGroupList(masterDataArray[4])
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  console.log('selectedprod',selectedProducts)

  const loadvchNo = async () => {
    let url = `/api/Getvchno?vchtype=504`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        const loadData = got;
        setVchNo(loadData.invNo); // Set the voucher number from the API response
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadAllMaster();
  }, []);

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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          type="number"
          value={record.quantity}
          onChange={(e) => handleQuantityChange(e.target.value, record)}
        />
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Differ",
      dataIndex: "differ",
      key: "differ",
    },
  ];

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
   
    // Sample data
    const data = [
      [
        "SR No.",
        "Product Name",
        "Quantity",
        "Stock",
        "Unit",
        "Differ"
      ],

     
    ];

    const headerRow = worksheet.addRow(data[0]);
    headerRow.eachCell((cell,colNumber) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };

      if (colNumber > 33) {
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
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'physicalsample.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Add Adjustment */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Adjustment</h4>
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
                  {/* {showModal === false && ( */}
                  <form>
                    <div className="row">
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
                      <div className="col-lg-3">
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
                      <div className="col-lg-5">
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
                      <div className="col-lg-6">
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

                      <div className="col-lg-6">
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
                        {/* <button type="submit" className="btn btn-submit">
                        Bulk upload
                      </button> */}
                        <Link
                          to="#"
                          className="btn btn-added color"
                          onClick={bulkShowHandler}
                        >
                          <Download className="me-2" />
                          Bulk Import
                        </Link>
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
                    <div className="modal-footer-btn">
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
                    </div>
                  </form>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockadjustmentModal;
