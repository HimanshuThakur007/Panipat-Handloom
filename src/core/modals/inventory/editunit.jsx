/* eslint-disable react/prop-types */
// import React from 'react'
// import { Link } from 'react-router-dom'

// const EditUnit = ({formData, handelInputChange, handleSaveMaster}) => {
//     return (
//         <div>
//             {/* Edit Unit */}
//             <div className="modal fade" id="edit-units">
//                 <div className="modal-dialog modal-dialog-centered custom-modal-two">
//                     <div className="modal-content">
//                         <div className="page-wrapper-new p-0">
//                             <div className="content">
//                                 <div className="modal-header border-0 custom-modal-header">
//                                     <div className="page-title">
//                                         <h4>Edit Unit</h4>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         className="close"
//                                         data-bs-dismiss="modal"
//                                         aria-label="Close"
//                                     >
//                                         <span aria-hidden="true">×</span>
//                                     </button>
//                                 </div>
//                                 <div className="modal-body custom-modal-body">
//                                     <form onSubmit={(e) => handleSaveMaster(e, "8")}>
//                                         <div className="mb-3">
//                                             <label className="form-label">Name</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 name='unit'
//                                                 value={formData.unit}
//                                                 onChange={handelInputChange}
//                                                 required
//                                             />
//                                         </div>
//                                         {/* <div className="mb-3">
//                                             <label className="form-label">Short Name</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 defaultValue="PC"
//                                             />
//                                         </div> */}
//                                         {/* <div className="mb-0">
//                                             <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
//                                                 <span className="status-label">Status</span>
//                                                 <input
//                                                     type="checkbox"
//                                                     id="user3"
//                                                     className="check"
//                                                     defaultChecked="true"
//                                                 />
//                                                 <label htmlFor="user3" className="checktoggle" />
//                                             </div>
//                                         </div> */}
//                                         <div className="modal-footer-btn">
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-cancel me-2"
//                                                 data-bs-dismiss="modal"
//                                             >
//                                                 Cancel
//                                             </button>
//                                             <button type='submit' className="btn btn-submit">
//                                                 Save Changes
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default EditUnit

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditUnit = ({ formData, handelInputChange, handleSaveMaster, show, handleClose }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal-two"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleSaveMaster(e, "8")}>
                    <Form.Group className="mb-3" controlId="formUnitName">
                        <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name='unit'
                            value={formData.unit}
                            onChange={handelInputChange}
                            required
                        />
                    </Form.Group>
                    <div className="modal-footer-btn">
                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUnit;
