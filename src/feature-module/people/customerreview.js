import React, { useState } from "react";
import ReviewPage from "./reviewpage";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import { Link } from "react-router-dom";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import { filterData } from "../../common/filteredFunction";
import { showConfirmationStatusAlert } from "../../ReusableComponents/ConfirmAlert";

const CustomerReview = () => {
  let callFetch = useFetch();
  const [reviewStatusTable, setReviewStatusTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating- b.rating,
    },

    {
      title: "Status",
      dataIndex: "isApproved",
      render: (text, record) => (
        <>
          {text == 0 && (
            <span className="badges bg-lightred">Not Approved</span>
          )}
          {text == 1 && <span className="badges bg-lightgreen">Approved</span>}
        </>
      ),
      sorter: (a, b) => a.isApproved - b.isApproved,
    },

    {
      title: "Description",
      dataIndex: "desc",
      sorter: (a, b) => a.desc.length - b.desc.length,
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
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "1");
                  }}
                  // onClick={() => {
                  //   onRowClick(record, "1");
                  // }}
                >
                  {/* <img src="" className="me-2" alt="img" /> */}
                  Approved
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item"
                  //   data-bs-toggle="modal"
                  //   data-bs-target="#shipped"
                  // onClick={() => {
                  //   onRowClick(record, "0");
                  // }}
                  onClick={() => {
                    showConfirmationStatusAlert(onRowClick, record, "0");
                  }}
                >
                  Not Approved
                </Link>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];

  const GetReviewData = async () => {
    let url = `/api/CustomerReviewList?CustomerID=0&OrderItemID=0`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (got.status === 1) {
        let alldata = got.data;
        let filteredData = filterData(alldata, searchText, ['productName','customerName','rating','isApproved'])
        setReviewStatusTable(filteredData);
        // showToastMessage(got.msg);
        // setProductTableList(alldata)
      } else {
        showToastError(got.msg);
        setLoading(false);
        console.log("GET Review Response:", got.msg);
      }
      setLoading(false);
      // console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const reviewStatusUpdate = async (record, statusId) => {
    let url = `/api/CustomerReviewApproval?ID=${
      record.id
    }&IsApproved=${parseInt(statusId)}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (got.status == 1) {
        // showToastMessage(got.msg);
        GetReviewData();
        console.log("GET Review Response:", got);
      } else {
        showToastError(got.msg);
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    GetReviewData();
    // console.log(orderDetails, "ooodddd");
  }, []);

  const onRowClick = (record, statusId) => {
    reviewStatusUpdate(record, statusId);
    console.log("recordList", record);
    console.log("statusId", statusId);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    GetReviewData(value)
  };
  return (
    <>
      <ReactToast />
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <ReviewPage reviewStatusTable={reviewStatusTable} columns={columns} handleSearch={handleSearch}/>
    </>
  );
};

export default CustomerReview;
