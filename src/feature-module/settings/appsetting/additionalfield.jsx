/* eslint-disable react/prop-types */
import {
  ChevronUp,
  PlusCircle,
  RotateCcw,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SettingsSideBar from "../settingssidebar";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import Additionalfields from "../../../core/modals/settings/additionalfields";
import useFetch from "../../../Hooks/useFetch";
import ReactToast, { showToastError, showToastMessage } from "../../../ReusableComponents/ReactToast";
import Select from 'react-select'
import InputSelect from "../../../ReusableComponents/InputSelect";

const AdditionalFields = () => {
  const callFetch = useFetch();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const typefields = [
    { value: 1, label: "Text" },
    { value: 2, label: "Select" },
    { value: 3, label: "Numeric" },
    { value: 4, label: "Date" },
    { value: 5, label: "Yes/No" },
  ];
  const [label, setLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    type:null,
    category:null
  });
  const [formFields, setFormFields] = useState([]);
  const [catrgoryData, setCatrgoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCode, setEditCode] = useState(0);
  const [disableCode, setDisableCode] = useState(0);

  React.useEffect(()=>{
    GetCategoryData()
  },[])

  //   ----input-labelHandler-------------------
  const handleLabelChange = (event) => {
    const inputLabel = event.target.value;
    const capitalizedLabel =
      inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1);
    setLabel(capitalizedLabel);
  };

  const handelSelectedValue = (selectedOption, selectName) =>{
    console.log(selectedOption,selectName,'<==selected')
    setSelectedValue((previous)=>({
      ...previous,
      [selectName]: selectedOption
    }))
  }

  const GetCategoryData = async () => {
    let url = `/api/GetMasterforOther?MasterType=4&ParentID=0`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got?.data?.map((item)=>({
          value: item.code,
          label:item.name
        }))
        console.log(alldata, "allll");
        setCatrgoryData(alldata);
      }
      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const addField = (e) => {
    e.preventDefault();
    if (!label || !selectedValue?.type.value) return;

    let newField = {
      type: selectedValue?.type.value || 0,
      label,
      id: editCode || 0, 
    };

    if (editCode) {
      const updatedFields = formFields.map((field) =>
        field.id === editCode ? newField : field
      );
      setFormFields(updatedFields);
    } else {
      setFormFields([...formFields, newField]);
    }

    setLabel("");
    setSelectedValue((prev)=>({
      ...prev,
      type:null,
    }));
    setEditCode(0);
  };

  const removeField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

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

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = (val) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeField(val);
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };

  const additionalFieldSave = async (e) => {
    e.preventDefault();
    var formdata = [];

    formFields.map((items) => {
      if (items.type !== 3) {
        formdata.push({
          ID: items.id || 0,
          Name: items.label,
          Type: items.type,
          DecimalP: 0,
        });
      } else {
        formdata.push({
          ID: items.id || 0,
          Name: items.label,
          Type: items.type,
          DecimalP: 2,
        });
      }
    });
    console.log("formField", formdata);
    const requestBody = {
      // MasterType: 6,
      // ParentID: 0,
      Category:selectedValue?.category?.value||0,
      ProductIn: [...formdata],
    };
    console.log("AdditionalFieldJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveProductInfo`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (got.status == 1) {
        showToastMessage(got.msg);
        loadAdditionalFields();
      } else {
        showToastError(got.msg);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loadAdditionalFields = async () => {
    // let url = `/api/GetOptionalFields?MasterType=6&ParentID=0`;
    let url = `/api/GetProductAddMasterConfig?Category=${selectedValue?.category?.value || 0}`;
    console.log("Additional url", url);
    var corrData = [];
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");

      if (res.status == 200) {
        let loadData = got.data;
        console.log("Additional data", loadData);
        loadData.map((item) => {
          corrData.push({
            srNo: item.srNo,
            id: item.id,
            label: item.name,
            type: item.type,
            decimalP: item.decimalP,
          });
        });
        setFormFields(corrData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const editHandler = (id, code) => {
    setDisableCode(code)
    const fieldToEdit = formFields.find((field) => field.id === id);
    if (fieldToEdit) {
      setEditCode(fieldToEdit.id);
      setLabel(fieldToEdit.label);
      // setSelectedType(typefields.find((type) => type.value === fieldToEdit.type));
      setSelectedValue({
        type:typefields.find((type) => type.value === fieldToEdit.type)
      })
    }
  };

  const resetHandler = () => {
    setEditCode(0);
    setLabel("");
    setSelectedValue((prev)=>({
      ...prev,
      type:null,
    }));
  };

  React.useEffect(() => {
    if(selectedValue.category !== null){

      loadAdditionalFields();
    }
  }, [selectedValue.category]);

  return (
    <div>
      <ReactToast />
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
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
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap w-50">
                  <div className="setting-title">
                    <h4>Additional Fields</h4>
                  </div>
                  <div className="col-lg-12">
                          <InputSelect 
                          label="Sagment"
                          dangerTag="*"
                          options={catrgoryData}
                          value={selectedValue.category}
                          onChange={(selectedOption)=>handelSelectedValue(selectedOption,'category')}
                          required
                          isDisabled={editCode != 1 ? false : true}
                          />
                        </div>
                        {/* <div className="col-lg-12 col-sm-12 col-12">
                    <div className="mb-3 add-product">
                      <div className="add-newplus">
                        <label className="form-label">Sagment <span className="text-danger">*</span></label>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add-units-category"
                        >
                          <PlusCircle className="plus-down-add" />
                          <span>Add New</span>
                        </Link>
                      </div>
                      <Select
                        className="select"
                        options={catrgoryData}
                        placeholder="Choose"
                        value={selectedValue.category}
                        onChange={(selectedOption)=>handelSelectedValue(selectedOption,'category')}
                        isDisabled={editCode != 1 ? false : true}
                      />
                    </div>
                  </div> */}
                        {selectedValue.category !== null && (<>
                  <div className="page-header justify-content-end">
                    <div className="page-btn">
                      <Link
                        to="#"
                        className="btn btn-added"
                        data-bs-toggle="modal"
                        data-bs-target="#add-additional-field"
                        onClick={resetHandler}
                      >
                        <PlusCircle className="me-2" />
                        Add New Field
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                 
                    <div className="col-lg-12">
                      <div className="card table-list-card">
                        <div className="card-body">
                          <Table
                            dataSource={formFields}
                            pagination={false}
                            scroll={{
                              y: 300,
                            }}
                            rowKey={(record) => record.srNo}
                          >
                            <Column
                              title="Name"
                              dataIndex="label"
                              key="label"
                            />
                            <Column
                              title="Type"
                              dataIndex="type"
                              key="type"
                              render={(text, record) => (
                                <span>
                                  {record.type == 1
                                    ? "Text"
                                    : record.type == 2
                                    ? "Master"
                                    : record.type == 3
                                    ? "Numeric"
                                    : record.type == 4
                                    ? "Date"
                                    : record.type == 5
                                    ? "Yes/No"
                                    : ""}
                                </span>
                              )}
                            />
                            <Column
                              title="Action"
                              key="action"
                              render={(text, record) => (
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link
                                      className="me-2 p-2"
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#add-additional-field"
                                      onClick={() => editHandler(record.id, 1)}
                                    >
                                      <i
                                        data-feather="edit"
                                        className="feather-edit"
                                      ></i>
                                    </Link>
                                    <Link
                                      className="confirm-text p-2"
                                      to="#"
                                      onClick={() =>
                                        showConfirmationAlert(record.id)
                                      }
                                    >
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              )}
                            />
                          </Table>
                        </div>
                      </div>
                    </div>
                    <div className="text-end settings-bottom-btn">
                      <button type="button" className="btn btn-cancel me-2">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-submit"
                        onClick={additionalFieldSave}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                  </>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Additionalfields
        editCode={disableCode}
        typefields={typefields}
        handleLabelChange={handleLabelChange}
        label={label}
        handelSelectedValue={handelSelectedValue}
        addField={addField}
        removeField={removeField}
        catrgoryData={catrgoryData}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default AdditionalFields;
