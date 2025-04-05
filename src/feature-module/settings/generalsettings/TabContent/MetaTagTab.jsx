/* eslint-disable react/prop-types */
import React from 'react'
import InputField from '../../../ReusableComponents/InputField'
import InputTextArea from '../../../ReusableComponents/InputTextArea'

const MetaTagTab = () => {
  return (
    <>
     <div className="row">
     <div className="col-lg-6 col-sm-6 col-12">
          <InputField label="Meta Title" type="text" name="Name" />
        </div>
     <div className="col-lg-6 col-sm-6 col-12">
          <InputTextArea label="Meta Keywords" type="text" name="Name" />
        </div>
     <div className="col-lg-6 col-sm-6 col-12">
          <InputTextArea label="Meta Description" type="text" name="Name" />
        </div>
          </div>
    </>
  )
}

export default MetaTagTab