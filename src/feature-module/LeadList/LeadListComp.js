import React, { useState } from "react";
import LeadListPage from "./LeadListPage";
import useFetch from "../../Hooks/useFetch";
import ReactLoader from "../../ReusableComponents/ReactLoader";

const LeadListComp = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Company Name",
      dataIndex: "compName",
      sorter: (a, b) => a.compName.length - b.compName.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobNo",
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
  ];
  let callFetch = useFetch();
  const [leadTable, setLeadTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetLeadData = async () => {
    let url = `/api/GetCustomerInquiry`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        // let filteredData = filterData(alldata, searchText, ['orderNo','name','dtDate','statusName'])
        setLeadTable(alldata);
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
  React.useEffect(() => {
    GetLeadData();
  }, []);
  return (
    <>
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <LeadListPage leadTable={leadTable} columns={columns} />
    </>
  );
};

export default LeadListComp;
