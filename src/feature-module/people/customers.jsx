import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import Select from "react-select";
import { Edit, Eye, Globe, Trash2, User } from "react-feather";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { AddCustomerColumns } from "../AllPageColumns/TableColumns";
import { showConfirmationAlert } from "../../ReusableComponents/ConfirmAlert";
import { toggleFilterVisibility } from "../usermanagement/usersFunctionality";
import TableTop from "../../ReusableComponents/TableTop";
import CustomermodalPage from "../../core/modals-js/peoples/customermodalpage";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import { filterData } from "../../common/filteredFunction";
import DataTable from "../../common/DataTable";
import { useParams } from "react-router-dom";
// import useFetch from "../../Hooks/useFetch";

const Customers = () => {
  const callFetch = useFetch();
  const {id} = useParams() 
  const [customerTableData, setCustomerTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [customerCode, setCustomerCode] = useState(0);
  const [searchText, setSearchText] = useState("");


  const customerDataHandler = async () => {
    setCustomerTableData([])
    let customerurl = `/api/GetCustomerList?MasterType=${parseInt(id)}`;
    console.log("customerUrl",customerurl)
    try {
      setLoading(true);
      const { res, got } = await callFetch(customerurl, "GET");
      // Handle response data
      if (res.status == 200 && got.status === 1) {
        let customerData = got.data;
        let filteredData = filterData(customerData, searchText, [
          "companyName",
          "name",
          "mobile",
          "emailID",
          "isApproved",
        ]);
        setCustomerTableData(filteredData);
        //  showToastMessage(got.msg)
        console.log("customerData:", customerData);
        // console.log('GET Response:', got);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      showToastError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    customerDataHandler();
  }, [searchText, id]);

  const HandelEdit = (record) => {
    let customerID = record.id;
    setCustomerCode(customerID);
    console.log("rrrsss", customerID);
  };

  const resetHandler = (fun) => {
    global.resetFun = fun;
  };

  function reset() {
    console.log("hello from customer");
    global.resetFun();
  }

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];

  // const onRowClick = (record,aprovedId) => {
  //   customerApprove(record,aprovedId);
  //   console.log("record", record);
  // };

  // =============================================delete-Handler=======================================================
  const CustomerDelete = async (ID) => {
    let url = `/api/DelCustomer?CustomerID=${ID}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        // alert(got.msg)
        customerDataHandler();
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const columns = AddCustomerColumns(HandelEdit, CustomerDelete, id);
  const handleSearch = (value) => {
    setSearchText(value);
    customerDataHandler(value);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ReactToast />
        {loading ? (
          <ReactLoader loaderClass="position-absolute" loading={loading} />
        ) : null}
        <Breadcrumbs
           maintitle={id === "1" ? "Customer List" : "Supplier List"}
           subtitle={`Manage Your ${id === "1" ? "Customer" : "Supplier"}`}
           addButton={`Add New ${id === "1" ? "Customer" : "Supplier"}`}
           linkClick={reset}
        />

        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <TableTop
              handleSearch={handleSearch}
              isFilterVisible={isFilterVisible}
              toggleFilterVisibility={() =>
                toggleFilterVisibility({ setIsFilterVisible })
              }
              options={options}
            />
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={customerTableData}
                rowSelectionEnabled={false}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
      <CustomermodalPage
        id ={id}
        customerCode={customerCode}
        resetHandler={resetHandler}
        setCustomerCode={setCustomerCode}
        customerDataHandler={customerDataHandler}
      />
    </div>
  );
};

export default Customers;
