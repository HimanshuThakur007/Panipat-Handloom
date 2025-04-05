/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Table, Input, Typography } from "antd";

const { Text } = Typography;


const WorkTable = ({data, handleInputChange}) => {

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "globalIndex",
      key: "globalIndex",
      render: (text, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Subwork",
      dataIndex: "subWork",
      key: "subWork",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
      render: (text, record, index) => (
        <Input
          value={record.length}
          onChange={(e) =>
            handleInputChange(record.workIndex, index, "length", e.target.value)
          }
        />
      ),
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      render: (text, record, index) => (
        <Input
          value={record.width}
          onChange={(e) =>
            handleInputChange(record.workIndex, index, "width", e.target.value)
          }
        />
      ),
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      render: (text, record, index) => (
        <Input
          value={record.height}
          onChange={(e) =>
            handleInputChange(record.workIndex, index, "height", e.target.value)
          }
        />
      ),
    },
  ];

  return (
    <div className="col-12">
      {data?.map((workData, workIndex) => (
        <div key={workData?.work} className="mt-4">
          <div
            style={{
              backgroundColor: "black",
              padding: "10px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 className="m-0" style={{ color: "white" }}>
              {workIndex + 1}. {workData?.work}
            </h4>
          </div>
          <Table
            columns={columns}
            dataSource={workData?.subwork.map((item, index) => ({
              ...item,
              workIndex,
              key: `${workIndex}-${index}`,
            }))}
            pagination={false}
            rowKey="globalIndex"
            className="mt-3"
          />
        </div>
      ))}
    </div>
  );
};

export default WorkTable;
