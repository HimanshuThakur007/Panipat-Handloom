/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditBrand = ({ handelInputChange, formData, handleSaveMaster, showModal, handleClose, handleShow }) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Brand</Modal.Title>
            </Modal.Header>
                {/* <form onSubmit={(e) => handleSaveMaster(e, '7')}> */}
                <form onSubmit={(e) => {
                    handleSaveMaster(e, "7");
                    if (formData?.alias && formData.alias.length < 5) {
                        handleClose();
                    } else {
                        handleShow();
                    }
                }}>
            <Modal.Body className="custom-modal-body new-employee-field">
                    <div className="mb-3">
                        <label className="form-label">Brand <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name='brand'
                            value={formData.brand}
                            onChange={handelInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Alias <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name='alias'
                            value={formData.alias}
                            onChange={handelInputChange}
                            required
                        />
                    </div>
                  
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type='submit' variant="primary">
                            Save
                        </Button>
            </Modal.Footer>
                </form>
        </Modal>
    );
}

export default EditBrand;
