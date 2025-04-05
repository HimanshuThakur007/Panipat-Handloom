/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import WhatsAppConfig from "./whatsappconfig";
import useFetch from "../../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";

const WhatsAppConfigPage = () => {
  let callFetch = useFetch();
  let InitialData = {
    BaseURL: "",
    Parameter1H: "",
    Parameter1V: "",
    Parameter2H: "",
    Parameter2V: "",
    SenderID: "",
    Parameter3V: "",
    Parameter4H: "",
    Parameter4V: "",
    MobileH: "",
    MessageH: "",
    WAppBody: "",
  };
  const [inputValue, setInputValue] = React.useState(InitialData);
  const [loading, setLoading] = useState(false)
  const {
    BaseURL,
    Parameter1H,
    Parameter1V,
    Parameter2H,
    Parameter2V,
    SenderID,
    Parameter3V,
    Parameter4H,
    Parameter4V,
    MobileH,
    MessageH,
    WAppBody,
  } = inputValue;

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleWhatsappSave = async (e) => {
    e.preventDefault();
    const requestBody = {
      UType: 1,
      CustomerID: 0,
      RecType: 1,
      BaseURL,
      UserName: Parameter1H || "",
      Parameter1V,
      Password: Parameter2H,
      Parameter2V,
      SenderID,
      Parameter3V,
      AdditionalParameter: Parameter4H || "",
      Parameter4V,
      MobileH,
      MessageH,
      WAppBody,
    };
    console.log("whatsappJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveWhatsappConfig`;

    try {
      setLoading(true)
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (got.status == 1) {
        showToastMessage(got.msg);
          setInputValue(InitialData)
          loadWhatsappHandler()
      } else {
        showToastError(got.msg);
      }
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false)
    }
  };

  const loadWhatsappHandler = async () => {
    let url = `/api/GetDMSWhatsappConfig?RecType=1&UType=1`;
    console.log("modify", url);
    try {
      setLoading(true)
      const { res, got } = await callFetch(url, "GET");

      if (res.status == 200) {
        let loadData = got.data[0];
        console.log("whatsapp-loading", loadData);
        setInputValue({
          BaseURL: loadData.baseURL,
          Parameter1H: loadData.userName,
          Parameter1V: loadData.parameter1V,
          Parameter2H: loadData.password,
          Parameter2V: loadData.parameter2V,
          SenderID: loadData.senderId,
          Parameter3V: loadData.parameter3V,
          Parameter4H: loadData.additionalParameter,
          Parameter4V: loadData.parameter4V,
          MobileH: loadData.mobileH,
          MessageH: loadData.messageH,
          WAppBody: loadData.wAppBody,
        });
      }
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    loadWhatsappHandler();
  }, []);
  return (
    <>
      <ReactToast />
      <WhatsAppConfig
        inputValue={inputValue}
        handleInputField={handleInputField}
        handleWhatsappSave={handleWhatsappSave}
        loading={loading}
      />
    </>
  );
};

export default WhatsAppConfigPage;
