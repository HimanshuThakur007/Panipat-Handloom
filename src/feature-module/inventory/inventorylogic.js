import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showConfirmationStatusAlert } from "../../ReusableComponents/ConfirmAlert";
import { TbRadioactiveFilled, TbRadioactiveOff } from "react-icons/tb";
export const Inventorylogic = () => {
  const callFetch = useFetch();
  let param = useParams();
  let id = param.userId;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productType: "",
    taxType: "",
    store: "",
    wareHouse: "",
    alias:"",
    taxPer:"",
    source:'',
    purpose:""
  });
  const [Code, setCode] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleShow  = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelModify = (e, val) => {
    e.preventDefault();
    handleShow()
    console.log("Val in handelModify:", val);
    setCode(val);
    let getObj = tableData.find((item) => item.code === val);
    console.log("getObj:", getObj);

    if (!getObj) {
      console.error("No matching object found in tableData");
      return;
    }

    const updatedFormData = {
      productType: id === "1" ? getObj.name : formData.productType,
      taxType: id === "2" ? getObj.name : formData.taxType,
      store: id === "3" ? getObj.name : formData.store,
      wareHouse: id === "4" ? getObj.name : formData.wareHouse,
      source: id === "5" ? getObj.name : formData.source, 
      purpose: id === "6" ? getObj.name : formData.purpose, 
      alias: getObj.alias ||'',
      taxPer: getObj.textPer||0
    };

    setFormData(updatedFormData);
    console.log("Updated formData:", updatedFormData);
  };

  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  const handleSaveMaster = async (e, val) => {
    console.log("val from Master",val)
    e.preventDefault();
    if (formData?.alias?.length > 5) {
      showToastError("Alias cannot be more than 5 characters!");
      return;
    }
    const requestBody = {
      ID: Code || 0,
      MasterType: parseInt(val),
      Alias: formData.alias||'',
      TextPer: id === "2" ? parseFloat(formData.taxPer):0,
      Name:
        id === "1"
          ? formData.productType
          : id === "2"
          ? formData.taxType
          : id === "3"
          ? formData.store
          : id === "4"
          ? formData.wareHouse
          : id === "5" 
          ? formData.source
          : id === "6"
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
        setCode(0);
        setFormData({
          productType: "",
          taxType: "",
          store: "",
          wareHouse: "",
          source:"",
          purpose:"",
          taxPer:0,
          alias:''
        });
        
        loadAllMaster();
        handleClose()
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
  const loadAllMaster = async () => {
    const fetchApi = [
      { apiUrl: `/api/GetMaster?MasterType=5&ParentID=0` }, //product-type-5
      //   { apiUrl: `/api/GetMaster?MasterType=6&ParentID=${Category||0}` },
      { apiUrl: `/api/GetMaster?MasterType=9&ParentID=0` }, //tax-type-9
      { apiUrl: `/api/GetMaster?MasterType=10&ParentID=0` }, //store-10
      { apiUrl: `/api/GetMaster?MasterType=11&ParentID=0` }, //warehouse-11
      { apiUrl: `/api/GetMaster?MasterType=12&ParentID=0` }, //source-12
      { apiUrl: `/api/GetMaster?MasterType=13&ParentID=0` }, //purpose-13
    ];

    try {
      setLoading(true);
      const promises = fetchApi.map(async (item) => {
        const { res, got } = await callFetch(item.apiUrl, "GET");
        if (res.status === 200) {
          return got.data;
        } else {
          setLoading(false);
          throw new Error(`Failed to fetch data from ${item.apiUrl}`);
        }
      });

      const masterDataArray = await Promise.all(promises);
      switch (id) {
        case "1":
          setTableData(masterDataArray[0]);
          break;
        case "2":
          setTableData(masterDataArray[1]);
          break;
        case "3":
          setTableData(masterDataArray[2]);
          break;
        case "4":
          setTableData(masterDataArray[3]);
          break;
        case "5":
          setTableData(masterDataArray[4]);
          break;
        case "6":
          setTableData(masterDataArray[5]);
          break;
      }

      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

    // =============================================delete-Handler=======================================================
    const inventoryDelete = async (ID) => {
      let url = `/api/DelMaster?Code=${ID}`;
        try {
          setLoading(true)
            const { res, got } = await callFetch(url, 'GET');
            // Handle response data
            if(res.status == 200){
              let alldata = got.data
              // alert(got.msg)
              setToastMessage(got.msg)
              loadAllMaster()
              return got.msg
            }
            setLoading(false)
            console.log('GET Response:', got);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            setLoading(false)
        }
    };
 
  React.useEffect(() => {
    loadAllMaster();
  }, [id]);

  const columns = [
    {
      title: `${
        id == 1
          ? "Product Type"
          : id == 2
          ? "Tax Type"
          : id == 3
          ? "Store"
          : id == 4
          ? "WareHouse"
          : id == 5 
          ? "Source"
          :id == 6
          ? "Purpose"
          :''
      }`,
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    // {
    //     title: "Category Slug",
    //     dataIndex: "categoryslug",
    //     sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
    // },
    {
      title: "Created On",
      dataIndex: "dtDate",
      sorter: (a, b) => new Date(a.dtDate) - new Date(b.dtDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        //  text === 'Activate'?(
        <span className={`${text === 'Activate'?"badge badge-linesuccess":text==="Deactivate"?"badge badge-linedanger":''}`}>
          {/* <Link to="#"> Active</Link> */}
          {text==="Activate"?"Active":text === "Deactivate" ?"Inactive":''}
        </span>
        // :()
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      // dataIndex: 'actions',
      key: "actions",
      render: (record) => (
        <td className="action-table-data">
           
          <div className="edit-delete-action">
            {/* <Link
              className="me-2 p-2"
              to="#"
              onClick={(e) => handelModify(e, record.code)}
            >
            </Link> */}
           { record.status === "Activate" ? (
            <Link
              className="me-2 p-2"
              to="#"
              onClick={(e) => handelModify(e, record.code)}
            >
               <i data-feather="edit" className="feather-edit"></i>
            </Link>
          ) : (
            <a className="me-2 p-2 text-muted" style={{ cursor: "not-allowed",background:'grey',color:'white' }}>
              {/* <Edit className="feather-edit" /> */}
              <i data-feather="edit" className="feather-edit" style={{color:'white'}}></i>
            </a>
          )
        }
            <Link className="confirm-text p-2" to="#" onClick={() => showConfirmationAlert(record.code)}>
            {record.status === "Activate"?(<TbRadioactiveOff />):(<TbRadioactiveFilled />)}
              {/* <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() => showConfirmationAlert(record.code)}
              ></i> */}
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = (code) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to change the Status!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, Change it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const message = await inventoryDelete(code);
        if (message) {
          MySwal.fire({
            title: "Status Changed!",
            text: message,
            className: "btn btn-success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      } else {
        MySwal.close();
      }
    });
  };

  const resetHandler = () => {
    setCode(0);
    setFormData({
      productType: "",
      taxType: "",
      store: "",
      wareHouse: "",
      source:"",
      purpose:"",
      alias:'',
      taxPer:0
    });
  };
  return {
    columns,
    handelInputChange,
    tableData,
    handleSaveMaster,
    id,
    formData,
    loading,
    resetHandler,
    handleShow,
    handleClose,
    showModal
  };
};
