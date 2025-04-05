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
import MeasurmentPageJsx from "./measurmentpagejsx";
import { getMeasurmentColumns } from "./measurmentcolumn";

const MeasurmentPage = () => {
  const callFetch = useFetch();
  const navigate = useNavigate();
  const route = all_routes;
  const location = useLocation();
  const listData = location?.state?.code ?? {};
  const getsessionData = JSON.parse(sessionStorage.getItem("encryptedData"));
  // console.log(getsessionData, "getSessionData");
  var userID = getsessionData?.userID;
  // console.log("listData", listData.type);
  const id = location?.state?.id ?? "";
  // console.log(id, "id from location");

  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState("");
  const [tableData, setTableData] = useState([{ subWork: "", itemName: null }]);
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [addedWorkData, setAddedWorkData] = useState([]);
  const [disabledValue, setDisabledValue] = useState({
    measurment: "",
    sampling: "",
    samplingCode: "",
    enquiry: "",
    party: "",
    partycode: "",
    vchcode: 0,
    typeName:listData?.typeName,
    // visitDate: listData?.visitDt ? new Date(Date.parse(listData.visitDt)) : null,
    visitDate: listData?.visitDt
      ? new Date(Date.parse(listData.visitDt))
      : null,
    // enqDate: listData?.enqDt ? new Date(Date.parse(listData.enqDt)) : null,
    enqDate: "",
    enquiryId: 0,
    samplingDate: "",
    measuremntDate: "",
  });
  const [partyDetailTable, setPartyDetailTable] = useState([]);

  // console.log("disssds", disabledValue.enquiryId);

  // Update function for input values in each row
  const handleInputChange = (workIndex, subworkIndex, field, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return; 
    const updatedData = [...addedWorkData];
    updatedData[workIndex].subwork[subworkIndex][field] = value;
    setAddedWorkData(updatedData);
  };


  const GetMeasurmentNo = async () => {
    let url = `/api/GetVchNo?RecType=3`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        setDisabledValue((prev) => ({
          ...prev,
          measurment: got.enqNo,
        }));
        // console.log("got-data sampling number", got);
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

        //  setItemNameOptions(correctData)
        // console.log('itemName',got)
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
        await GetMeasurmentNo();
        await loadSamplingHandler();
        // await getPartyDetailHandler(listData.id);
      } else if (id === "2") {
        await modifyHandler();
      }
    };

    init();
  }, [id, listData.id]);

  React.useEffect(() => {
    GetItemName();
  }, []);

  const handleSaveMeasurment = async (e) => {
    e.preventDefault();
    console.log("Transformed data:", addedWorkData);
    if (!addedWorkData || addedWorkData.length < 1) {
      showToastError("Please add at least one work detail before submitting.");
      return;
    }

    const workData = addedWorkData.map((item, index) => ({
      SrNo: index + 1,
      work: item.work,
      MeasureProductDT: item?.subwork.map((pd) => ({
        SrNo: index + 1,
        PSrNo: pd.globalIndex,
        subWork: pd.subWork,
        ProductCode: 0,
        Product: "",
        // ProductCode: pd.productCode,
        // Product: pd.product,
        height: pd.height || "",
        width: pd.width || "",
        length: pd.length || "",
      })),
    }));

    const requestBody = {
      type : listData.type,
      enqID: listData.type === 0 ? disabledValue?.enquiryId : disabledValue?.samplingCode,
      enqNo: listData.type === 0 ? disabledValue?.enquiry : disabledValue?.sampling,
      vchcode: disabledValue.vchcode || 0,
      vchno: "",
      // date : disabledValue?.visitDate,
      date: disabledValue?.visitDate
        ? moment(disabledValue.visitDate).format("DD/MMM/YYYY")
        : null,
      party: disabledValue?.partycode,
      partyName: disabledValue?.party,
      vchInt: 0,
      rectype: 3,
      SampleID:  listData.type === 0 ? disabledValue?.samplingCode : 0,
      SampleNo: listData.type === 0 ? disabledValue?.sampling:'',
      UCode: userID,
      // enqDT: disabledValue?.enqDate
      //   ? moment(disabledValue.enqDate).format("DD/MMM/YYYY")
      //   : null,
      enqDT: listData.type === 1 && disabledValue
        ? moment(disabledValue.samplingDate).format("DD/MMM/YYYY")
        : listData.type === 0 && moment(disabledValue.enqDate).format("DD/MMM/YYYY"),
      MeasureWorkDT: workData,
    };

    console.log("measurment json", JSON.stringify(requestBody));
    console.log("json", addedWorkData);

    let saveurl = `/api/SaveMeasurement?`;

    try {
      setLoading(true);

      const { res, got } = await callFetch(saveurl, "POST", requestBody);

      if (res.status === 200 && got.status === 1) {
        showToastMessage(got.msg);
        setTimeout(() => {
          navigate(`/measurmentlist/${id}`);
        }, 1000);
      } else {
        showToastError(got.msg);
        console.log("save measurment error", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const modifyHandler = async () => {
    let url = `/api/LoadMeasurement?id=${listData.id}`;
    setLoading(true);
    try {
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let modifyData = got.data[0];
        setDisabledValue({
          measurment: modifyData?.vchno,
          samplingDate: listData.type === 0 && modifyData?.sampleDt
            ? new Date(Date.parse(modifyData.sampleDt))
            : new Date(Date.parse(modifyData.enqDt)),
          measuremntDate: new Date(modifyData?.date || Date.now()),
          sampling: listData.type === 0 ? modifyData.sampleNo : modifyData?.enqNo,
          enquiry: listData.type === 0 ? modifyData?.enqNo : modifyData?.sampleNo,
          party: modifyData?.partyName,
          partycode: modifyData?.party,
          samplingCode: modifyData.sampleID,
          visitDate: modifyData?.date
            ? new Date(Date.parse(modifyData.date))
            : null,
          enqDate: modifyData?.enqDt
            ? new Date(Date.parse(modifyData.enqDt))
            : null,
          enquiryId: modifyData?.enqID,
          vchcode: modifyData.vchcode,
        });

        const workDetailsArr = modifyData.measureWorkDT.map((modItem) => ({
          work: modItem.work,
          subwork: modItem?.measureProductDT.map((pItem) => ({
            globalIndex: pItem.pSrNo,
            subWork: pItem.subwork,
            itemName: pItem.product,
            length: pItem.length,
            width: pItem.width,
            height: pItem.height,
          })),
        }));
        setAddedWorkData(workDetailsArr);
        console.log("loadmodifyData", got);
      }
      setLoading(false);
      console.log("GET Response Modify:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loadSamplingHandler = async () => {
    let url = `/api/LoadSampling?id=${listData.id}&Type=${listData.type}`;
    console.log(url, "url====");
    setLoading(true);
    try {
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        console.log('new-MeasurmentForm-Data', got)
        let modifyData = got.data[0];
        setDisabledValue((prev) => ({
          ...prev,
          samplingDate: modifyData?.date
            ? new Date(Date.parse(modifyData.date))
            : null,
          measuremntDate: new Date(),
          sampling: modifyData.vchno,
          enquiry: modifyData?.enqNo,
          enquiryId: modifyData?.enqID,
          party: modifyData?.partyName,
          partycode: modifyData?.party,
          samplingCode: modifyData.vchcode,
          // visitDate: modifyData?.date ? new Date(Date.parse(modifyData.date)) : null,
          enqDate: modifyData?.enqDT
            ? new Date(Date.parse(modifyData.enqDT))
            : null,
        }));

        const workDetailsArr = modifyData.workDetails.map((modItem) => ({
          work: modItem.work,
          subwork: modItem?.productDetails.map((pItem) => ({
            globalIndex: pItem.pSrNo,
            subWork: pItem.subwork,
            itemName: pItem.product,
            length: "",
            width: "",
            height: "",
          })),
        }));
        setAddedWorkData(workDetailsArr);
      }
      setLoading(false);
      console.log("GET Response load Sampling:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // =========Add work ========================
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

  const handleInputChange2 = (e, index, field) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = e.target.value; // Dynamically change field values
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
      setTableData([{ subWork: "",length:'',width:'',height:'' }]);
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

  return (
    <>
      <ReactToast />
      <MeasurmentPageJsx
        loading={loading}
        groupedWorkData={addedWorkData}
        disabledValue={disabledValue}
        handleSaveMeasurment={handleSaveMeasurment}
        pathId={id}
        partyDetailTable={partyDetailTable}
        handleInputChange={handleInputChange}
        columns={getMeasurmentColumns(
          itemNameOptions,
          handleInputChange2,
          handleAddRow,
          handleDeleteRow,
          validateRow,
          tableData
        )}
        handleDeleteFromTable={handleDeleteFromTable}
        workInputError={workInputError}
        work={work}
        setWork={setWork}
        tableData={tableData}
        editingIndex={editingIndex}
        handlePushToTable={handlePushToTable}
        handleUpdate={handleUpdate}
        handleEditFromTable={handleEditFromTable}
        itemNameOptions={itemNameOptions}
        type={listData.type}
      />
    </>
  );
};

export default MeasurmentPage;
