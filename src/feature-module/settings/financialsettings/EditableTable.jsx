import React, { useState } from 'react';
import { Table, Button, Modal, Input, Checkbox } from 'antd';
import Select from 'react-select';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

const defaultRows = Array.from({ length: 15 }, (_, index) => ({
  key: index,
  slabe: '',
  unit: null,
  descItem: null,
  differItem: false,
  itemName: null,
  qty: '',
  unit2: null,
  descPercent: '',
}));

const EditableTable = () => {
  const [rows, setRows] = useState(defaultRows); // Table data in modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [savedData, setSavedData] = useState([]); // Saved table data
  const [editingRow, setEditingRow] = useState(null); // Specific row to edit
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between full table and single row editing

  // Open modal to fill table data
  const handleOpenModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false); // Full table mode
  };

  // Open modal to edit a specific row
  const handleEditRow = (index) => {
    setEditingRow({ ...savedData[index] }); // Clone the selected row data
    setIsModalVisible(true);
    setIsEditMode(true); // Single row edit mode
  };

  // Handle input changes for specific row (while editing)
  const handleRowChange = (field, value) => {
    setEditingRow({ ...editingRow, [field]: value });
  };

  // Save data from modal table to external table
  const handleSave = () => {
    if (isEditMode) {
      // Edit mode: update a single row
      const updatedData = savedData.map((item) =>
        item.key === editingRow.key ? editingRow : item
      );
      setSavedData(updatedData);
    } else {
      // Full table mode: save all rows
      setSavedData(rows);
    }
    setIsModalVisible(false); // Close the modal
  };

  // Handle input changes for full table in modal
  const handleTableInputChange = (key, field, value) => {
    const updatedRows = rows.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Columns for modal table (full table entry)
  const modalColumns = [
    {
      title: 'Slabe',
      dataIndex: 'slabe',
      render: (_, record) => (
        <Input
          value={record.slabe}
          onChange={(e) => handleTableInputChange(record.key, 'slabe', e.target.value)}
        />
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      render: (_, record) => (
        <Select
          options={defaultOptions}
          value={record.unit}
          onChange={(option) => handleTableInputChange(record.key, 'unit', option)}
        />
      ),
    },
    {
      title: 'Desc/Item',
      dataIndex: 'descItem',
      render: (_, record) => (
        <Select
          options={defaultOptions}
          value={record.descItem}
          onChange={(option) => handleTableInputChange(record.key, 'descItem', option)}
        />
      ),
    },
    {
      title: 'Differ Item',
      dataIndex: 'differItem',
      render: (_, record) => (
        <Checkbox
          checked={record.differItem}
          onChange={(e) => handleTableInputChange(record.key, 'differItem', e.target.checked)}
        />
      ),
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      render: (_, record) => (
        <Select
          options={defaultOptions}
          value={record.itemName}
          onChange={(option) => handleTableInputChange(record.key, 'itemName', option)}
        />
      ),
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      render: (_, record) => (
        <Input
          value={record.qty}
          onChange={(e) => handleTableInputChange(record.key, 'qty', e.target.value)}
        />
      ),
    },
    {
      title: 'Unit2',
      dataIndex: 'unit2',
      render: (_, record) => (
        <Select
          options={defaultOptions}
          value={record.unit2}
          onChange={(option) => handleTableInputChange(record.key, 'unit2', option)}
        />
      ),
    },
    {
      title: 'Desc %',
      dataIndex: 'descPercent',
      render: (_, record) => (
        <Input
          value={record.descPercent}
          onChange={(e) => handleTableInputChange(record.key, 'descPercent', e.target.value)}
        />
      ),
    },
  ];

  // Columns for saved data table
  const savedColumns = [
    { title: 'Slabe', dataIndex: 'slabe' },
    { title: 'Unit', dataIndex: 'unit', render: (val) => val?.label },
    { title: 'Desc/Item', dataIndex: 'descItem', render: (val) => val?.label },
    { title: 'Differ Item', dataIndex: 'differItem', render: (val) => (val ? 'Yes' : 'No') },
    { title: 'Item Name', dataIndex: 'itemName', render: (val) => val?.label },
    { title: 'Qty', dataIndex: 'qty' },
    { title: 'Unit2', dataIndex: 'unit2', render: (val) => val?.label },
    { title: 'Desc %', dataIndex: 'descPercent' },
    {
      title: 'Actions',
      render: (_, record, index) => (
        <Button onClick={() => handleEditRow(index)} type="primary">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Button to open modal for table data entry */}
      <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: 20 }}>
        Open Table in Modal
      </Button>

      {/* Modal to display full table or specific row based on mode */}
      <Modal
        title={isEditMode ? 'Edit Specific Row' : 'Enter Table Data'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
      >
        {!isEditMode ? (
          <Table
            dataSource={rows}
            columns={modalColumns}
            pagination={false}
            rowKey="key"
          />
        ) : (
          editingRow && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label>Slabe:</label>
                <Input
                  value={editingRow.slabe}
                  onChange={(e) => handleRowChange('slabe', e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Unit:</label>
                <Select
                  options={defaultOptions}
                  value={editingRow.unit}
                  onChange={(option) => handleRowChange('unit', option)}
                />
              </div>
              {/* Add other input fields similarly for editing a single row */}
            </div>
          )
        )}
      </Modal>

      {/* Table displaying saved data */}
      <h4>Saved Data</h4>
      <Table dataSource={savedData} columns={savedColumns} rowKey="key" />
    </div>
  );
};

export default EditableTable;
