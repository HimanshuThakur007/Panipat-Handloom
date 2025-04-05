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
import { Inventorylogic } from "./inventorylogic";
import EditInventory from "../../core/modals/inventory/invintoryedit";
import AddInventory from "../../core/modals/inventory/inventoryadd";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import DataTable from "../../common/DataTable";

const InventoryList = () => {
  const callFetch = useFetch();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

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

  const {
    columns,
    handelInputChange,
    tableData,
    handleSaveMaster,
    id,
    formData,
    loading,
    resetHandler,
    showModal,
    handleClose
  } = Inventorylogic();

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
                <h4>
                  {id == 1
                    ? "Product Type"
                    : id == 2
                    ? "Tax Type"
                    : id == 3
                    ? "Store"
                    : id == 4
                    ? "WareHouse"
                    : id == 5
                    ? "Source"
                    : id == 6
                    ? "Purpose"
                    : ""}
                </h4>
                <h6>
                  Manage your{" "}
                  {id == 1
                    ? "Product Type"
                    : id == 2
                    ? "Tax Type"
                    : id == 3
                    ? "Store"
                    : id == 4
                    ? "WareHouse"
                    : id == 5
                    ? "Source"
                    : id == 6
                    ? "Purpose"
                    : ""}
                </h6>
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
                    data-bs-target="#add-inventory"
                    onClick={() => resetHandler()}
                  >
                    <PlusCircle className="me-2" />
                    Add New{" "}
                    {id == 1
                      ? "Product Type"
                      : id == 2
                      ? "Tax Type"
                      : id == 3
                      ? "Store"
                      : id == 4
                      ? "WareHouse"
                      : id == 5
                      ? "Source"
                      : id == 6
                      ? "Purpose"
                      : ""}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={tableData}
                  rowSelectionEnabled={false}
                  rowKey={(record) => record.code}
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <EditInventory
        showModal={showModal}
        handleClose={handleClose}
        id={id}
        formData={formData}
        handelInputChange={handelInputChange}
        handleSaveMaster={handleSaveMaster}
      />
      <AddInventory
        id={id}
        formData={formData}
        handelInputChange={handelInputChange}
        handleSaveMaster={handleSaveMaster}
      />
      {/* <AddCategoryList handelCategoryInput={handelCategoryInput} handleSaveMaster={handleSaveMaster} formData={formData}/>
            <EditCategoryList handelCategoryInput={handelCategoryInput} handleSaveMaster={handleSaveMaster} formData={formData}/> */}
    </div>
  );
};

export default InventoryList;
