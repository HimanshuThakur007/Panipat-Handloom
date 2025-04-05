import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  ChevronUp,
  RotateCcw,
  Upload,
  X,
} from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import SettingsSideBar from "../settingssidebar";
import InputToggel from "../../../ReusableComponents/InputToggel";
import InputField from "../../../ReusableComponents/InputField";
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import ReactToast, { showToastError, showToastMessage } from "../../../ReusableComponents/ReactToast";

const CompanySettings = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  const [base64Image, setBase64Image] = useState(null);

  console.log("base64Image",base64Image)

  let callFetch = useFetch();
  let InitialData = {
    CompanyName: "",
    ShortName: "",
    CompanyEmail: "",
    PhoneNumber: "",
    GST: "",
    PAN: "",
    Address: "",
    PCode: "",
  };
  const [values, setValues] = useState({});
  const [inputValue, setInputValue] = React.useState(InitialData);
  const [loading, setLoading] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // Max size 5MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File is too large or not supported");
    }
  };

  const handleRemoveImage = () => {
    setBase64Image(null);
  };

  const handleCustomerInfoSave = async (e) => {
    e.preventDefault();
    const requestBody = {
      Name: inputValue.CompanyName,
      ShortName: inputValue.ShortName,
      Address: inputValue.Address,
      GST: inputValue.GST,
      PANNo: inputValue.PAN,
      PINNo: inputValue.PCode,
      MobNo: inputValue.PhoneNumber,
      EMail: inputValue.CompanyEmail,
      BI: parseInt(values.bi),
      Logo: base64Image,
    };
    console.log("customerInfo", JSON.stringify(requestBody));
    let saveurl = `/api/CompInfo`;

    try {
      setLoading(true)
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (got.status == 1) {
        showToastMessage(got.msg);
        setInputValue(InitialData);
        setValues({
            bi:'',
        })
        loadCustomerInfo();
        
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

  const loadCustomerInfo = async () => {
    let url = `/api/GetCompInfo`;
    // console.log("modify", url);
    try {
      setLoading(true)
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let loadData = got.data[0];
        console.log("modDta:-email", loadData);
        setInputValue({
            CompanyName: loadData.name,
            ShortName: loadData.shortName,
            CompanyEmail: loadData.eMail,
            PhoneNumber: loadData.mobNo,
            GST: loadData.gst,
            PAN: loadData.panNo,
            Address: loadData.address,
            PCode: loadData.pinNo,
        });
        setValues({
          bi: parseInt(loadData.bi),
        });
        setBase64Image(loadData.logo);
        setLoading(false)
      }
    } catch (error) {
      // Handle errors
      setLoading(false)
      console.error("Error:", error);
    }
  };


  React.useEffect(() => {
    loadCustomerInfo();
  }, []);
  return (
    <>
    <ReactToast/>
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="row">
          
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap">
                  <form onSubmit={handleCustomerInfoSave}>
                    <div className="setting-title">
                      <h4>Company Settings</h4>
                    </div>
                    <div className="company-info">
                      <div className="card-title-head">
                        <h6>
                          <span>
                            <i data-feather="zap" />
                          </span>
                          Company Information
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="CompanyName"
                              dangerTag="*"
                              label="Company Name"
                                value={inputValue.CompanyName}
                                onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="ShortName"
                              label="Short Name"
                              //   dangerTag="*"
                              value={inputValue.ShortName}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="email"
                              name="CompanyEmail"
                              label="Company Email Address"
                              dangerTag="*"
                              value={inputValue.CompanyEmail}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="PhoneNumber"
                              label="Phone Number"
                              dangerTag="*"
                              value={inputValue.PhoneNumber}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="GST"
                              label="GSTIN"
                              //   dangerTag="*"
                              value={inputValue.GST}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="PAN"
                              label="PAN"
                              //   dangerTag="*"
                              value={inputValue.PAN}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="company-info company-images">
                      <div className="card-title-head">
                        <h6>
                          <span>
                            <i data-feather="image" />
                          </span>
                          Company Images
                        </h6>
                      </div>
                      <ul className="logo-company">
                        <li className="d-flex align-items-center">
                          <div className="logo-info">
                            <h6>Company Logo</h6>
                            <p>
                              Upload Logo of your Company to display in website
                            </p>
                          </div>
                          <div className="profile-pic-upload mb-0">
                            <div className="new-employee-field">
                              <div className="mb-0">
                                <div className="image-upload mb-0">
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                  <div className="image-uploads">
                                    <h4>
                                      <Upload />
                                      Upload Photo
                                    </h4>
                                  </div>
                                </div>
                                <span>
                                  For better preview recommended size is 450px x
                                  450px. Max size 5MB.
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="new-logo ms-auto">
                            <Link to="#" onClick={handleRemoveImage}>
                              {base64Image ? (
                                <>
                                  <img src={base64Image} alt="Logo" />
                                  <span>
                                    <i data-feather="x" />
                                    <X />
                                  </span>
                                </>
                              ) : (
                                <img
                                  src="assets/img/logo-small.png"
                                  alt="Logo"
                                />
                              )}
                            </Link>
                          </div>
                        </li>
                        {/* <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Company Icon</h6>
                                                        <p>Upload Icon of your Company to display in website</p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li> */}
                        {/* <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Favicon</h6>
                                                        <p>
                                                            Upload Favicon of your Company to display in website
                                                        </p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />
                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li> */}
                        {/* <li className="d-flex align-items-center">
                                                    <div className="logo-info">
                                                        <h6>Company Dark Logo</h6>
                                                        <p>Upload Logo of your Company to display in website</p>
                                                    </div>
                                                    <div className="profile-pic-upload mb-0">
                                                        <div className="new-employee-field">
                                                            <div className="mb-0">
                                                                <div className="image-upload mb-0">
                                                                    <input type="file" />
                                                                    <div className="image-uploads">
                                                                        <h4>
                                                                            <Upload />
                                                                            Upload Photo
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    For better preview recommended size is 450px x
                                                                    450px. Max size 5MB.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-logo ms-auto">
                                                        <Link to="#">
                                                            <ImageWithBasePath src="assets/img/logo-small.png" alt="Logo" />
                                                            <span>
                                                                <X />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </li> */}
                      </ul>
                    </div>
                    <div className="company-address">
                      <div className="card-title-head">
                        <h6>
                          <span>
                            <i data-feather="map-pin" />
                          </span>
                          Address
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-8">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                             value={inputValue.Address}
                             onChange={handleInputField}
                             type="text"
                             name="Address"
                             className="form-control"
                            />
                            {/* <InputField
                              type="text"
                              name="Address"
                              label="Address"
                              //   dangerTag="*"
                              value={inputValue.Address}
                              onChange={handleInputField}
                              //   required
                            /> */}
                            </div>
                          </div>
                        {/* </div>
                        <div className="col-xl-4 col-lg-4 col-md-3">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="Address1"
                              label="Address Line-1"
                              //   dangerTag="*"
                              value={inputValue.Address1}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-xl-4 col-lg-4 col-md-3">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="Address2"
                              label="Address Line-2"
                              //   dangerTag="*"
                              value={inputValue.Address2}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-xl-4 col-lg-4 col-md-3">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="Address3"
                              label="Address Line-3"
                              //   dangerTag="*"
                              value={inputValue.Address3}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div> */}
                        {/* <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">State / Province</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div> */}
                        {/* <div className="col-xl-3 col-lg-4 col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div> */}
                        <div className="col-xl-4 col-lg-4 col-md-3">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="PCode"
                              label="Postal Code"
                              //   dangerTag="*"
                              value={inputValue.PCode}
                              onChange={handleInputField}
                              //   required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <InputToggel
                              labelName="Busy Integration"
                              dangerTag="*"
                              id="bi"
                              name="bi"
                              initialValue={values.bi}
                              onValueChange={handleValueChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button type="button" className="btn btn-cancel me-2">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySettings;
