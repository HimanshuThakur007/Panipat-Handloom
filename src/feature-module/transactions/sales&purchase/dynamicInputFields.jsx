/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import "./quotStyle.css";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const DynamicInputFields = ({ total }) => {
  const dispatch = useDispatch();
  const { Financial_Table,billsundry_data,form_data } = useSelector((state) => state);
  // const billsundryData = useSelector((state) => state.billsundry_data || {});
  const billsundryData = billsundry_data;
  const fields = billsundryData.fields || [];
  const totalValue = Number(total);
  const inputRefs = useRef([]);
  const prevFieldsLength = useRef(fields.length);
  const prevFields = useRef(fields);

  const handleAddField = (type) => {
    if (!fields.some((field) => field.type === type)) {
      const newFields = [
        ...fields,
        {
          srNo: fields.length + 1,
          type,
          percentage: 0,
          absoluteAmount: 0,
        },
      ];
      // dispatch(set_billsundry_data({ ...billsundryData, fields: newFields }));
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          billsundryData: { ...billsundryData, fields: newFields, total: totalValue,},
          // quotationData:null
        },
      });
    }
  };

  const handleRemoveField = (type) => {
    const newFields = fields.filter((field) => field.type !== type);
    // dispatch(set_billsundry_data({ ...billsundryData, fields: newFields }));
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        billsundryData: { ...billsundryData, fields: newFields },
        // quotationData:null
      },
    });
  };

  const handlePercentageChange = (index, value) => {
    const percentageValue = parseFloat(value) || 0;

    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      percentage: percentageValue,
      absoluteAmount: (totalValue * percentageValue) / 100,
    };
    // dispatch(set_billsundry_data({ ...billsundryData, fields: newFields }));
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        billsundryData: { ...billsundryData, fields: newFields },
        // quotationData:null
      },
    });
  };

  const handleAmountChange = (index, value) => {
    const absoluteAmountValue = parseFloat(value) || 0;

    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      absoluteAmount: absoluteAmountValue,
      percentage: (absoluteAmountValue / totalValue) * 100,
    };
    // dispatch(set_billsundry_data({ ...billsundryData, fields: newFields }));
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        billsundryData: { ...billsundryData, fields: newFields },
        // quotationData:null
      },
    });
  };

  const calculateTotalAmount = () => {
    let discountAmount = 0;
    let totalAfterDiscount = totalValue;

    fields.forEach((field) => {
      if (field.absoluteAmount && !isNaN(field.absoluteAmount)) {
        if (field.type === "Discount") {
          discountAmount += field.absoluteAmount;
        } else if (field.type === "Freight & Forwarding Charges") {
          totalAfterDiscount += field.absoluteAmount;
        } else if (field.type === "Tax %") {
          totalAfterDiscount += (totalAfterDiscount * field.percentage) / 100;
        }
      }
    });
    return totalAfterDiscount - discountAmount;
  };

  const finalTotal = calculateTotalAmount();

  useEffect(() => {
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          billsundryData: {
            ...billsundryData,
            fields,
            total: totalValue,
            finalTotal: finalTotal,
          },
          // quotationData:null
        },
      });
  }, [finalTotal]);

  useEffect(() => {
    if (fields.length > prevFieldsLength.current) {
      const lastFieldIndex = fields.length - 1;
      inputRefs.current[lastFieldIndex]?.focus();
    }

    prevFieldsLength.current = fields.length;
  }, [fields]);

  const renderInputs = (field, index) => (
    <div
      key={field.type}
      className="bill-sundry-item row pb-1 mb-1 align-items-center"
    >
      <div className="col-lg-6 col-sm-12 col-12">
        <label className="form-label small">
          {field.type === "Discount" ? (
            <AiOutlineMinus style={{ color: "red" }} />
          ) : (
            <AiOutlinePlus style={{ color: "green" }} />
          )}{" "}
          {field.type}
        </label>
      </div>
      <div className="col-lg-6 col-sm-12 col-12 d-flex align-items-center gap-2">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              className="form-control form-control-sm"
              style={{ textAlign: "right" }}
              value={field.percentage || ""}
              onChange={(e) => handlePercentageChange(index, e.target.value)}
            />
            <span className="ms-1 text-muted">%</span>
          </div>
          <small className="text-muted">Percentage</small>
        </div>
        <div className="d-flex flex-column align-items-start">
          <input
            type="number"
            className="form-control form-control-sm"
            style={{ textAlign: "right" }}
            value={field.absoluteAmount || ""}
            onChange={(e) => handleAmountChange(index, e.target.value)}
          />
          <small className="text-muted">Absolute amount</small>
        </div>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleRemoveField(field.type)}
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-1">
      {fields?.length > 0 && (
        <div className="row">
          <div className="col-lg-5 col-sm-12 col-12"></div>
          <div className="col-lg-7 col-sm-12 col-12">
            <small className="text-muted">Bill Sundry</small>
            <div className="bill-sundry-section bg-light p-4 rounded">
              {fields.map((field, index) => renderInputs(field, index))}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center mt-2 gap-3">
        <a onClick={(e) => handleAddField("Discount")}>
          <PlusCircle className="plus-down-add-qut" />
          <small style={{ fontWeight: "bold" }}>Add Discount</small>
        </a>
        <a onClick={(e) => handleAddField("Freight & Forwarding Charges")}>
          <PlusCircle className="plus-down-add-qut" />
          <small style={{ fontWeight: "bold" }}>
            Add Freight & Forwarding Charges
          </small>
        </a>
        <a onClick={(e) => handleAddField("Tax %")}>
          <PlusCircle className="plus-down-add-qut" />
          <small style={{ fontWeight: "bold" }}>Add Tax %</small>
        </a>
      </div>

      {/* <div className="mt-0">
    <div className="d-flex justify-content-end p-2">
      <h5>Total Amount: ₹ {calculateTotalAmount().toFixed(2)}</h5>
    </div>
  </div> */}

      {/* <div className="mt-0">
        <div className="d-flex justify-content-end p-2">
          <div
            className="card"
            style={{
              width: "auto",
              padding: "10px 20px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              border: "1px solid #ddd",
            }}
          >
            <h5 className="m-0">
              Total Amount: ₹ {calculateTotalAmount().toFixed(2)}
            </h5>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DynamicInputFields;
