import React, { useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { Filter, Sliders, Box } from "react-feather";
import Select from "react-select";
import moment from "moment";
import useFetch from "../../Hooks/useFetch";
import { filterData } from "../../common/filteredFunction";
import { Table } from "antd";
import ReactLoader from "../../ReusableComponents/ReactLoader";

const PurchaseReport = () => {
  let callFetch = useFetch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [orderStatusTable, setOrderStatusTable] = useState([]);

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
      sorter: (a, b) => new Date(a.dtDate) - new Date(b.dtDate)
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
      sorter: (a, b) => a.totAmt - b.totAmt,
    },
  ];
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    GetOrderData(value)
  };



  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  // const productOptions = [
  //   { value: "chooseProduct", label: "Choose Product" },
  //   { value: "boldV3.2", label: "Bold V3.2" },
  //   { value: "nikeJordan", label: "Nike Jordan" },
  // ];

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

  React.useEffect(()=>{
    GetOrderData()
  },[])
  return (
    <div className="page-wrapper">
       {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <Breadcrumbs
          maintitle="Orders Report"
          subtitle=" Manage Your Orders Report"
        />
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
              {/* <div className="form-sort stylewidth">
                <Sliders className="info-img" />

                <Select
                  className="select "
                  options={options}
                  placeholder="Sort by Date"
                />
              </div> */}
            </div>
            {/* /Filter */}
            {/* <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="input-blocks">
                      <Box className="info-img" />
                      <Select className="select" options={productOptions} />
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-6 col-12">
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
            </div> */}
            {/* /Filter */}
            <div className="table-responsive">
            <Table
                  className="table datanew dataTable no-footer"
                    columns={columns}
                    dataSource={orderStatusTable}
                    rowKey={(record) => record.code}
                  />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default PurchaseReport;
