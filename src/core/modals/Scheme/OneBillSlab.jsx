/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Table, Input, Checkbox } from "antd";
import InputSelect from "../../../ReusableComponents/InputSelect";
import Select from "react-select";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
const OneBillSlab = ({
  showModal,
  isEditMode,
  setShowModal,
  editingRow,
  handleRowChange,
  loading,
  productGroupData,
  selectValues,
  handleSelectChange,
  tableData,
  columns,
  handleSaveChanges,
  unitList,
  itemList,
  discItemOptions
}) => {
  return (
    <Modal fullscreen show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        {/* <Modal.Title>One Bill Slab</Modal.Title> */}
        <Modal.Title>
          {isEditMode ? "Edit One Bill Slab" : "One Bill Slab"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-4">
          <div className="col-lg-4 mt-2">
            <InputSelect
              name="productgrpslab"
              label="Product Group"
              options={productGroupData}
              value={selectValues?.productgrpslab||{value:editingRow?.productGrpcode , label:editingRow?.productGrpSlab}}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        {!isEditMode ? (
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            rowKey="key"
          />
        ) : (
          editingRow && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label>Slab:</label>
                <Input
                  value={editingRow.slab}
                  onChange={(e) => handleRowChange('slab', e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Unit:</label>
                <Select
                  options={unitList}
                  value={editingRow.unit}
                  onChange={(option) => handleRowChange('unit', option)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Disc/Item:</label>
                <Select
                  options={discItemOptions}
                  value={editingRow.discItem}
                  onChange={(option) => handleRowChange('discItem', option)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Differ Item:</label>
                <Checkbox
                  checked={editingRow.differItem}
                  onChange={(e) => handleRowChange('differItem', e.target.checked)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Item Name:</label>
                <Select
                  options={itemList}
                  value={editingRow.itemName}
                  onChange={(option) => handleRowChange('itemName', option)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Qty:</label>
                <Input
                  value={editingRow.qty}
                  onChange={(e) => handleRowChange('qty', e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Unit2:</label>
                <Select
                  options={unitList}
                  value={editingRow.unit2}
                  onChange={(option) => handleRowChange('unit2', option)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Disc %:</label>
                <Input
                  value={editingRow.discPercentage}
                  onChange={(e) => handleRowChange('discPercentage', e.target.value)}
                />
              </div>
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OneBillSlab;
