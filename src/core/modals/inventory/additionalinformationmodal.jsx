/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Table, Input } from "antd";
import { showConfirmationAlert } from "../../../ReusableComponents/ConfirmAlert";
import { Trash2 } from "feather-icons-react/build/IconComponents";

const AdditionalInfoModal = ({ show, handleClose, dataSource, setDataSource }) => {
  // Initial state with four non-deletable rows


  // Function to handle adding a new row
  const handleAddRow = () => {
    const newRow = { SrNo: dataSource.length + 1, head: "", description: "" };
    setDataSource([...dataSource, newRow]);
  };

  // Function to handle deleting a row
  const handleDeleteRow = (key) => {
    setDataSource(dataSource.filter((row) => row.SrNo !== key));
  };

  // Function to handle input change
  const handleInputChange = (e, key, column) => {
    const newData = dataSource.map((row) => {
      if (row.SrNo === key) {
        return { ...row, [column]: e.target.value };
      }
      return row;
    });
    setDataSource(newData);
  };

  // Define the columns with Ant Design's Table component
  const columns = [
    {
      title: "Head",
      dataIndex: "head",
      render: (text, record) => (
        <Input
          value={record.head}
          onChange={(e) => handleInputChange(e, record.SrNo, "head")}
          placeholder="Enter head"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => (
        <Input
          value={record.description}
          onChange={(e) => handleInputChange(e, record.SrNo, "description")}
          placeholder="Enter description"
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        record.SrNo > 4 ? (
            <a
            className="confirm-text p-2"
            
            onClick={() => showConfirmationAlert(handleDeleteRow,record.SrNo)}
          >
            <Trash2 className="feather-trash-2" />
          </a>
        ) : (
            <a
              className="confirm-text p-2 disabled-link"
              style={{ cursor: "not-allowed", opacity: 0.5 }}
              onClick={(e) => e.preventDefault()}
            >
              <Trash2 className="feather-trash-2" />
            </a>
          ),
    },
  ];

  return (
    <Modal centered show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Additional Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="key"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddRow}>
          Add Row
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdditionalInfoModal;
