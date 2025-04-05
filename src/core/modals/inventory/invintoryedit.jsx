/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditInventory = ({
  formData,
  id,
  handelInputChange,
  handleSaveMaster,
  showModal,
  handleClose,
}) => {
  console.log("formData", formData);

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit{" "}
          {id == 1
            ? "Product Type"
            : id == 2
            ? "Tax Type"
            : id == 3
            ? "Store"
            : id == 4
            ? "WareHouse"
            : id == 5
            ? "Source"
            : id == 6
            ? "Purpose"
            : ""}
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) =>
          handleSaveMaster(
            e,
            id === "1"
              ? "5"
              : id === "2"
              ? "9"
              : id === "3"
              ? "10"
              : id === "4"
              ? "11"
              : id === "5"
              ? "12"
              : id === "6"
              ? "13"
              : ""
          )
        }
      >
        <Modal.Body className="custom-modal-body">
          <div className="mb-3">
            <label className="form-label">
              {id == 1
                ? "Product Type"
                : id == 2
                ? "Tax Type"
                : id == 3
                ? "Store"
                : id == 4
                ? "WareHouse"
                : id == 5
                ? "Source"
                : id == 6
                ? "Purpose"
                : ""}{" "}
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name={
                id == 1
                  ? "Product Type"
                  : id == 2
                  ? "Tax Type"
                  : id == 3
                  ? "Store"
                  : id == 4
                  ? "WareHouse"
                  : id == 5
                  ? "source"
                  : id == 6
                  ? "purpose"
                  : ""
              }
              value={
                id === "1"
                  ? formData.productType
                  : id == 2
                  ? formData.taxType
                  : id == 3
                  ? formData.store
                  : id == 4
                  ? formData.wareHouse
                  : id == 5
                  ? formData.source
                  : id == 6
                  ? formData.purpose
                  : ""
              }
              onChange={handelInputChange}
              required
            />
          </div>
          {id == 1 ||
            (id == 2 && (
              <div className="mb-3">
                <label className="form-label">
                  {id === "2" ? "Tax %" : "Alias"}
                  <span className="text-danger">*</span>
                </label>
                <input
                  name={id === "2" ? "taxPer" : "alias"}
                  type="text"
                  className="form-control"
                  value={id === "2" ? formData.taxPer : formData.alias}
                  onChange={handelInputChange}
                  required
                />
              </div>
            ))}
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

export default EditInventory;
