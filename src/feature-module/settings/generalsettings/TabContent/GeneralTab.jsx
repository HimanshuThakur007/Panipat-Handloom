/* eslint-disable react/prop-types */
import React from "react";
import InputSelect from "../../../../ReusableComponents/InputSelect";
import InputField from "../../../../ReusableComponents/InputField";
import InputTextArea from "../../../../ReusableComponents/InputTextArea";
import TextEditor from "../../../inventory/texteditor";


const GeneralTab = () => {
  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-12">
            <div className="mb-3 add-product">
              <InputSelect label="Parent" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            <InputField label="Name" type="text" name="Name" />
          </div>
          <div className="col-lg-6 col-sm-6 col-12 mb-3 d-sm-flex align-items-center justify-content-between">
            {/* <div className="col-lg-12 "> */}
            <label className="form-label">Location</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="checkebox-sm"
                defaultChecked="true"
              />
              <label className="form-check-label" htmlFor="checkebox-sm">
                Show on Top
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="checkebox-sm"
                defaultChecked="true"
              />
              <label className="form-check-label" htmlFor="checkebox-sm">
                Show on Footer
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="checkebox-sm"
                defaultChecked="true"
              />
              <label className="form-check-label" htmlFor="checkebox-lg">
                Hidden
              </label>
            </div>
            {/* </div> */}
          </div>

          <div className="col-lg-6 col-sm-6 col-12 mb-3 d-sm-flex align-items-center justify-content-between">
            {/* <div className="col-lg-12 "> */}
            <label className="form-label">Show in Key Feature</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="checkebox-sm"
                defaultChecked="true"
              />
              <label className="form-check-label" htmlFor="checkebox-sm">
                Show on Top
              </label>
            </div>

            {/* </div> */}
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            <InputTextArea label="Description" />
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            <div className="mb-3 add-product">
              <InputSelect label="Page or Link" />
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            <InputField label="Menu Page URL" type="text" name="Name" />
          </div>
          <div className="col-lg-12">
            <div className="mb-3 summer-description-box">
              <label className="form-label">Content</label>
              <div id="summernote" /> <TextEditor />
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            <div className="mb-3 add-product">
              <InputSelect label="Status" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default GeneralTab;
