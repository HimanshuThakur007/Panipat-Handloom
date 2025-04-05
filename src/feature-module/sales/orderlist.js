/* eslint-disable react/prop-types */
import React, { useState } from "react";
import OrderListPage from "./orderlistpage";
import { Link } from "react-router-dom";
import ShippedModal from "./modals/ShippedModal";
import useFetch from "../../Hooks/useFetch";
import OrderDetailsModal from "./modals/OrderDetailsModal";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import { filterData } from "../../common/filteredFunction";
import moment from "moment";
import { showConfirmationStatusAlert } from "../../ReusableComponents/ConfirmAlert";

const OrderList = () => {
  let callFetch = useFetch();
  const [orderStatusTable, setOrderStatusTable] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [inputValues, setInputValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShippedModalOpen, setIsShippedModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const columns = [
    {
      title: "Costumer Name",
      dataIndex: "name",
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: "Order No.",
      dataIndex: "orderNo",
      sorter: (a, b) => a.orderNo.length - b.orderNo.length,
    },
    {
      title: "Date",
      dataIndex: "dtDate",
      sorter: (a, b) => a.dtDate.length - b.dtDate.length,
    },

    {
      title: "Status",
      dataIndex: "statusName",
      render: (text, record) => (
        <>
          {text === "Pending" && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {record.status === 0 && (
            <span className="badges bg-secondary">{text}</span>
          )}
          {record.status === 2 && (
            <span className="badges bg-info">{text}</span>
          )}
          {record.status === 4 && (
            <span className="badges bg-lightgreen">{text}</span>
          )}
          {record.status === 5 && (
            <span className="badges bg-lightred">{text}</span>
          )}
          {record.status === 1 && (
            <span className="badges bg-lightyellow">{text}</span>
          )}
          {record.status === 3 && (
            <span className="badges" style={{backgroundColor: "#ffcb00"}}>{text}</span>
          )}
        
        </>
      ),
      sorter: (a, b) => a.statusName.length - b.statusName.length,
    },

    {
      title: "Total Amount",
      dataIndex: "totAmt",
      sorter: (a, b) => a.totAmt.length - b.totAmt.length,
    },

    {
      title: "Action",
      render: (text, record) => (
        <>
          <div className="text-center">
            <Link
              className="action-set"
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  // onClick={() => {
                  //   onRowClick(record, "1", "1");
                  // }}
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "1","1");
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Approved
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#shipped"
                //   onClick={() => {
                //     onRowClick(record, "2", "1");
                //   }}
                onClick={() => {
                    onShippedClick(record);
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Shipped
                  {/* shipped */}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  // onClick={() => {
                  //   onRowClick(record, "3", "1");
                  // }}
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "3","1");
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Out for Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  // onClick={() => {
                  //   onRowClick(record, "4", "1");
                  // }}
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "4","1");
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Delivered
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  // onClick={() => {
                  //   onRowClick(record, "5", "1");
                  // }}
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "5","1");
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Cancel
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#orderdetails"
                  onClick={() => {
                    GetOrderDetails(record);
                  }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  {/* orderdetails */}
                  Order Detail
                </Link>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    GetOrderData(value)
  };

  const onShippedClick = (record) => {
    setSelectedRecord(record);
    setIsShippedModalOpen(true);
  };

  const handleShippedSave = () => {
    if (selectedRecord) {
      orderStatusUpdate(selectedRecord, "2", "1");
      setIsShippedModalOpen(false);
    }
  };
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('DD-MMM-YYYY');
  console.log("formattedDate", formattedDate);
  
  const GetOrderData = async () => {
    let url = `/api/AdminOrderList?CustomerID=0&FDate=26-jan-2023&TDate=${formattedDate}&Status=0`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        let filteredData = filterData(alldata, searchText, ['orderNo','name','dtDate','statusName'])
        setOrderStatusTable(filteredData);
        // setProductTableList(alldata)
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };
  const GetOrderDetails = async (record) => {
    let url = `/api/GetOrderDetails?ID=${record.id}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        const orderData = alldata.map((item) => {
          return item.orderPlaceDetails.map((order) => ({
            id: order.id,
            orderItemID: order.orderItemID,
            productID: order.productID,
            productName: order.productName,
            qty: order.qty,
            price: order.price,
            amount: order.amount,
            status: order.status,
            statusName: order.statusName,
            awbNo: order.awbNo,
          }));
        });
        setOrderDetails(orderData[0]);
        // setProductTableList(alldata)
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const orderStatusUpdate = async (record, statusId, type) => {
    // e.preventDefault()
    const requestBody = {
      Type: parseInt(type),
      ID: type == 1 ? parseInt(record.id) : parseInt(record.orderItemID),
      Status: parseInt(statusId),
      AWBNo: inputValues || "",
    };
    console.log("userJson", JSON.stringify(requestBody));
    let saveurl = `/api/OrderStatusUpdate`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        GetOrderData();
      } else {
        showToastError(got.msg);
      }
      // Handle response data
      console.log("POST Response:", got);
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    GetOrderData();
    // console.log(orderDetails, "ooodddd");
  }, []);

  const onRowClick = (record, statusId, type) => {
    orderStatusUpdate(record, statusId, type);
    console.log("recordList", record);
    console.log("statusId", statusId);
  };

  
  return (
    <>
      <ReactToast />
      {/* <ShippedModal inputValues={inputValues} setInputValues={setInputValues} /> */}
      <ShippedModal inputValues={inputValues} setInputValues={setInputValues}  
        isOpen={isShippedModalOpen}
        onClose={() => setIsShippedModalOpen(false)}
        onSave={handleShippedSave}/>
      <OrderDetailsModal onRowClick={onRowClick} orderDetails={orderDetails} />
      <OrderListPage orderTableData={orderStatusTable} columns={columns} handleSearch={handleSearch}/>
    </>
  );
};

export default OrderList;
