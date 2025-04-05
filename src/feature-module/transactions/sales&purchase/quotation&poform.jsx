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

const Quotation_Po_form = () => {
  const {
    handleSelectChange,
    dropDowmList,
    setQuotationDate,
    quotationDate,
    paramId,
    modCode
  } = financiallogic();
const dispatch = useDispatch()
  function getAgainstList(id) {
    if (id === "1") {
      return [
        { value: 1, label: "Direct" },
        { value: 2, label: "Measurement" },
        { value: 3, label: "Enquiry" },
      ];
    } else if (id === "2") {
      return [
        { value: 1, label: "Direct" },
        { value: 2, label: "Against Quotation" },
      ];
    } else {
      return [];
    }
  }
  const { Quotation_Data, billsundry_data, form_data } = useSelector((state) => state);
  const selectedValues = form_data?.selectedValues
  const againstList = getAgainstList(paramId);
  const remarkHandler = (e)=>{
    const newRemark = e.target.value;

  // Dispatch to set the new remark
  dispatch({
    type: "SET_FORM_DATA",
    payload: {
      formData: {
        ...form_data, 
        remark: newRemark,
      },
    },
  });
  }
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
      {paramId === "1" && (
        <>
          <div className="col-lg-3 col-sm-6 col-12">
            <InputSelect
              label="Customer"
              dangerTag="*"
              // modalOpen="#add-units"
              options={dropDowmList?.partyList}
              value={selectedValues?.customerName}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "customerName")
              }
              isDisabled={modCode == undefined ? false : true}
              required

            />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <InputSelect
              label="Salesman"
              // dangerTag="*"
              options={dropDowmList?.saleManList}
              value={selectedValues?.salesman}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "salesman")
              }
              isDisabled={modCode == undefined ? false : true}
              // required
            />
          </div>
        </>
      )}

      <div className="col-lg-3 col-sm-6 col-12">
        <InputSelect
          label="Against"
          dangerTag="*"
          options={againstList}
          value={selectedValues?.against}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "against")
          }
          isDisabled={modCode == undefined ? false : true}
          required
        />
      </div>
      {(paramId === "1" && selectedValues?.against?.value === 3) ||
      (paramId === "1" && selectedValues?.against?.value === 2) ? (
        <div className="col-lg-3 col-sm-6 col-12">
          <InputSelect
            label={
              selectedValues?.against?.value === 2 ? "Measurment" : "Enquiry"
            }
            dangerTag="*"
            options={dropDowmList?.againstType}
            value={selectedValues?.MJInqName}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "MJInqName")
            }
            isDisabled={modCode == undefined ? false : true}
            required
          />
        </div>
      ) : paramId === "2" && selectedValues?.against?.value === 2 ? (
        <>
          <div className="col-lg-3 col-sm-6 col-12">
            <InputSelect
              label="Quotation No."
              dangerTag="*"
              options={dropDowmList?.quotation}
              value={selectedValues?.quotation}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "quotation")
              }
              isDisabled={modCode == undefined ? false : true}
              required
            />
          </div>
          {selectedValues?.quotation != null && (
            <div className="col-lg-3 col-sm-6 col-12">
              <InputField
                name="customer"
                label="Customer Name"
                value={selectedValues?.quotation?.customerName}
                type="text"
                dangerTag="*"
                disabled
                
              />
            </div>
          )}
          {modCode != undefined && (
              <div className="col-lg-3 col-sm-6 col-12">
          <InputSelect
            label="Supplier"
            dangerTag="*"
            options={dropDowmList?.supplier}
            value={selectedValues?.supplier}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "supplier")
            }
            isDisabled={true}
            required
            />
            </div>
          )}
        </>
      ) : (
        paramId === "2" &&
        selectedValues?.against?.value === 1 && (
          <>
            <div className="col-lg-3 col-sm-6 col-12">
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
            </div>
          </>
        )
      )}

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
      {/* {children} */}
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

export default Quotation_Po_form;
