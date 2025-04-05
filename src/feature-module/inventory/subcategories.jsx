import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
import AddSubcategory from "../../core/modals/inventory/addsubcategory";
import EditSubcategories from "./editsubcategories";
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

const SubCategories = () => {
  let callFetch = useFetch();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [catrgoryTable, setCatrgoryTable] = useState([]);
  const [subCatrgoryTable, setSubCatrgoryTable] = useState([]);
  const [Code, setCode] = useState(0);
  const [selectCategory, setSelectCategory] = useState(null);
  const [loading, setLoading] = useState(null);
  const [imagePath,setImagePath] = useState('')
  const [formData, setFormData] = useState({
    subCategory: "",
    alias:'',
    taxPer:0
  });
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCategoryChange = (selectedOption) => {
    setSelectCategory(selectedOption);
  };

  const handleImageConverted = (base64Data) => {
    setImagePath(base64Data)
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const GetCategoryData = async () => {
    let url = `/api/GetMaster?MasterType=4&ParentID=0`;
    try {
        setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        let alldata = got.data;
        console.log("Category Data:", alldata);
        setLoading(false)
        return alldata;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
    return [];
  };

  const GetSubCategoryData = async () => {
    let url = `/api/GetMaster?MasterType=6&ParentID=0`;
    try {
        setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        let alldata = got.data;
        console.log("SubCategory Data:", alldata);
        setLoading(false)
        return alldata;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
       setLoading(false);
    }
    return [];
  };

  const mergeCategoryWithSubCategory = (categories, subcategories) => {
    return subcategories.map((subCategory) => {
      const parentCategory = categories.find(
        (category) => category.code === subCategory.parentID
      );
      //   console.log(parentCategory, "parentCategory");
      return {
        ...subCategory,
        parentcategory: parentCategory ? parentCategory.name : "N/A",
      };
    });
  };

  const fetchData = async () => {
    const categories = await GetCategoryData();
    const subcategories = await GetSubCategoryData();

    setCatrgoryTable(categories);
    const updatedSubCategoryData = mergeCategoryWithSubCategory(
      categories,
      subcategories
    );
    setSubCatrgoryTable(updatedSubCategoryData);
  };

  // ====================================Save-Data================================
  const handleSaveMaster = async (e, val) => {
    e.preventDefault();
    const cleanedBase64Data = imagePath.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    if (formData?.alias?.length > 5) {
      showToastError("Alias cannot be more than 5 characters!");
      return;
    }
    const requestBody = {
      ID: Code || 0,
      MasterType: parseInt(val),
      Name: formData.subCategory || "",
      ParentID: parseInt(selectCategory?.value) || 0,
      Base64 :cleanedBase64Data||'',
      SubChild:0,
      Alias:formData.alias,
      TextPer:0
    };
    console.log("userJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveMaster`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        fetchData();
        setCode(0);
        setFormData({ subCategory: "", alias:'',taxPer:0 });
        setSelectCategory(null);
        setImagePath('')
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

  const handelModify = (e,val) => {
    e.preventDefault()
    console.log(val)
    handleShow()
    setCode(val);
    const getObj = subCatrgoryTable?.find((item) => item.code == val);
    setFormData({ subCategory: getObj.name, alias: getObj.alias });
    // setSelectCategory({ value: getObj?.parentID, label: getObj?.parentcategory });
    const prefixedBase64Data = `data:image/jpeg;base64,${getObj?.base64}`;
    setImagePath(prefixedBase64Data)
    // console.log(getObj, 'getObj')
  };

  // =============================================delete-Handler=======================================================
  const subCategoryDelete = async (ID) => {
    let url = `/api/DelMaster?Code=${ID}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data;
        // alert(got.msg)
        // setToastMessage(got.msg)
        fetchData();
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
    fetchData();
  }, []);

  //   console.log("subCatrgoryTable", subCatrgoryTable);

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
  const columns = [
    // {
    //     title: "Image",
    //     dataIndex: "logo",
    //     render: (text, record) => (
    //         <span className="productimgname">
    //             <Link to="#" className="product-img stock-img">
    //                 <ImageWithBasePath alt="" src={record.img} />
    //             </Link>

    //         </span>
    //     ),
    //     sorter: (a, b) => a.category.length - b.category.length,

    // },
    {
      title: "Sagment",
      dataIndex: "parentcategory",
      sorter: (a, b) => a.parentcategory.length - b.parentcategory.length,
    },
    {
      title: "Catalogue",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    // {
    //     title: "categorycode",
    //     dataIndex: "categorycode",
    //     sorter: (a, b) => a.categorycode.length - b.categorycode.length,
    // },
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     sorter: (a, b) => a.description.length - b.description.length,
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
              // data-bs-toggle="modal"
              // data-bs-target="#edit-category"
              onClick={() => handelModify(record.code)}
            >
              <i data-feather="edit" className="feather-edit"></i>
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
        const message = await subCategoryDelete(code);
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
    setFormData({ subCategory: "",alias:'',taxPer:0 });
    setSelectCategory(null);
  }
  return (
    <div>
      <ReactToast />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Catalogue list</h4>
                <h6>Manage your Catalogue</h6>
              </div>
            </div>
            {loading ? (
            <ReactLoader loaderClass="position-absolute" loading={loading} />
          ) : null}
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
                onClick={resetHandler}
              >
                <PlusCircle className="me-2" />
                Add Catalogue
              </Link>
            </div>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                  <DataTable columns={columns} data={subCatrgoryTable} rowSelectionEnabled={false} rowKey={(record)=>record.code}/>
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>

      <AddSubcategory
        catrgoryTable={catrgoryTable}
        selectCategory={selectCategory}
        handleCategoryChange={handleCategoryChange}
        formData={formData}
        handleSaveMaster={handleSaveMaster}
        handelInputChange={handelInputChange}
        imagePath={imagePath}
        handleImageConverted={handleImageConverted}
      />
      <EditSubcategories
        catrgoryTable={catrgoryTable}
        selectCategory={selectCategory}
        handleCategoryChange={handleCategoryChange}
        formData={formData}
        handleSaveMaster={handleSaveMaster}
        handelInputChange={handelInputChange}
        imagePath={imagePath}
        handleImageConverted={handleImageConverted}
        showModal={showModal} 
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default SubCategories;
