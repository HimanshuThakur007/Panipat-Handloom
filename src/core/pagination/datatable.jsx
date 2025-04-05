/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table } from "antd";
import { onShowSizeChange } from "./pagination";

const Datatable = ({
  props,
  columns,
  dataSource,
  rowKey,
  pagination,
  scroll,
  onSelectionChange,
  resetSelection
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  React.useEffect(() => {
    if (resetSelection) {
      setSelectedRowKeys([]);
    }
  }, [resetSelection]);
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    console.log('selected rows: ', selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      key={props}
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      scroll={scroll}
      rowKey={rowKey}
    />
  );
};

export default Datatable;
