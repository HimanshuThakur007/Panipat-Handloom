/* eslint-disable react/prop-types */
import React,{useState,useEffect} from 'react'
import AddUsers from '../../modals/usermanagement/addusers';
import useFetch from '../../../Hooks/useFetch'
import ReactToast, { showToastError, showToastMessage } from '../../../ReusableComponents/ReactToast';
import { all_routes } from '../../../Router/all_routes';
import { useNavigate } from 'react-router-dom';

const   AddUsersPage = ({userID,resetHandler,setUserCode,GetUserData}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeField, setActiveField] = useState(null);
    const [roleSelect, setRoleselect] = useState(null);
    const [formData, setFormData] = useState({
        UserName: '',
        Mobile: '',
        EmailID: '',
        Password: '',
        confirmPassword: '',
        Description: '',
    });
    const callFetch = useFetch()
    const navigate = useNavigate()
    const route = all_routes
    const getsessionData = JSON.parse(sessionStorage.getItem('encryptedData'));
  // console.log(getsessionData,"getSessionData")
  let UserType = getsessionData?.userType;
    const status = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Back-Office' },
        { value: 3, label: 'Sales-Man'}
    ];
//     useEffect(()=>{
//        console.log('fromModel',userID)

//    },[userID])
    const handleImageConverted = (base64Data) => {
        setImagePath(base64Data)
      };

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleConfirmPassword = () => {
        setConfirmPassword((prevShowPassword) => !prevShowPassword);
    };
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const {UserName,Mobile,EmailID,Password,confirmPassword,Description} = formData

    const handleSelectChange = (selectedOption) => {
        setRoleselect(selectedOption)
    };

    const modifyHandler = async () => {
        let url = `/api/GetUserMaster?ID=${userID}`;
        // console.log('modify',url)
          try {
              const { res, got } = await callFetch(url, 'GET');
              // Handle response data
              if(res.status == 200){
                let modifyData = got.data
                // console.log("modDta",modifyData)
                setFormData({
                    UserName: modifyData.userName,
                    Mobile: modifyData.mobile,
                    EmailID: modifyData.emailID,
                    Password: modifyData.password,
                    confirmPassword: modifyData.password,
                    Description: modifyData.description,
                })
                let decodedString = modifyData.base64;
                const prefixedBase64Data = `data:image/jpeg;base64,${decodedString}`;
                // console.log('decode',prefixedBase64Data)
                // handleImageConverted(decodedString)
                setImagePath(prefixedBase64Data)
                setRoleselect({label:modifyData.role, value:modifyData.roleID})
              }
              console.log('GET Response Modify:', got.msg);
          } catch (error) {
              // Handle errors
              console.error('Error:', error);
          }
      };
   // Example of making a GET request
   useEffect(() => {
    if(userID !=0){
        modifyHandler();
    }
}, [userID]);

// Example of making a POST request
const handleSaveUser = async (e) => {
    e.preventDefault()
    const cleanedBase64Data = imagePath.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  const requestBody = {
    Id: userID||0,
    UserType: UserType,
    UserName,
    Mobile,
    EmailID,
    Password,
    Description,
    Role:roleSelect!=null?roleSelect.value:0,
    Deactivate:0,
    Base64: cleanedBase64Data||''
  };
  // console.log('userJson', JSON.stringify(requestBody))
  let saveurl = `/api/SaveUserMaster`;
  if (validateForm()) {
    
  if (Password !== confirmPassword) {
    showToastError('Password and Confirm Password do not match.');
    return;
  }
  try {
    const { res, got } = await callFetch(saveurl, "POST", requestBody);
    if (res.status == 200) {
        showToastMessage(got.msg);
        setFormData({
            UserName: '',
            Mobile: '',
            EmailID: '',
            Password: '',
            confirmPassword: '',
            Description: ''
        })
        setRoleselect(null)
        setImagePath('')
        GetUserData()
        setUserCode(0)
        // navigate(route.dashboard)
    } else {
      showToastError(got.msg);
    }
    // Handle response data
    console.log("POST Response:", got);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }}else{
    showToastError("Validation Failed")
  }
};
const validateForm = () => {
  const newErrors = {};
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


  if (!formData.UserName.trim()) {
    newErrors.UserName = "Name is required";
  } else if (formData.UserName.trim().length < 2) {
    newErrors.UserName = "Name should have at least 2 letters";
  }

  if (!formData.Mobile) {
    newErrors.Mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.Mobile)) {
    newErrors.Mobile = "Mobile number must be 10 digits";
  }

  if (!formData.EmailID) {
    newErrors.EmailID = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.EmailID)) {
    newErrors.EmailID = "Invalid email address";
  }

  if (!passwordPattern.test(formData.Password)) {
    newErrors.Password = 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.';
}


  if (Password !== confirmPassword) {
    showToastError('Password and Confirm Password do not match.');
    return;
  }

  setErrors(newErrors);
  // console.log(newErrors);
  return Object.keys(newErrors).length === 0;
};
// console.log("imgbase",imagePath)

const resetField = () =>{
    setFormData({
        UserName: '',
        Mobile: '',
        EmailID: '',
        Password: '',
        confirmPassword: '',
        Description: ''
    })
    setUserCode(0)
    setRoleselect(null)
    setImagePath('')
    setErrors({})
}
React.useEffect(()=>{
    resetHandler(resetField)
    },[])
  return (
    <>
    <ReactToast/>
    <AddUsers
    route={route}
    navigate={navigate}
    handleImageConverted={handleImageConverted}
    showPassword={showPassword}
    handleTogglePassword={handleTogglePassword}
    showConfirmPassword={showConfirmPassword}
    handleToggleConfirmPassword={handleToggleConfirmPassword}
    status={status}
    handleInputChange={handleInputChange}
    formData={formData}
    roleSelect={roleSelect}
    handleSelectChange={handleSelectChange}
    handleSaveUser={handleSaveUser}
    imagePath={imagePath}
    errors={errors}
    activeField={activeField}
    />
    </>
  )
}

export default AddUsersPage