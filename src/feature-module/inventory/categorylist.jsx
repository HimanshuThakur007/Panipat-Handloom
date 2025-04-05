import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  Filter,
  PlusCircle,
  RotateCcw,
  Sliders,
  StopCircle,
  Zap,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import Select from "react-select";
import { DatePicker } from "antd";
import AddCategoryList from "../../core/modals/inventory/addcategorylist";
import EditCategoryList from "../../core/modals/inventory/editcategorylist";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import DataTable from "../../common/DataTable";
import { TbRadioactiveFilled, TbRadioactiveOff } from "react-icons/tb";

const CategoryList = () => {
  const callFetch = useFetch();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [categoryTable, setCatrgoryTable] = useState([]);
  const [values, setValues] = useState({
    subcat: 0,
  });
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    alias:'',

  });
  const [catCode, setCatCode] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  const handleImageConverted = (base64Data) => {
    // const cleanedBase64Data = base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    // console.log('cleanedBase64',cleanedBase64Data)
    setImagePath(base64Data);
    // setImagePath(base64Data)
  };

  const handelCategoryInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelModify = (e, val) => {
    handleShow()
    setCatCode(val);
    const getObj = categoryTable.find((item) => item.code === val);
    setFormData({ category: getObj.name, alias: getObj.alias });
    setValues({ subcat: getObj.subChild });
    const prefixedBase64Data = `data:image/jpeg;base64,${getObj.base64}`;
    setImagePath(prefixedBase64Data);
    console.log(getObj, "getObj");
  };

  // console.log('ffftttsss',formData.alias.length)

  const handleSaveMaster = async (e, val) => { 
    const cleanedBase64Data = imagePath.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    e.preventDefault();
    if (formData?.alias?.length > 5) {
      showToastError("Alias cannot be more than 5 characters!");
      return;
    }
    const requestBody = {
      ID: catCode || 0,
      MasterType: parseInt(val),
      SubChild: values.subcat || 0,
      base64: cleanedBase64Data || "",
      Name: formData.category,
      Alias: formData.alias,
      TextPer:0,
      ParentID: 0,
    };
    console.log("userJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveMaster`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        setCatCode(0);
        setFormData({ category: "" });
        setImagePath('')
        GetCategoryData();
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
  // =============================================delete-Handler=======================================================
  const categoryDelete = async (ID) => {
    let url = `/api/DelMaster?Code=${ID}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        GetCategoryData();
        return got.msg;
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const GetCategoryData = async () => {
    let url = `/api/GetMaster?MasterType=4&ParentID=0`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        console.log(alldata, "allll");
        // let filteredData = filterData(alldata, searchText, ['orderNo','name','dtDate','statusName'])
        setCatrgoryTable(alldata);
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
  console.log("catCode", catCode);
  React.useEffect(() => {
    GetCategoryData();
  }, []);

  const columns = [
    {
      title: "Sagment",
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
        const message = await categoryDelete(code);
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
    setCatCode(0);
    setFormData({ category: "",alias:'' });
    setImagePath('')
  };
  return (
    <div>
      <ReactToast />
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Sagment</h4>
                <h6>Manage your Sagment</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>

            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-category"
                onClick={() => resetHandler()}
              >
                <PlusCircle className="me-2" />
                Add New Sagment
              </Link>
            </div>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
              
                <DataTable columns={columns} data={categoryTable} rowSelectionEnabled={false} rowKey={(record)=>record.code}/>
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddCategoryList
        handelCategoryInput={handelCategoryInput}
        handleSaveMaster={handleSaveMaster}
        formData={formData}
        handleValueChange={handleValueChange}
        handleImageConverted={handleImageConverted}
        values={values}
        imagePath={imagePath}
      />
      <EditCategoryList
        handelCategoryInput={handelCategoryInput}
        handleSaveMaster={handleSaveMaster}
        formData={formData}
        handleValueChange={handleValueChange}
        handleImageConverted={handleImageConverted}
        values={values}
        imagePath={imagePath}
        showModal={showModal} 
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default CategoryList;
