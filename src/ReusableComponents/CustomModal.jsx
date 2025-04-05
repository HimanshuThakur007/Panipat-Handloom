/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const CustomModal = ({
  buttonText,
  modalTitle,
  modalContent,
  onSave,
  onHide,
  size,
  showsavebtn,
  tooltipMessage,
  isDisabled,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    if (onHide) onHide();
  };

  const handleShow = () => {
    if (!isDisabled) setShow(true);
  };

  const handleSave = () => {
    if (onSave) onSave();
    // handleClose();
  };

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{tooltipMessage || 'Click to open modal'}</Tooltip>}
      >
        <span>
          <Button
            variant="primary"
            onClick={handleShow}
            disabled={isDisabled}
            style={isDisabled ? { pointerEvents: 'none' } : {}}
          >
            {buttonText || '+'}
          </Button>
        </span>
      </OverlayTrigger>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size={size}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle || 'Modal Title'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent || 'Modal Content Goes Here'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showsavebtn === 1 && (
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
