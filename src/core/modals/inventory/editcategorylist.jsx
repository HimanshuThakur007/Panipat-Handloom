/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageToBase64Converter from '../../../ReusableComponents/ImageToBase64Converter';
import InputField from '../../../ReusableComponents/InputField';
import InputToggel from '../../../ReusableComponents/InputToggel';

const EditCategoryList = ({ 
    handelCategoryInput, 
    handleSaveMaster, 
    formData, 
    values, 
    imagePath, 
    handleValueChange, 
    handleImageConverted, 
    showModal, // Pass showModal as a prop
    handleClose, // Pass handleClose function as a prop
    handleShow
}) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sagment</Modal.Title>
            </Modal.Header>
            <form onSubmit={(e) => {
                    handleSaveMaster(e, "4");
                    if (formData?.alias && formData.alias.length < 5) {
                        handleClose();
                    } else {
                        handleShow();
                    }
                }}
        >
            <Modal.Body>
                <div className="col-lg-12">
                    <ImageToBase64Converter
                        onImageConverted={handleImageConverted}
                        imagePath={imagePath}
                    />
                </div>
                <div className="mb-3">
                    <InputField
                        label="Name"
                        dangerTag="*"
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handelCategoryInput}
                        required
                    />
                </div>
                <div className="mb-3">
                      <InputField
                        label="Alias"
                        dangerTag="*"
                        name="alias"
                        type="text"
                        value={formData.alias}
                        onChange={handelCategoryInput}
                        required
                      />

                    </div>
                {/* <InputToggel 
                    id="subcat" 
                    labelName="Catalogue" 
                    initialValue={values.subcat} 
                    onValueChange={handleValueChange} 
                /> */}
            </Modal.Body>
          
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <button className="btn btn-submit">Submit</button>
            </Modal.Footer>
            </form>
        </Modal>
    );
}

export default EditCategoryList;
