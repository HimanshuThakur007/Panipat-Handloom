/* eslint-disable react/prop-types */
import React from "react";
import InputField from "../../../ReusableComponents/InputField";

const ImagesTab = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-sm-6 col-12">
          <div className="mb-3 add-product">
            <label>The path to the image is not correct.</label>
            <br />
            <label>
              Your server does not support the GD function required to process
              this type of image.
            </label>
            <label className="text-danger">
            (Image size should be 1200 X 260 )
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6 col-12">
          <InputField label="Main Banner" type="file" name="Name" />
        </div>
        <hr/>
        <div className="col-lg-6 col-sm-6 col-12">
          <div className="mb-3 add-product">
            <label>The path to the image is not correct.</label>
            <br />
            <label>
              Your server does not support the GD function required to process
              this type of image.
            </label>
            <label className="text-danger">
            (image size should be 500 X 250 )
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6 col-12">
          <InputField label="Menu Image" type="file" name="Name" />
        </div>
      </div>
    </>
  );
};

export default ImagesTab;
