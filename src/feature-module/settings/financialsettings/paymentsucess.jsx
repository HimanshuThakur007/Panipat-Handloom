import React from 'react'
import { useLocation } from 'react-router-dom'

var Mydata =''
const PaymentSucess = () => {
    const location = useLocation()
    if(location.state !== null && location.state !== undefined){
        Mydata = location.state.ldata
        console.log('ddd',Mydata)
    }
  return (
    <div className="page-wrapper">
      <div className="content">
                <div className="" dangerouslySetInnerHTML={{ __html: Mydata }} />
        </div>
        </div>
  )
}

export default PaymentSucess