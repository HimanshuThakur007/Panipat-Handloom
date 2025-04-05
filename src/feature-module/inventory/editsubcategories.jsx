/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import ImageToBase64Converter from "../../ReusableComponents/ImageToBase64Converter";

const EditSubcategories = ({
  catrgoryTable,
  selectCategory,
  handleCategoryChange,
  formData,
  handleSaveMaster,
  handelInputChange,
  handleImageConverted,
  imagePath,
  showModal, // Pass showModal as a prop
  handleClose, // Pass handleClose function as a prop
  handleShow,
}) => {
  const categories = catrgoryTable?.map((category) => ({
    value: category.code,
    label: category.name,
  }));

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Catalogue</Modal.Title>
      </Modal.Header>
      {/* <form onSubmit={(e) => handleSaveMaster(e, "6")}> */}
      <form
        onSubmit={(e) => {
          handleSaveMaster(e, "6");
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
          {/* <div className="mb-3">
            <label className="form-label">Sagment</label>
            <Select
              className="select"
              options={categories}
              value={selectCategory}
              onChange={handleCategoryChange}
            />
          </div> */}
          <div className="mb-3">
            <label className="form-label">
              Catalogue Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="subCategory"
              value={formData.subCategory}
              onChange={handelInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Alias <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="alias"
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
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditSubcategories;
