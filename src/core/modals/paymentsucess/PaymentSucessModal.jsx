/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Table } from "antd";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PaymentModal = ({ handleClose, showModal, Mydata }) => {

  return (
    <Modal show={showModal} onHide={handleClose} size="xl" centered fullscreen>
      {/* <Modal.Header closeButton>
        <Modal.Title>Show Data</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        {/* <div className="table-responsive"> */}
        <div className="" dangerouslySetInnerHTML={{ __html: Mydata }} />
        {/* </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
