/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EmailConfig from "./emailconfig";
import useFetch from "../../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";

const EmailConfigPage = () => {
  let callFetch = useFetch();
  let InitialData = {
    SenderID: "",
    PWD: "",
    SMTPServer: "",
    SMTPPort: "",
    EMailB: "",
  };
  const [values, setValues] = useState({});
  const [inputValue, setInputValue] = React.useState(InitialData);
  const [loading, setLoading] = useState(false)

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  const { SenderID, PWD, SMTPServer, SMTPPort, EMailB } = inputValue;

  const handleEmailSave = async (e) => {
    e.preventDefault();
    const requestBody = {
      UType: 1,
      CustomerID: 0,
      RecType: 1,
      SenderID,
      PWD,
      SMTPServer,
      SMTPPort,
      EMailB,
      EMailS: "",
      EmailSSL: parseInt(values.ssl) || 0,
    };
    console.log("EmailJson", JSON.stringify(requestBody));
    let saveurl = `/api/SaveEMailConfig`;

    try {
      setLoading(true)
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      console.log('RES',res)
      if (got.status == 1) {
        showToastMessage(got.msg);
        setInputValue(InitialData);
        loadEmailHandler();
        
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

  const loadEmailHandler = async () => {
    let url = `/api/GetDMSEMailConfig?RecType=1&UType=1`;
    console.log("modify", url);
    try {
      setLoading(true)
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let loadData = got.data[0];
        console.log("modDta:-email", loadData);
        setInputValue({
          SenderID: loadData.senderID,
          PWD: loadData.pwd,
          SMTPServer: loadData.smtpServer,
          SMTPPort: loadData.smtpPort,
          EMailB: loadData.eMailB,
        });
        setValues({
          ssl: parseInt(loadData.emailSSL),
        });
        setLoading(false)
      }
    } catch (error) {
      // Handle errors
      setLoading(false)
      console.error("Error:", error);
    }
  };
  // Example of making a GET request
  useEffect(() => {
    loadEmailHandler();
  }, []);
  return (
    <>
      <ReactToast />
      <EmailConfig
        inputValue={inputValue}
        handleInputField={handleInputField}
        handleValueChange={handleValueChange}
        values={values}
        handleEmailSave={handleEmailSave}
        loading={loading}
      />
    </>
  );
};

export default EmailConfigPage;
