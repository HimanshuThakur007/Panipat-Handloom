/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { itemRender, onShowSizeChange } from "../core/pagination/pagination";
// import "antd/dist/reset.css";

const DataTable = ({ columns, data, rowSelectionEnabled, rowKey }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // search function triggered by onChange
  const handleSearch = (e, confirm, dataIndex) => {
    const value = e.target.value;
    confirm({ closeDropdown: false });
    setSearchText(value);
    setSearchedColumn(dataIndex);
  };

  // Clear search text and close dropdown
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm({ closeDropdown: true });
  };

  // search functionality for each column
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleSearch(e, confirm, dataIndex);
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="text"
            onClick={() => confirm({ closeDropdown: true })}
            icon={<CloseOutlined />}
            size="small"
          />
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
        onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? <span>{text}</span> : text,
  });

  const enhancedColumns = columns.map((col) => {
    
    if (col.title === "Actions"|| col.title === "Action") {
      return col;
    }
    return {
      ...col,
      ...getColumnSearchProps(col.dataIndex),
      render: col.render ? col.render : (text) => text,
    };
  });

  // Row selection logic
  const rowSelection = rowSelectionEnabled
    ? {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            "Selected Row Keys: ",
            selectedRowKeys,
            "Selected Rows: ",
            selectedRows
          );
        },
      }
    : null;

  return (
    <Table
      className="table datanew dataTable no-footer"
      columns={enhancedColumns}
      dataSource={data}
      rowSelection={rowSelection}
      rowKey={rowKey}
      pagination= { {total : data?.length,
        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
        scroll={{ x: false }}
        components={{
          header: {
            cell: (props) => (
              <th 
              {...props} 
              style={{ 
                ...props.style, 
                backgroundColor: "#f5f5f5",
                // color:"white"
                // borderRight: "1px solid #ddd" 
              }}
               />
            ),
          },
        }}
    />
  );
};

export default DataTable;
