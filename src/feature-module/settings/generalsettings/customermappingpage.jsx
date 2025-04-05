import React, { useState } from "react";
import { Button, Modal } from "antd";
import ReactSelect from "react-select";
import ReactToast, { showToastError, showToastMessage } from "../../../ReusableComponents/ReactToast";
import CustomerMapping from "./customermapping";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";

const customerList = [
  { value: 201, label: "Customer" },
  { value: 202, label: "Super Stockist" },
  { value: 203, label: "Distributor" },
  { value: 204, label: "Retailer" },
];

const CustomerMappingPage = () => {
  const [data, setData] = useState([]);
  const [selectedSalesmen, setSelectedSalesmen] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [beatList, setBeatList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [modalType, setModalType] = useState("");
  let callFetch = useFetch();

  const handelCustomerSelect = (select) => {
    setSelectedCustomer(select);
  };

  const handleSave = (code) => {
    const rowToSave = data.find((item) => item.code === code);
    const transformedRow = {
      ...rowToSave,
      // salesmen: rowToSave.salesmen.map((s) => ({ value: s.value, label: s.label })),
      salesmen: rowToSave.salesmen.map((s) => ({ code: s.value, name: s.label })),
    };
    console.log("Saving row:", JSON.stringify(transformedRow));
    priceListSave(transformedRow);
  };

  const handleOpenModal = (code, type) => {
    setCurrentCode(code);
    setModalType(type);

    if (type === "salesman") {
      const currentSalesmen = data.find((item) => item.code === code)?.salesmen || [];
      setSelectedSalesmen(currentSalesmen.map((s) => ({ value: s.value, label: s.label })));
    } else if (type === "beat") {
      const beat = data.find((item) => item.code === code)?.beatCode  || "";
      setSelectedBeat(beatList.find((b) => b.value === beat) || null);
    }

    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newData = data.map((item) => {
      if (item.code === currentCode) {
        if (modalType === "salesman") {
          return { ...item, salesmen: selectedSalesmen.map((s) => ({ value: s.value, label: s.label })) };
        } else if (modalType === "beat") {
          return { ...item, beat: selectedBeat?.label || "", beatCode: selectedBeat?.value || ""  };
        }
      }
      return item;
    });
    setData(newData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const loadAllMaster = async () => {
    const fetchApi = [
      { apiUrl: `/api/Getmaster?Mastertype=103` },
      { apiUrl: `/api/GetUser?Mastertype=2` },
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
            })),
          ];
        } else {
          setLoading(false);
          throw new Error(`Failed to fetch data from ${item.apiUrl}`);
        }
      });

      const masterDataArray = await Promise.all(promises);
      setBeatList(masterDataArray[0]);
      setUserList(masterDataArray[1]);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loadCustomerTable = async () => {
    let url = `/api/GetCustomerMappingDetails?MasterType=${selectedCustomer?.value}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
  
      if (res.status === 200) {
        console.log("all",got.data)
        // Transform the salesmen array in the data
        const loadData = got.data.map(item => ({
          ...item,
          salesmen: item.salesmen.map(salesman => ({
            value: salesman.code, 
            label: salesman.name,
          })),
          beat: item.beat, 
          beatCode: item.beatCode
        }));
        
        setData(loadData);
        console.log("loadData", JSON.stringify(loadData));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  

  const priceListSave = async (data) => {
    let saveurl = `/api/SaveCustomerMapping`;

    try {
      const { res, got } = await callFetch(saveurl, "POST", data);
      if (got.status === 1) {
        showToastMessage(got.msg);
      } else {
        showToastError(got.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    loadAllMaster();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   sorter: (a, b) => a.address.length - b.address.length,
    // },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.length - b.city.length,
    },
    {
      title: "SalesMan",
      dataIndex: "salesmen",
      render: (salesmen, record) => (
        <>
          <span>{salesmen.map((s) => s.label).join(", ") || "N/A"}</span>
          <Link to="#" className="btn btn-added" onClick={() => handleOpenModal(record.code, "salesman")}>
            <PlusCircle className="me-2 iconsize" />
          </Link>
        </>
      ),
    },
    {
      title: "Beat",
      dataIndex: "beatCode",
      render: (beatCode, record) => (
        <>
          {/* <span>{beatList.find((b) => b.value === beat)?.label || "N/A"}</span> */}
          <span>{beatList.find((b) => b.value === beatCode)?.label || "N/A"}</span>
          <Link to="#" className="btn btn-added" onClick={() => handleOpenModal(record.code, "beat")}>
            <PlusCircle className="me-2 iconsize" />
          </Link>
        </>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleSave(record.code)}>
          Save
        </Button>
      ),
    },
  ];

  return (
    <>
      <ReactToast />
      <CustomerMapping
        columns={columns}
        dataSource={data}
        handleSave={handleSave}
        customerList={customerList}
        selectedCustomer={selectedCustomer}
        loadCustomerTable={loadCustomerTable}
        handelCustomerSelect={handelCustomerSelect}
      />
      <Modal
        title={modalType === "salesman" ? "Select Salesmen" : "Select Beat"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalType === "salesman" ? (
          <ReactSelect
            isMulti
            options={userList}
            value={selectedSalesmen}
            onChange={setSelectedSalesmen}
            styles={{
              control: (base) => ({
                ...base,
                marginTop: 8,
              }),
            }}
          />
        ) : (
          <ReactSelect
            options={beatList}
            value={selectedBeat}
            onChange={setSelectedBeat}
            styles={{
              control: (base) => ({
                ...base,
                marginTop: 8,
              }),
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default CustomerMappingPage;
