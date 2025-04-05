import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Select, Button } from "antd";
import ReactSelect from "react-select";
import "./QuotationTable.css";
import { useDispatch, useSelector } from "react-redux";
import { resetFinancialTableData } from "../../../core/redux/action";
import { financiallogic } from "./financiallogic";
import { showConfirmationAlert } from "../../../ReusableComponents/ConfirmAlert";
import { Link } from "react-router-dom";
import DynamicInputFields from "./dynamicInputFields";
import './QuotationTable.css'

const { Option } = Select;

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    backgroundColor: state.isDisabled ? "#fff" : base.backgroundColor, // White when disabled
    cursor: state.isDisabled ? "not-allowed" : base.cursor,
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#000" : base.color, // Ensure text is visible when disabled
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    display: state.isDisabled ? "none" : "flex", // Hide indicators when disabled
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    display: state.isDisabled ? "none" : base.display, // Hide dropdown icon when disabled
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: state.isDisabled ? "none" : base.display, // Hide separator when disabled
  }),
};

const FinancialTable = () => {
  const dispatch = useDispatch();
  const { dropDowmList,paramId,pi,modCode } = financiallogic();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { Financial_Table, billsundry_data,form_data } = useSelector((state) => state);
  // const quotationData = useSelector((state) => state?.Quotation_Data);
  const quotationData = Financial_Table;
  let selectedValues = form_data?.selectedValues
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemSelect = (selectedOption, record, field) => {
    const updatedDataSource = quotationData?.map((row) => {
      if (row.key === record.key) {
        // Update the selected row with the new values
        const updatedRow = {
          ...row,
          [field]: selectedOption,
          unitName: selectedOption.unit,
          unit: selectedOption.unitName,
          quantity: selectedOption.quantity,
          // salePrice: paramId === '1' ? selectedOption?.salePrice : paramId === "2" ? selectedOption?.purcPrice:'',
          price: paramId === "1" || paramId === "4" ? selectedOption?.salePrice : paramId === "2" || paramId === "3" ? selectedOption?.purcPrice : "",
          tax: selectedOption.tax,
          isEditable: field === "itemName" ? true : row.isEditable,
        };
  
        // Perform calculations immediately
        const quantity = updatedRow.quantity || 0;
        // const salePrice = updatedRow.salePrice || 0;
        const price = updatedRow.price || 0;
        const discountPer = updatedRow.discountPer || 0;
        const tax = updatedRow.tax || 0;
  
        const baseAmount = quantity * price;
        const discountAmount = (baseAmount * discountPer) / 100;
        const taxAmount = ((baseAmount - discountAmount) * tax) / 100;
        const totalAmount = baseAmount - discountAmount + taxAmount;
  
        updatedRow.amount = baseAmount;
        updatedRow.discountAmt = discountAmount;
        updatedRow.taxAmount = taxAmount;
        updatedRow.totalAmount = totalAmount;
  
        return updatedRow;
      }
      return row;
    });
  
    // Add a new empty row if the selected record is the last one
    if (record.key === quotationData[quotationData.length - 1].key) {
      updatedDataSource.push({
        key: quotationData.length + 1,
        itemName: null,
        quantity: null,
        unit: null,
        price: null,
        amount: null,
        discountPer: null,
        discountAmt: null,
        tax: null,
        taxAmount: null,
        totalAmount: null,
        isEditable: false,
      });
    }
  
    // Dispatch updated data to Redux
    // dispatch(set_quotationform_data(updatedDataSource));
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        billsundryData: null ,
        financialtabledata:updatedDataSource
      }
    });
  };

  const handleFieldChange = (value, record, field) => {
    const updatedDataSource = quotationData.map((row) => {
      if (row.key === record.key) {
        const updatedRow = { ...row, [field]: value };

        // Perform calculations for Amount, Discount Amount, Tax Amount, and Total Amount
        const quantity = updatedRow.quantity || 0;
        // const salePrice = updatedRow.salePrice || 0;
        const price = updatedRow.price || 0;
        const discountPer = updatedRow.discountPer || 0;
        const tax = updatedRow.tax || 0;

        const baseAmount = quantity * price;
        const discountAmount = (baseAmount * discountPer) / 100;
        const taxAmount = ((baseAmount - discountAmount) * tax) / 100;
        const totalAmount = baseAmount - discountAmount + taxAmount;

        updatedRow.amount = baseAmount;
        updatedRow.discountAmt = discountAmount;
        updatedRow.taxAmount = taxAmount;
        updatedRow.totalAmount = totalAmount;

        return updatedRow;
      }
      return row;
    });

    // dispatch(set_quotationform_data(updatedDataSource));
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        billsundryData: null ,
        financialtabledata:updatedDataSource
      }
    });
  };


  const handleDelete = (record) => {
    if (quotationData.length > 1) {
      const updatedDataSource = quotationData.filter(
        (row) => row.key !== record.key
      );
      // dispatch(set_quotationform_data(updatedDataSource));
      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          billsundryData: null ,
          financialtabledata:updatedDataSource
        }
      });
    } else {
      // Reset to default values
      dispatch(resetFinancialTableData());
    }
  };
  const computeTotalAmount = () => {
    const total = Array.isArray(quotationData)
      ? quotationData.reduce((sum, row) => sum + (row?.totalAmount || 0), 0)
      : 0;
    return total.toFixed(2);
  };
  
  
console.log("itemList-Drop",dropDowmList?.itemList)
  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      width: 300, // Specify width
      // fixed: isLargeScreen ? "left" : undefined,
      render: (_, record) => (
        <ReactSelect
          className="react-select-container"
          options={dropDowmList?.itemList}
          value={record.itemName}
          onChange={(selectedOption) =>
            handleItemSelect(selectedOption, record, "itemName")
          }
          styles={customStyles}
          isDisabled={!(pi === 0 && modCode === undefined)}
          menuPortalTarget={document.body}
          placeholder="Select Item..."
          
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <InputNumber
            value={Number(record.quantity || 0).toFixed(2)}
            min={0}
            controls={false}
            onChange={(value) =>
              handleFieldChange(parseFloat(value), record, "quantity")
            }
            onKeyDown={(e) => {
              if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        ) : null,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <span>{record.unit}</span>
        ) :
        null,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (_, record) =>
        record.itemName ? (
          <InputNumber
            value={Number(record.price || 0).toFixed(2)}
            min={0}
            controls={false}
            onChange={(value) => handleFieldChange(parseFloat(value), record, "price")}
            onKeyDown={(e) => {
              if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        ) : null,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? <span>{record.amount?.toFixed(2)}</span> : null,
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPer",
      key: "discountPer",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <InputNumber
            value={Number(record.discountPer || 0).toFixed(2)}
            controls={false}
            min={0}
            max={100}
            onChange={(value) =>
              handleFieldChange(parseFloat(value), record, "discountPer")
            }
            onKeyDown={(e) => {
              if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        ) : null,
    },
    {
      title: "Discount Amount",
      dataIndex: "discountAmt",
      key: "discountAmt",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <span>{record.discountAmt}</span>
        ) : 
        null,
    },

    {
      title: "Tax (%)",
      dataIndex: "tax",
      key: "tax",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <InputNumber
            value={Number(record.tax || 0).toFixed(2)}
            min={0}
            controls={false}
            onChange={(value) =>
              handleFieldChange(parseFloat(value), record, "tax")
            }
            onKeyDown={(e) => {
              if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        ) : null,
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmount",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? (
          <span>{record.taxAmount?.toFixed(2)}</span>
        ) : 
        null,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150, // Specify width
      render: (_, record) =>
        record.itemName ? <span>{record.totalAmount?.toFixed(2)}</span> : null,
    },
    {
      title: "Actions",
      fixed: "right",
      width: 100,
      render: (record) => (
        record.itemName ?(
        <td className="action-table-data">
          <div className="edit-delete-action">
            <a className="confirm-text p-2">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() => handleDelete(record)}
              ></i>
            </a>
          </div>
        </td>) : null
      ),
    },
  ];

  return (
    <>
    <div className="table-responsive mb-3">
      <Table
        // className="table datanew dataTable no-footer"
        className="quotation-table"
        dataSource={quotationData}
        columns={columns}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
        sticky
        // footer={() => (
        //   <div
        //     style={{
        //       textAlign: "right",
        //       paddingRight: "16px",
        //       fontWeight: "bold",
        //     }}
        //   >
        //     Total Amount: {computeTotalAmount()}
        //   </div>
        // )}
      />
    </div>
      <DynamicInputFields total={computeTotalAmount()}/>
    </>
  );
};

export default FinancialTable;
