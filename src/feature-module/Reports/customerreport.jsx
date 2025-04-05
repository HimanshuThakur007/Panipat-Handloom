import React, { useState } from "react";
import { Filter, Sliders } from "react-feather";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Select from "react-select";
import { StopCircle, User } from "react-feather";
import Breadcrumbs from "../../core/breadcrumbs";
import useFetch from "../../Hooks/useFetch";
import { filterData } from "../../common/filteredFunction";
import ReactToast, { showToastError } from "../../ReusableComponents/ReactToast";
import { Table } from "antd";
import ReactLoader from "../../ReusableComponents/ReactLoader";

const CustomerReport = () => {
  const callFetch = useFetch();
  const [customerTableData, setCustomerTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('');

  const columns= [
      {
        title: "Company Name",
        dataIndex: "companyName",
        sorter: (a, b) => a.companyName.length - b.companyName.length,
      },
  
      {
        title: "Customer Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
      },
      
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        sorter: (a, b) => a.mobile.length - b.mobile.length,
      },
  
      {
        title: "Email",
        dataIndex: "emailID",
        sorter: (a, b) => a.emailID.length - b.emailID.length,
      },
  
      {
        title: "Country",
        dataIndex: "countryName",
        sorter: (a, b) => a.countryName.length - b.countryName.length,
      },
  
      {
        title: "City",
        dataIndex: "city",
        sorter: (a, b) => a.city.length - b.city.length,
      },
      {
        title: "Status",
        dataIndex: "isApproved",
        render: (text, record) => (
          <>
            {text == 0 && (
              <span className="badges bg-lightred">Not Approved</span>
            )}
            {text == 1 && (
              <span className="badges bg-lightgreen">Approved</span>
            )}
           
          </>
        ),
        sorter: (a, b) => a.isApproved.length - b.isApproved.length,
      },
]

  const handleSearch = (value) => {
    setSearchText(value);
    customerDataHandler(value)
  };


  const customerDataHandler = async () => {
    let customerurl = `/api/GetCustomerList`;
      try {
        setLoading(true)
          const { res, got } = await callFetch(customerurl, 'GET');
          // Handle response data
          if(res.status == 200){
           let customerData = got.data
           let filteredData = filterData(customerData, searchText, ['companyName','name','mobile','emailID','isApproved'])
           setCustomerTableData(filteredData)
          //  showToastMessage(got.msg)
            console.log('customerData:', customerData);
            // console.log('GET Response:', got);
          }
          setLoading(false)
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          showToastError(error)
          setLoading(false)
      }
  };

  React.useEffect(()=>{
    customerDataHandler()
  },[searchText])
  return (
    <div className="page-wrapper">
      <ReactToast/>

      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <Breadcrumbs
          maintitle="Customer Report"
          subtitle="Manage Your Customer Report"
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
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <User className="info-img" />
                      <Select
                        className="select"
                        options={optionsName}
                        placeholder="Choose Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <User className="info-img" />
                      <Select
                        className="select"
                        options={optionsID}
                        placeholder="Choose ID"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <StopCircle className="info-img" />
                      <Select
                        className="select"
                        options={optionsStatus}
                        placeholder="Choose Status"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <ImageWithBasePath
                        src="assets/img/icons/payment-status.svg"
                        className="info-img status-icon"
                        alt="Icon"
                      />
                      <Select
                        className="select"
                        options={optionsPaymentStatus}
                        placeholder="Choose Payment Status"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <a className="btn btn-filters ms-auto">
                        {" "}
                        <i
                          data-feather="search"
                          className="feather-search"
                        />{" "}
                        Search{" "}
                      </a>
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
                    dataSource={customerTableData}
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

export default CustomerReport;
