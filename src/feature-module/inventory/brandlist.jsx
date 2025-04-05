/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import AddBrand from "../../core/modals/inventory/addbrand";
import EditBrand from "../../core/modals/inventory/editbrand";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import Select from "react-select";
import Sliders from "feather-icons-react/build/IconComponents/Sliders";
import {
  ChevronUp,
  Filter,
  PlusCircle,
  RotateCcw,
  StopCircle,
  Zap,
} from "feather-icons-react/build/IconComponents";
import { DatePicker } from "antd";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { setToogleHeader } from "../../core/redux/action";
import withReactContent from "sweetalert2-react-content";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import useFetch from "../../Hooks/useFetch";
import DataTable from "../../common/DataTable";
import { TbRadioactiveFilled, TbRadioactiveOff } from "react-icons/tb";
const BrandList = () => {
  let callFetch = useFetch();
  const dataSource = useSelector((state) => state.brand_list);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    alias: "",
  });
  const [Code, setCode] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  // ref={modalRef}

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

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelModify = (e,val) => {
    e.preventDefault()
    handleShow();
    setCode(val);
    const getObj = tableData?.find((item) => item.code === val);
    setFormData({ brand: getObj.name, alias: getObj.alias });
    console.log(getObj, "getObj");
  };

  const handleSaveMaster = async (e, val) => {
    e.preventDefault();
    if (formData?.alias?.length > 5) {
      showToastError("Alias cannot be more than 5 characters!");
      return;
    }
    const requestBody = {
      ID: Code || 0,
      MasterType: parseInt(val),
      Name: formData.brand,
      ParentID: 0,
      Base64: "",
      SubChild: 0,
      Alias: formData.alias,
      TextPer: 0,
    };
    console.log("userJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveMaster`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        setCode(0);
        setFormData({ brand: "", alias: "" });
        GetData();
        handleClose();
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

  const GetData = async () => {
    let url = `/api/GetMaster?MasterType=7&ParentID=0`;
    try {
      //   setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        console.log(alldata, "allll");
        // let filteredData = filterData(alldata, searchText, ['orderNo','name','dtDate','statusName'])
        setTableData(alldata);
        // setProductTableList(alldata)
      }
      //   setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      //   setLoading(false);
    }
  };

  // =============================================delete-Handler=======================================================
  const brandDelete = async (ID) => {
    let url = `/api/DelMaster?Code=${ID}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        // alert(got.msg)
        // setToastMessage(got.msg)
        GetData();
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

  React.useEffect(() => {
    GetData();
  }, []);
  const columns = [
    {
      title: "Brand",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    // {
    //     title: "Logo",
    //     dataIndex: "logo",
    //     render: (text, record) => (
    //         <span className="productimgname">
    //             <Link to="#" className="product-img stock-img">
    //                 <ImageWithBasePath alt="" src={record.logo} />
    //             </Link>
    //         </span>
    //     ),
    //     sorter: (a, b) => a.logo.length - b.logo.length,
    //     width: "5%"
    // },
    {
      title: "Created on",
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
      confirmButtonText: "Yes, change it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const message = await brandDelete(code);
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
    setFormData({ brand: "" });
  };
  return (
    <div>
      <ReactToast />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Brand</h4>
                <h6>Manage your brands</h6>
              </div>
            </div>
            <ul className="table-top-head">
              {/* <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li> */}
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
                    data-bs-target="#add-brand"
                    onClick={() => resetHandler()}
                  >
                    <PlusCircle className="me-2" />
                    Add New Brand
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              {/* <div className="table-top">
                <div className="search-set">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                    />
                    <Link to className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
              </div> */}
              <div className="table-responsive">
                {/* <Table columns={columns} dataSource={tableData} rowKey={(record) => (record.code)}/> */}
                <DataTable
                  columns={columns}
                  data={tableData}
                  rowSelectionEnabled={false}
                  rowKey={(record) => record.code}
                />
              </div>
            </div>
            {/* /product list */}
          </div>
        </div>
      </div>
      <AddBrand
        handelInputChange={handelInputChange}
        formData={formData}
        handleSaveMaster={handleSaveMaster}
      />
      <EditBrand
        handelInputChange={handelInputChange}
        formData={formData}
        handleSaveMaster={handleSaveMaster}
        showModal={showModal}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default BrandList;
