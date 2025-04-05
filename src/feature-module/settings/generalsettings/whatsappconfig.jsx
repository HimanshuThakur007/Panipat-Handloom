/* eslint-disable react/prop-types */
import React from "react";
import {
  ChevronUp,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import SettingsSidebar from "../settingssidebar";
import InputField from "../../../ReusableComponents/InputField";
import InputTextArea from "../../../ReusableComponents/InputTextArea";
import ReactLoader from "../../../ReusableComponents/ReactLoader";

const WhatsAppConfig = ({
  inputValue,
  handleInputField,
  handleWhatsappSave,
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content settings-content">
          {loading ? (
            <ReactLoader loaderClass="position-absolute" loading={loading} />
          ) : null}
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
                <SettingsSidebar />
                <div className="settings-page-wrap">
                  <form onSubmit={handleWhatsappSave}>
                    <div className="setting-title">
                      <h4>WhatsApp Configuration Settings</h4>
                    </div>
                    <div className="card-title-head"></div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <InputField
                            label="Base Url"
                            dangerTag="*"
                            name="BaseURL"
                            type="text"
                            value={BaseURL}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Parameter1"
                            dangerTag="*"
                            name="Parameter1H"
                            type="text"
                            value={Parameter1H}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Value1"
                            dangerTag="*"
                            name="Parameter1V"
                            type="text"
                            value={Parameter1V}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Parameter2"
                            dangerTag="*"
                            name="Parameter2H"
                            type="text"
                            value={Parameter2H}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Value2"
                            dangerTag="*"
                            name="Parameter2V"
                            type="text"
                            value={Parameter2V}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Parameter3"
                            name="SenderID"
                            type="text"
                            value={SenderID}
                            onChange={handleInputField}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Value3"
                            name="Parameter3V"
                            type="text"
                            value={Parameter3V}
                            onChange={handleInputField}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Parameter4"
                            name="Parameter4H"
                            type="text"
                            value={Parameter4H}
                            onChange={handleInputField}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <InputField
                            label="Value4"
                            name="Parameter4V"
                            type="text"
                            value={Parameter4V}
                            onChange={handleInputField}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <InputField
                            label="Mobile"
                            dangerTag="*"
                            name="MobileH"
                            type="text"
                            value={MobileH}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <InputField
                            label="Message"
                            dangerTag="*"
                            name="MessageH"
                            type="text"
                            value={MessageH}
                            onChange={handleInputField}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <InputTextArea
                            label="Body"
                            name="WAppBody"
                            value={WAppBody}
                            rows={4}
                            onChange={handleInputField}
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
    </>
  );
};

export default WhatsAppConfig;
