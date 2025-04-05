/* eslint-disable react/prop-types */
import React from "react";
import InputField from "../../../ReusableComponents/InputField";
import DataTable from "../../../common/DataTable";
import { Table } from "antd";

const WorkInputTable = ({
  work,
  setWork,
  columns,
  tableData,
  editingIndex,
  handlePushToTable,
  handleUpdate,
  workInputError
}) => {
  return (
    <>
      <div className="col-lg-12 col-sm-12 col-12 mb-3">
        <InputField
        className={
          workInputError
            ? "form-control is-invalid shakersss"
            : "form-control is-valid"
        }
          name="work"
          label="Work"
          value={work}
          onChange={(e) => setWork(e.target.value)}
          type="text"
        />
      </div>

      {/* AntD Table for adding work */}
      <div className="col-12 mb-3">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey={(record) => record.srNo}
        />
      </div>

      <div className="col-12 d-flex justify-content-end mb-3">
        {editingIndex === null ? (
          <button className="btn btn-primary" onClick={handlePushToTable}>
            Add Work
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Work
          </button>
        )}
      </div>
    </>
  );
};

export default WorkInputTable;
