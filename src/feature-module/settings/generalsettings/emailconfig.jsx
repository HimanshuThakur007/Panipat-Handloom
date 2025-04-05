/* eslint-disable react/prop-types */
import React from "react";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import SettingsSidebar from "../settingssidebar";
import InputField from "../../../ReusableComponents/InputField";
import InputTextArea from "../../../ReusableComponents/InputTextArea";
import InputToggel from "../../../ReusableComponents/InputToggel";
import ReactLoader from "../../../ReusableComponents/ReactLoader";

const EmailConfig = ({
  handleValueChange,
  values,
  inputValue,
  handleInputField,
  handleEmailSave,
  loading,
}) => {
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
  const { SenderID, PWD, SMTPServer, SMTPPort, EMailB } = inputValue;
  return (
    <>
      <div>
        <div className="page-wrapper">
          <div className="content settings-content">
            <div className="page-header settings-pg-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Settings</h4>
                  <h6>Manage your settings on portal</h6>
                </div>
              </div>
              {loading ? (
                <ReactLoader
                  loaderClass="position-absolute"
                  loading={loading}
                />
              ) : null}
              <ul className="table-top-head">
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderRefreshTooltip}
                  >
                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                      <RotateCcw />
                    </Link>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderCollapseTooltip}
                  >
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
                  <SettingsSidebar />
                  <div className="settings-page-wrap">
                    <form onSubmit={handleEmailSave}>
                      <div className="setting-title">
                        <h4>Email Configuration Settings</h4>
                      </div>
                      <div className="card-title-head"></div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="SenderID"
                              dangerTag="*"
                              label="Sender ID"
                              value={SenderID}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="PWD"
                              dangerTag="*"
                              label="Password"
                              value={PWD}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="SMTPServer"
                              dangerTag="*"
                              label="SMTP Server"
                              value={SMTPServer}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <InputField
                              type="text"
                              name="SMTPPort"
                              dangerTag="*"
                              label="SMTP Port"
                              value={SMTPPort}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3">
                            <InputToggel
                              labelName="SSL"
                              dangerTag="*"
                              id="ssl"
                              name="EmailSSL"
                              initialValue={values.ssl}
                              onValueChange={handleValueChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <InputTextArea
                              type="text"
                              name="EMailB"
                              dangerTag="*"
                              label="Email Footer"
                              value={EMailB}
                              rows={4}
                              onChange={handleInputField}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-end settings-bottom-btn">
                        <button type="button" className="btn btn-cancel me-2">
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-submit">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailConfig;
