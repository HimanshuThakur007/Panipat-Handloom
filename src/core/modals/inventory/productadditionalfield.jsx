/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CustomModal from "../../../ReusableComponents/CustomModal";
import useFetch from "../../../Hooks/useFetch";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";

const AdditionalFields = ({ additionalFieldData,ProductModifyData,modifyId,selectedProduct }) => {
  const callFetch = useFetch();
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [newOptionInputs, setNewOptionInputs] = useState({});
  const [inputValues, setInputValues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dates, setDates] = useState(Array(formFields.length).fill(null));

  // =====================save Additional-field Master===============================

  React.useEffect(()=>{
    if(modifyId != null)
    ProductModifyData(setInputValues,setSelectedOptions,setCheckboxValues,setDates)
  },[modifyId])

  console.log('inputValues',inputValues)

  const saveMasterHandler = async (inputForField, fieldId) => {
    const requestBody = {
      ID: 0,
      Name: inputForField,
      ParentID: parseInt(fieldId),
      Mastertype: 10001,
    };
    console.log("formData", JSON.stringify(requestBody));
    const apiUrl = `/api/AddOFMaster`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(apiUrl, "POST", requestBody);

      if (res.status == 200) {
        showToastMessage(got.msg);
        // getUrl(custGroupValue);
      } else {
        showToastError(got.msg);
      }
      setLoading(false);
      console.log("POST request result:", res);
    } catch (error) {
      alert(error);
      setLoading(false);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  // =================================get the list of masterlist on additional form===========================================

  const getMasterList = async (id, fieldIndex) => {
    console.log("parameter", id, "fieldIndex", fieldIndex);
    const apiUrl = `/api/GetOFMaster?MasterType=10001&ParentID=${id}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(apiUrl, "GET");
      const data = got.data;

      if (Array.isArray(data)) {
        setDynamicOptions((prevOptions) => ({
          ...prevOptions,
          [`field_${fieldIndex}`]: data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        }));
      } else {
        console.error("API response is not an array:", got.data);
      }
      setLoading(false);
      console.log("AddMasteronlist:", data);
    } catch (error) {
      alert(error);
      setLoading(false);
      // Handle error
    }
  };

  // ===============================to Add options through model=============================================
  const handleAddField = async (fieldIndex) => {
    const fieldKey = `field_${fieldIndex}`;
    const fieldId = `${formFields[fieldIndex].id}`;
    console.log("ff87", fieldId);
    console.log("fieldId-AddFd", fieldId);
    const inputForField = newOptionInputs[fieldKey];

    if (inputForField && inputForField.trim() !== "") {
      setDynamicOptions((prevOptions) => {
        const newOptions = {
          ...prevOptions,
          [fieldKey]: [
            ...(prevOptions[fieldKey] || []),
            { value: inputForField, label: inputForField },
          ],
        };
        return newOptions;
      });
      setNewOptionInputs((prevInputs) => ({
        ...prevInputs,
        [fieldKey]: "",
      }));
      if (inputForField.length > 0) {
        await saveMasterHandler(inputForField, fieldId);
      }
      getMasterList(fieldId, fieldIndex);
    }
  };

  // ==========================load-Additional Master=============================

  const handleInputField = (e, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  // ===============================Modal================================

  const handleSave = async () => {
    for (let index = 0; index < formFields.length; index++) {
      await handleAddField(index);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  // ============================for multiple input field on map==================
  const handleSelectChange = (selectedOption, fieldKey) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldKey]: selectedOption,
    }));
  };
  // =============================for multiple date input===============================

  const handleDateChange = (selectedDate, index) => {
    const updatedDates = [...dates];
    updatedDates[index] = selectedDate;
    setDates(updatedDates);
  };
  // =========================CheckBox-in Map==============================================
  const handleCheckboxChange = (index, isChecked) => {
    const updatedValues = [...checkboxValues];
    updatedValues[index] = isChecked;
    setCheckboxValues(updatedValues);
  };

  // ================================additional-fields=================================================
  const renderField = (field, index) => {
    switch (field.type) {
      case 1:
        return (
          <div key={index} className="form-group row">
            <label className="col-lg-3 col-form-label">{field.name}</label>
            <div className="col-lg-9">
              <input
                type="text"
                className="form-control"
                name={`text${index}`}
                value={inputValues[index] || ""}
                onChange={(e) => handleInputField(e, index)}
              />
            </div>
          </div>
        );
      case 2: {
        const fieldKey = `field_${index}`;
        const optionsArray = dynamicOptions[fieldKey] || [];
        const selectedValue = selectedOptions[fieldKey] || null;
        console.log('selectedValue',selectedValue)
        return (
          <div key={index} className="form-group row">
            <label className="col-lg-3 col-form-label">{field.name}</label>
            <div className="col-lg-8">
              <Select
                options={optionsArray}
                defaultValue={selectedValue}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, fieldKey)
                }
              />
            </div>
            <div className="col-1">
              <CustomModal
                onSave={handleSave}
                onHide={handleClose}
                showsavebtn={1}
                modalTitle="Add Master"
                modalContent={
                  <>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Add Options
                      </label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          name="inp"
                          value={newOptionInputs[fieldKey] || ""}
                          onChange={(e) =>
                            setNewOptionInputs({
                              ...newOptionInputs,
                              [fieldKey]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        );
      }
      case 4:
        return (
          <div key={index} className="form-group row">
            <label className="col-lg-3 col-form-label">{field.name}</label>
            <div className="col-lg-9">
              <DatePicker
                className="form-control"
                selected={dates[index] || new Date()}
                onChange={(selectedDate) =>
                  handleDateChange(selectedDate, index)
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div key={index} className="form-group row">
            <label className="col-lg-3 col-form-label">{field.name}</label>
            <div className="col-lg-9">
              <input
                type="number"
                className="form-control"
                name={`text${index}`}
                value={inputValues[index] || ""}
                onChange={(e) => handleInputField(e, index)}
                // value={numeric}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div key={index} className="form-group row">
            <label className="col-lg-3 col-form-label">{field.name}</label>
            <div className="col-lg-9">
              <div className="checkbox-apple ">
                <input
                  className="yep"
                  id={`check-${index}`}
                  type="checkbox"
                  checked={checkboxValues[index] || false}
                  onChange={(e) =>
                    handleCheckboxChange(index, e.target.checked)
                  }
                />
                <label
                  htmlFor={`check-${index}`}
                  className="form-label"
                ></label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  // ========================Additional-field load=====================================
  const getAdditionalField = async () => {
    let locVal = [];
    setFormFields([])
    // const apiUrl = `/api/GetOptionalFields?MasterType=6&ParentID=0`;
    const apiUrl = `/api/GetProductAddMasterConfig?Category=${selectedProduct?.category?.value}`;
    console.log("getApiUrl", apiUrl);
    try {
      setLoading(true);
      const { res, got } = await callFetch(apiUrl, "GET");
      let data = got.data;
      if (got && data.length > 0) {
        setFormFields(data);
        console.log("dataAdditional", got.data);
        locVal = data;

        data.forEach((item, index) => {
          if (item.type === 2) {
            (async (fieldIndex) => {
              await getMasterList(item.id, fieldIndex);
            })(index);
          }
        });
      }
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
      // Handle error
    }

    return locVal;
  };

  React.useEffect(() => {
    if(selectedProduct?.category !== null){

      getAdditionalField();
    }
  }, [selectedProduct?.category]);

  React.useEffect(() => {
    additionalFieldData(
      formFields,
      inputValues,
      selectedOptions,
      dates,
      checkboxValues
    );
  }, [formFields, inputValues, selectedOptions, dates, checkboxValues]);
  return (
    <>
      <CustomModal
        onSave={handleSave}
        onHide={handleClose}
        showsavebtn={0}
        buttonText="+ Additional Fields"
        tooltipMessage="First Select Sagment to Display Additional Fields"
        isDisabled={selectedProduct.category !== null ? false : true}
        // isDisabled={true}
        size="xl"
        modalTitle="Additional Fields"
        modalContent={
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form action="#">
                      <div className="row">
                        {formFields.map((field, index) => {
                          return (
                            <>
                              <div className="col-xl-6 mb-2" key={index}>
                                {renderField(field, index)}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default AdditionalFields;
