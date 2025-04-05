/* eslint-disable react/prop-types */
import { Table } from 'antd'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const PartyDetailModal = ({showModal, handleCloseModal, columns, tableData}) => {
  return (
    <>
       <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Party Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Ant Design Table inside modal */}
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default PartyDetailModal