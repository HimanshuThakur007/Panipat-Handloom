/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import InputField from "../../../ReusableComponents/InputField";
import CustomermodalPage from "../../../core/modals-js/peoples/customermodalpage";
import InputSelect, {
  InputSelectWithAdd,
} from "../../../ReusableComponents/InputSelect";
import { financiallogic } from "./financiallogic";
import InputTextArea from "../../../ReusableComponents/InputTextArea";
import ReactToast from "../../../ReusableComponents/ReactToast";
import { useDispatch, useSelector } from "react-redux";

const PurchaseInvoiceForm = () => {
  const {
    handleSelectChange,
    dropDowmList,
    setQuotationDate,
    quotationDate,
    paramId,
    modCode
  } = financiallogic();
  const dispatch = useDispatch();
  const { Quotation_Data, billsundry_data, form_data } = useSelector(
    (state) => state
  );
  const selectedValues = form_data?.selectedValues;
  const remarkHandler = (e) => {
    const newRemark = e.target.value;
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        formData: {
          ...form_data,
          remark: newRemark,
        },
      },
    });
  };
  const getRemark = () => {
    return form_data?.remark || "";
  };
  return (
    <>
      <ReactToast />
      <div className="col-lg-3 col-sm-6 col-12">
        <div className="mb-3 add-product">
          <label className="form-label">
            Date <span className="text-danger">*</span>
          </label>
          <DatePicker
            className="form-control"
            selected={quotationDate}
            onChange={(date) => setQuotationDate(date)}
            disabled={true}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        <InputField
          name="Name"
          label="VCh No"
          value={dropDowmList?.quotationNo}
          type="text"
          dangerTag="*"
          disabled
        />
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        {paramId === "3" ? (
          <InputSelect
            label="Supplier"
            dangerTag="*"
            options={dropDowmList?.supplier}
            value={selectedValues?.supplier}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "supplier")
            }
            isDisabled={modCode == undefined ? false : true}
            required
          />
        ) : (
          paramId === "4" && (
            <InputSelect
              label="Customer"
              // modalOpen="#add-units"
              options={dropDowmList?.partyList}
              value={selectedValues?.customerName}
              dangerTag="*"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "customerName")
              }
              isDisabled={modCode == undefined ? false : true}
              required
            />
          )
        )}
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        {paramId === "3" ? (
        <InputSelect
          label="Purchase Order"
          dangerTag="*"
          // modalOpen="#add-units"
          options={dropDowmList?.purchaseOrder}
          value={selectedValues?.purchaseOrder}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "purchaseOrder")
          }
          isDisabled={modCode == undefined ? false : true}
          required
        />): paramId === "4" ?(
          <InputSelect
          label="Quotation"
          dangerTag="*"
          options={dropDowmList?.quotation}
          value={selectedValues?.quotation}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "quotation")
          }
          isDisabled={modCode == undefined ? false : true}
          required
        />
        ):null}
      </div>

      <div className="col-lg-6 col-sm-6 col-12">
        <InputTextArea
          label="Note"
          name="remark"
          rows={2}
          value={getRemark()}
          onChange={remarkHandler}
          disabled={modCode == undefined ? false : true}
        />
      </div>
      {/* <CustomermodalPage
        id={1}
        customerCode={customerCode}
        resetHandler={() => {}}
        setCustomerCode={setCustomerCode}
        // customerDataHandler={LoadParty}
      /> */}
    </>
  );
};

export default PurchaseInvoiceForm;
