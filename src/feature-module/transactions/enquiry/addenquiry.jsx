/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AddEquiryPage from "./addenquirypage";
import { Button } from "antd";
import useFetch from "../../../Hooks/useFetch";
import moment from "moment";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import AddInventory from "../../../core/modals/inventory/inventoryadd";
import { Inventorylogic } from "../../inventory/inventorylogic";


const AddEnquiry = () => {
  const callFetch = useFetch();
  const navigate = useNavigate();
  // const {handleSaveMaster} = Inventorylogic()
  const route = all_routes;
  const [id , setId] = useState(0)
  const location = useLocation();
if(location && location.state !== undefined && location.state !== null){
    var modCode = location.state.code
}
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState("");
  const [enquiryNo, setEnquiryNo] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [partyList, setPartyList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectParty, setSelectParty] = useState(null);
 const [formData, setFormData] = useState({
    source:'',
    purpose:""
  });
 const [masterArray, setMasterArray] = useState({
    source:[],
    purpose:[]
  });
  const [selectedMaster, setSelectedMaster] = useState({
    source:null,
    purpose:null,
  });
  const selectPartyHandler = (selected) => {
    setSelectParty(selected);
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const idHandler = (ids)=>{
    setId(ids)
  }

  const handleSelectChange = (selectedOption, selectName) => {
    // const value = selectedOption !== null ? selectedOption.value : 0;
    console.log(selectedOption,selectName,'selected')
    setSelectedMaster((prev) => ({
      ...prev,
      [selectName]: selectedOption,
    }));
  };

    // ====================================Save-Master-Data================================
  const handleSaveMaster = async (e, val) => {
    console.log("master",val)
    e.preventDefault();
    const requestBody = {
      ID: 0,
      MasterType: parseInt(val),
      Alias: '',
      TextPer: 0,
      Name:
        id == "5"
          ? formData.source
          : id == "6"
          ? formData.purpose
          : "" || '',
      ParentID: 0,
      Base64:'',
      SubChild:0
    };
    console.log("userJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveMaster`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        setFormData({
          source:"",
          purpose:"",
        });
       
        loadAllMaster();
        // handleClose()
      } else {
        showToastError(got.msg);
      }
      setLoading(false);
      // Handle response data
      console.log("POST Response:", got);
    } catch (error) {
      // Handle errors
      setLoading(false);
      console.error("Error:", error);
    }
  };
  
    // ==============================All-MasterType-dropdownLoad============================
    const loadAllMaster = async () => {
      const fetchApi = [
        { apiUrl: `/api/GetMasterforOther?MasterType=12&ParentID=0` },
        { apiUrl: `/api/GetMasterforOther?MasterType=13&ParentID=0` },
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
        setMasterArray({
          source:masterDataArray[0],
          purpose:masterDataArray[1]
        })
       
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
        setLoading(false);
      }
    };

    React.useEffect(()=>{
      loadAllMaster()
    },[])

  const GetVchNo = async () => {
    let url = `/api/GetVchNo?RecType=1`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status == 200) {
        setEnquiryNo(got.enqNo)
      }
      setLoading(false);
      console.log("GET Response vchNo:", got);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const LoadParty = async () => {
    let url = `/api/LoadParty?rectype=1`;
    console.log("reload");
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status == 200) {
        let alldata = got.data;
        let correctData = alldata.map((item) => ({
          value: item.id,
          label: item.companyName,
        }));
        setPartyList(correctData);
        console.log("get Party", got);
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const modifyHandler = async () => {
    let url = `/api/GetEnquryDetails?ID=${modCode}`;
    setLoading(true)
      try {
          const { res, got } = await callFetch(url, 'GET');
          // Handle response data
          if(res.status == 200){
            let modifyData = got.data[0]
            setEnquiryNo(modifyData.vchno)
            setSelectParty({value:modifyData.party,label:modifyData.partyName})
            const corrData = modifyData?.enquiryDetails?.map((items)=>({
               SrNo: items.srNo,
            work: items.work,
            Desc: items.desc,
            }))
            setDate(new Date(modifyData?.date || Date.now()))
            setTableData(corrData)
            setSelectedMaster({
              source:{value: modifyData.source, label: modifyData.sourceName},
              purpose:{value: modifyData.purpose, label: modifyData.purposeName},
            })
          
          }
          setLoading(false)
          console.log('GET Response Modify:', got);
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          setLoading(false)
      }
  };

  React.useEffect(()=>{
    if(modCode != 0 && modCode != undefined && modCode != null ){
      modifyHandler()
    }else{
      GetVchNo();
    }
  },[modCode])

  React.useEffect(() => {
    LoadParty();
  }, []);

  const columns = [
    {
      title: "Work",
      dataIndex: "work",
      key: "work",
    },
    {
      title: "Description",
      dataIndex: "Desc",
      key: "Desc",
    },
    {
      title: "Action",
      key: "action",
      width: '150px',
      render: (text, record, index) => (
        <a className="confirm-text p-2">
        <i
          data-feather="trash-2"
          className="feather-trash-2"
          onClick={()=>handleDelete(index)}
        ></i>
      </a>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record, index) => (
    //     <Button type="link" danger onClick={() => handleDelete(index)}>
    //       Delete
    //     </Button>
    //   ),
    // },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
  
    const inputData = [];
    
    // Check if input fields have data
    if (work) {
      inputData.push({
        SrNo: tableData?.length + 1 + inputData.length, 
        work: work,
        Desc: description || "", 
      });
    }
    const updatedData = [...tableData, ...inputData];
  
    if (updatedData.length > 0) {
      setTableData(updatedData);
      setWork("");
      setDescription("");
    } else {
      showToastError("At least one of 'Work' or 'Description' is mandatory.");
    }
  };
  
  const handleDelete = (index) => {
    const newData = tableData.filter((_, idx) => idx !== index);
    setTableData(newData);
  };

  const handleSaveEnquiry = async (e) => {
    e.preventDefault();
    const newEntry = work && work.trim().length > 0 ? [{
      SrNo: tableData?.length + 1,
      work: work,
      Desc: description || "", 
    }] : [];
  
    const updatedData = [...tableData, ...newEntry];

    if (updatedData.length < 1) {
      showToastError("Please add at least one work & description detail before submitting.");
      return;
    }

    const formattedDate = moment(date).format("DD/MMM/YYYY");

    const requestBody = {
      Vchcode: modCode||0,
      Vchno: enquiryNo,
      Date: formattedDate,
      Party: selectParty?.value||0,
      Rectype: 1,
      Source:selectedMaster?.source?.value || 0,
      Purpose:selectedMaster?.purpose?.value || 0,
      Approval: 0,
      EnquiryDetails: updatedData,
    };

    console.log("enquiry json", JSON.stringify(requestBody));

    let saveurl = `/api/SaveEnquiry`;

    try {
      setLoading(true);

      const { res, got } = await callFetch(saveurl, "POST", requestBody);

      if (res.status === 200 & got.status == 1) {
        showToastMessage(got.msg);
        console.log("enquiry-save",got.msg)
        setTableData([]);
        setSelectParty(null);
        modCode = null
        navigate('/enquiry-list')
        GetVchNo()
        // navigate(route.enquirylistpage)
      } else {
        showToastError(got.msg);
        console.log("enquiry-save",got.msg)
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <ReactToast />
      <AddEquiryPage
        work={work}
        setWork={setWork}
        description={description}
        setDescription={setDescription}
        handleAdd={handleAdd}
        tableData={tableData}
        columns={columns}
        enquiryNo={enquiryNo}
        setDate={setDate}
        date={date}
        partyList={partyList}
        LoadParty={LoadParty}
        loading={loading}
        selectPartyHandler={selectPartyHandler}
        selectParty={selectParty}
        handleSaveEnquiry={handleSaveEnquiry}
        idHandler={idHandler}
        handleSelectChange={handleSelectChange}
        selectedMaster={selectedMaster}
        masterArray={masterArray}
      />
       <AddInventory
        id={id}
        formData={formData}
        handelInputChange={handelInputChange}
        handleSaveMaster={(e)=>handleSaveMaster(e,
          id == 5 ? "12":"13"
        )}
      />
    </>
  );
};

export default AddEnquiry;
