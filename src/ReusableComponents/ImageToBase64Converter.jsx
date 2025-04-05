/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { PlusCircle } from 'feather-icons-react/build/IconComponents'

const ImageToBase64Converter = ({ onImageConverted, imagePath }) => {
  const [base64Image, setBase64Image] = useState(imagePath||"");

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
      onImageConverted(reader.result); // Pass the base64 image to the parent component
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
useEffect(()=>{
  setBase64Image(imagePath||'')
},[imagePath])

  return (
    <>
      <div className="new-employee-field">
        <span>Avatar</span>
        <div className="profile-pic-upload mb-2">
          <div className="profile-pic" >
            {base64Image ? (
              <img src={base64Image} alt="Profile" className="object-fit-cover" style={{height:'16vh'}}/>
            ) : (
              <>
                <PlusCircle className="plus-down-add" />
                <span>Photo</span>
              </>
            )}
          </div>
          <div className="input-blocks mb-0">
            <div className="image-upload mb-0">
              <input type="file" onChange={handleImageInputChange}/>
              <div className="image-uploads">
                <h4>Change Image</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageToBase64Converter;
