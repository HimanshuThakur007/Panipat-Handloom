/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import InputSelect from '../../../ReusableComponents/InputSelect'

const ProductGroup = ({isModalVisible, handleCloseModal,productGroupData,selectedProducts,handleProductGroupChange,handleModalOk}) => {
  return (
    <Modal show={isModalVisible} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Select Product Group</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InputSelect
        name="productgrp"
        label="Product Group"
        options={productGroupData}
        value={selectedProducts}
        onChange={handleProductGroupChange}
        isMulti
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleModalOk}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ProductGroup