/* eslint-disable react/prop-types */
import React,{useState,useEffect} from 'react'
import CustomerModal from '../../modals/peoples/customerModal'
import useFetch from '../../../Hooks/useFetch';
import ReactToast, { showToastError, showToastMessage } from '../../../ReusableComponents/ReactToast';
import $ from 'jquery';
import { all_routes } from '../../../Router/all_routes';
import { useNavigate } from 'react-router-dom';
import { label } from 'yet-another-react-lightbox';

const CustomermodalPage = ({resetHandler,customerCode,customerDataHandler,setCustomerCode, id}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false)
  const [countrySelect, setCountrySelect] = useState(null);
  const [stateSelect, setStateSelect] = useState(null);
  const [formData, setFormData] = useState({
      Name: '',
      CompanyName:'',
      Address:'',
      Mobile: '',
      EmailID: '',
      GSTN:'',
      PAN:'',
      City:'',
      Description: '',
      // Password: '',
  });
  const callFetch = useFetch()
  const route = all_routes
  const navigate = useNavigate()

//     useEffect(()=>{
//        console.log('fromModel',userID)

//    },[userID])
  const handleImageConverted = (base64Data) => {
      // let base64String = base64Data;
      // base64String = base64String.substring(base64String.indexOf(',') + 1);
      // console.log("Base64 image:", base64String);
      setImagePath(base64Data)
    };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'Mobile' && value.length > 10) {
        showToastError('Mobile number cannot exceed 10 digits.');
        return;
      }
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const {Name,CustomerName,Address,Mobile,EmailID,GSTN,PAN,City,Description} = formData
  const companyDisplayName = `${Name} - ${Mobile}`;
  // ================api call for country,state, city=================================

  const getCountryHandler = async () => {
    const apiUrl = `/api/GetMaster?MasterType=1&ParentID=0`;
    try {
      setLoading(true)
      const { res, got } = await callFetch(apiUrl, 'GET');
      // Handle response data
      if(res.status == 200){
        let countryData = got.data.map((item)=>({
          value:item.code,
          label:item.name
        }))
        setCountryData(countryData)
      }
      setLoading(false)
      // console.log('GET country:', got);
  } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setLoading(false)
  }
  };
  const getStateHandler = async (cid) => {
    const apiUrl = `/api/GetMaster?MasterType=2&ParentID=${cid}`;
    console.log(apiUrl,'url state')
    try {
      setLoading(true)
      const { res, got } = await callFetch(apiUrl, 'GET');
      // Handle response data
      if(res.status == 200){
        let stateData = got.data.map((item)=>({
          value:item.code,
          label:item.name
        }))
        setStateData(stateData)
      }
      setLoading(false)
      // console.log('GET country:', got);
  } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setLoading(false)
  }
  };

  React.useEffect(()=>{
    getCountryHandler()
  },[])

  const handleCountrySelectChange = (selectedOption) => {
    let cid = selectedOption?.value||0
    setCountrySelect(selectedOption)
    getStateHandler(cid)
  };
  const handleStateSelectChange = (selectedOption) => {

    setStateSelect(selectedOption)
   
  };



  const modifyHandler = async () => {
      let url = `/api/GetCustomerMaster?MasterCode=${customerCode}`;
      setLoading(true)
        try {
            const { res, got } = await callFetch(url, 'GET');
            // Handle response data
            if(res.status == 200){
              let modifyData = got.data
              console.log("modDta",modifyData)
              setFormData({
                Name: modifyData.name,
                CompanyName:modifyData.companyName,
                Address:modifyData.address,
                Mobile: modifyData.mobile,
                EmailID: modifyData.emailID,
                GSTN: modifyData.gstn,
                PAN: modifyData.pan,
                City:modifyData.city,
                Description: modifyData.description,
              })
              let decodedString = modifyData.base64;
              const prefixedBase64Data = `data:image/jpeg;base64,${decodedString}`;
              // console.log('decode',decodedString)
              setImagePath(prefixedBase64Data)
              setCountrySelect({label:modifyData.countryName, value:modifyData.country})
              setStateSelect({label: modifyData.stateName, value: modifyData.state})
            }
            setLoading(false)
            console.log('GET Response Modify:', got);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            setLoading(false)
        }
    };

 useEffect(() => {
  if(customerCode !=0){

      modifyHandler();
  }
}, [customerCode]);


const handleSaveCustomer = async (e) => {
  e.preventDefault()
  const cleanedBase64Data = imagePath.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
const requestBody = {
  MasterType: parseInt(id) ,
  Id: customerCode||0,
  Name,
  CompanyName: companyDisplayName ||'',
  Address,
  Mobile,
  EmailID: EmailID ||"" ,
  GSTN,
  PAN,
  City,
  // Password,
  Description,
  Country:countrySelect!=null?countrySelect.value:0,
  State: stateSelect?.value || 0,
  Base64: cleanedBase64Data||'',
  IsApproved:1
};
console.log('customerJson', JSON.stringify(requestBody))
let saveurl = `/api/SaveCustomer`;
// customerDataHandler()
try {
  setLoading(true)
  const { res, got } = await callFetch(saveurl, "POST", requestBody);
  if (res.status == 200) {
      showToastMessage(got.msg);
      setFormData({
        Name: '',
        CompanyName:'',
        Address:'',
        Mobile: '',
        EmailID: '',
        GSTN:'',
        PAN:'',
        City:'',
        Description: '',
      })
      setCountrySelect(null)
      setStateSelect(null)
      setImagePath('')
      setCustomerCode(0)
      customerDataHandler()
      // navigate(route.dashboard)
  } else {
    showToastError(got.msg);
    setLoading(false)
  }
  setLoading(false)

} catch (error) {
  console.error("Error:", error);
  setLoading(false)
}
};

// console.log("imgbase",imagePath)

const resetField = () =>{
  setFormData({
    Name: '',
    CompanyName:'',
    Address:'',
    Mobile: '',
    EmailID: '',
    GSTN:'',
    PAN:'',
    City:'',
    Description: '',
    Password: '',
  })
  setCountrySelect(null)
  setStateSelect(null)
  setImagePath('')
  setCustomerCode(0)
}
React.useEffect(()=>{
  resetHandler(resetField)
  },[])
  return (
  <>
    <ReactToast/>
    <CustomerModal
    showPassword={showPassword}
    handleImageConverted={handleImageConverted}
    id ={id}
    // formData={formData}
    formData={{
      ...formData,
      CompanyName: companyDisplayName 
    }}
    handleInputChange={handleInputChange}
    countrySelect={countrySelect}
    handleCountrySelectChange={handleCountrySelectChange}
    handleSaveCustomer={handleSaveCustomer}
    imagePath={imagePath}
    countryData={countryData}
    handleTogglePassword={handleTogglePassword}
    loading={loading}
    stateSelect={stateSelect}
    handleStateSelectChange={handleStateSelectChange}
    stateData={stateData}
    />
    </>
  )
}

export default CustomermodalPage