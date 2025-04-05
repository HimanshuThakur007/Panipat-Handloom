 /* eslint-disable react/prop-types */
import React from 'react'

const InputTextArea = ({label,type,name,value,onChange,required,dangerTag,rows,inputLimit,disabled}) => {
  return (
   <>
      <div className="mb-3 add-product">
        <label className="form-label">{label} <span className="text-danger">{dangerTag}</span></label>
        <textarea type={type} name={name} className="form-control" value={value} onChange={onChange} required={required} rows={rows} disabled={disabled}/>
        <span className='form-label'>{inputLimit}</span>
      </div>
    </>

  )
}

export default InputTextArea