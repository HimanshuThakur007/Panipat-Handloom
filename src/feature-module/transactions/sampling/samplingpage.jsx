import React, { useState } from "react";
import { Button } from "antd";
import useFetch from "../../../Hooks/useFetch";
import moment from "moment";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import SamplingPageJsx from "./samplingpagejsx";
import { getColumns } from "./samplingcolumn";

const SamplingPage = () => {
  const callFetch = useFetch();
  const navigate = useNavigate();
  const route = all_routes;
  const location = useLocation();
  const listData = location?.state?.code ?? {};
  const getsessionData = JSON.parse(sessionStorage.getItem("encryptedData"));
  console.log(getsessionData, "getSessionData");
  var userID = getsessionData?.userID;
  console.log("listData", listData);
  const id = location?.state?.id ?? "";
  // console.log(id,'id from location')

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [work, setWork] = useState("");
  const [tableData, setTableData] = useState([{ subWork: "", itemName: null }]);
  const [addedWorkData, setAddedWorkData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [disabledValue, setDisabledValue] = useState({
    sampling: "",
    enquiry: listData?.enqno,
    party: listData?.party,
    vchCode: 0,
    enqId: 0,
    // visitDate: listData?.visitDt ? new Date(Date.parse(listData.visitDt)) : null,
    // enqDate: listData?.enqDt ? new Date(Date.parse(listData.enqDt)) : null,
    visitDate: listData?.visitDt ? moment(listData.visitDt).toDate() : null,
    enqDate: listData?.enqDt ? moment(listData.enqDt).toDate() : null,
  });
  console.log(disabledValue.visitDate, "fdfddv");
  const [partyDetailTable, setPartyDetailTable] = useState([]);
  const [workInputError, setWorkInputError] = useState(false);

  const validateRow = (row) => {
    return row.subWork.trim() !== "";
    // return row.subWork.trim() !== "" && row.itemName !== null;
  };

  const handleAddRow = () => {
    const currentRow = tableData[tableData.length - 1];
    if (validateRow(currentRow)) {
      // const newRow = { subWork: "", itemName: null };
      const newRow = { subWork: "" };
      setTableData([...tableData, newRow]);
    } else {
      showToastError("Please fill in all fields before adding a new row.");
    }
  };

  const handleDeleteRow = (index) => {
    if (tableData.length > 1) {
      const updatedTableData = [...tableData];
      updatedTableData.splice(index, 1);
      setTableData(updatedTableData);
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatedTableData = [...tableData];
    if (field === "itemName") {
      const selectedItem = itemNameOptions.find(
        (option) => option.value === e.value
      );
      updatedTableData[index][field] = selectedItem ? selectedItem.value : null;
    } else {
      updatedTableData[index][field] = e.target.value;
    }
    setTableData(updatedTableData);
  };

  const handlePushToTable = (e) => {
    e.preventDefault();
    if (!work.trim()) {
      showToastError("Work input cannot be empty.");
      setWorkInputError(true);
      return;
    }

    const newWorkData = {
      work,
      subwork: tableData.map((row, idx) => ({
        ...row,
        globalIndex: idx + 1,
      })),
    };

    if (newWorkData.subwork.every(validateRow)) {
      setAddedWorkData([...addedWorkData, newWorkData]);
      // setTableData([{ subWork: "", itemName: null }]);
      setTableData([{ subWork: "" }]);
      setWork("");
    } else {
      showToastError("Please fill in all fields in the table before saving.");
    }
  };

  const handleEditFromTable = (workKey) => {
    const workData = addedWorkData.find((data) => data.work === workKey);
    if (workData) {
      setTableData(workData.subwork);
      setWork(workData.work);
      setEditingIndex(workKey);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedWorkData = {
      work,
      subwork: tableData.map((row, idx) => ({
        ...row,
        globalIndex: idx + 1,
      })),
    };

    // Find the index of the item being edited
    const workIndex = addedWorkData.findIndex(
      (item) => item.work === editingIndex
    );

    if (workIndex !== -1) {
      const updatedData = [...addedWorkData];
      updatedData[workIndex] = updatedWorkData;
      setAddedWorkData(updatedData);

      // setTableData([{ subWork: "", itemName: null }]);
      setTableData([{ subWork: "" }]);
      setWork("");
      setEditingIndex(null);
    }
  };

  const handleDeleteFromTable = (workName, globalIndex) => {
    setAddedWorkData((prevData) => {
      return prevData.map((workData) => {
        if (workData.work === workName) {
          return {
            ...workData,
            subwork: workData.subwork.filter(
              (record) => record.globalIndex !== globalIndex
            ),
          };
        }
        return workData;
      });
    });
  };

  const GetSamplingNo = async () => {
    let url = `/api/GetVchNo?RecType=2`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        setDisabledValue((prev) => ({
          ...prev,
          sampling: got.enqNo,
        }));
        console.log("got-data sampling number", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const GetItemName = async () => {
    let url = `/api/GetProductMasterName`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        let correctData = got?.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setItemNameOptions(correctData);
        console.log("itemName", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const init = async () => {
      if (id !== "2") {
        await GetSamplingNo();
        await getPartyDetailHandler(listData.id);
      } else if (id === "2") {
        await modifyHandler();
      }
    };

    init();
  }, [id, listData.id]);

  React.useEffect(() => {
    GetItemName();
  }, []);

  // React.useEffect(() => {

  // }, [listData.id]);

  const handleSaveSample = async (e) => {
    e.preventDefault();
    console.log("Transformed data:", addedWorkData);
    if (!addedWorkData || addedWorkData.length < 1) {
      showToastError("Please add at least one work detail before submitting.");
      return;
    }

    const workData = addedWorkData.map((item, index) => ({
      SrNo: index + 1,
      work: item.work,
      ProductDetails: item?.subwork.map((pd) => ({
        SrNo: index + 1,
        PSrNo: pd.globalIndex,
        subWork: pd.subWork,
        ProductCode: 0,
        Product: "",
      })),
    }));

    const requestBody = {
      enqID: id === "1" ? listData?.id : disabledValue.enqId,
      enqNo: id === "1" ? listData?.enqno : disabledValue.enquiry,
      vchcode: disabledValue.vchCode || 0,
      vchno: disabledValue.sampling || "",
      // date : listData?.visitDt,
      date: listData?.visitDt
        ? moment(listData.visitDt).format("DD/MMM/YYYY")
        : null || disabledValue.visitDate
        ? moment(disabledValue.visitDate).format("DD/MMM/YYYY")
        : null,
      party: listData?.partyCode,
      partyName: listData?.party,
      vchInt: 0,
      rectype: 2,
      // enqDT : listData?.enqDt,
      enqDT: listData?.enqDt
        ? moment(listData.enqDt).format("DD/MMM/YYYY")
        : null || disabledValue.enqDate
        ? moment(disabledValue.enqDate).format("DD/MMM/YYYY")
        : null,
      UCode: parseInt(userID),
      WorkDetails: workData,
    };

    console.log("sampling json", JSON.stringify(requestBody));

    let saveurl = `/api/SaveSampling?`;

    try {
      setLoading(true);

      const { res, got } = await callFetch(saveurl, "POST", requestBody);

      if (res.status === 200 && got.status === 1) {
        showToastMessage(got.msg);
        setTimeout(() => {
          navigate(`/samplinglist/${id}`);
        }, 1000);
      } else {
        showToastError(got.msg);
        console.log("save sampling error", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const modifyHandler = async () => {
    console.log("mod");
    let url = `/api/LoadSampling?id=${listData.id}`;
    console.log(url, "url====");
    setLoading(true);
    try {
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let modifyData = got.data[0];
        await getPartyDetailHandler(modifyData.enqID);
        setDisabledValue({
          enqId: modifyData.enqID,
          sampling: modifyData.vchno,
          enquiry: modifyData?.enqNo,
          party: modifyData?.partyName,
          vchCode: modifyData?.vchcode,
          // visitDate: modifyData?.date ? new Date(Date.parse(modifyData.date)) : null,
          // enqDate: modifyData?.enqDT ? new Date(Date.parse(modifyData.enqDT)) : null,
          visitDate: modifyData.date ? moment(modifyData.date).toDate() : null,
          enqDate: modifyData.enqDT ? moment(modifyData.enqDT).toDate() : null,
        });

        const workDetailsArr = modifyData.workDetails.map((modItem) => ({
          work: modItem.work,
          subwork: modItem?.productDetails.map((pItem) => ({
            globalIndex: pItem.pSrNo,
            subWork: pItem.subwork,
            itemName: pItem.productCode,
          })),
        }));
        setAddedWorkData(workDetailsArr);
        console.log("modDta", got);
      }
      setLoading(false);
      console.log("GET Response Modify:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const getPartyDetailHandler = async (enqID) => {
    let url = `/api/ViewEnqData?id=${enqID}`;
    console.log(url, "url====");
    setLoading(true);
    try {
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let partyData = got.data;
        setPartyDetailTable(partyData);
        console.log("enquiry/Party Details", got);
      }
      setLoading(false);
      console.log("GET Response Modify:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };
  console.log("setAddedWorkData", addedWorkData);

  return (
    <>
      <ReactToast />
      <SamplingPageJsx
        setDate={setDate}
        date={date}
        loading={loading}
        columns={getColumns(
          itemNameOptions,
          handleInputChange,
          handleAddRow,
          handleDeleteRow,
          validateRow,
          tableData
        )}
        work={work}
        setWork={setWork}
        tableData={tableData}
        editingIndex={editingIndex}
        handlePushToTable={handlePushToTable}
        handleUpdate={handleUpdate}
        groupedWorkData={addedWorkData}
        itemNameOptions={itemNameOptions}
        handleEditFromTable={handleEditFromTable}
        handleDeleteFromTable={handleDeleteFromTable}
        disabledValue={disabledValue}
        handleSaveSample={handleSaveSample}
        pathId={id}
        partyDetailTable={partyDetailTable}
        workInputError={workInputError}
      />
    </>
  );
};

export default SamplingPage;
