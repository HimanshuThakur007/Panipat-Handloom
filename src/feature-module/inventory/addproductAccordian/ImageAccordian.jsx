/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, PlusCircle, X } from "feather-icons-react/build/IconComponents";

const ImageAccordian = ({
  setSelectedImagesData,selectedImagesData,modifyId
}) => {
  const [selectedImages, setSelectedImages] = useState([]);

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   let counter = selectedImages.length + 1
  //   files.map((file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const imageData = {
  //         Code: modifyId || 0,
  //         SrNo: counter++,
  //         FileName: file.name,
  //         FileExt: file.name.split(".").pop(),
  //         Base64: reader.result,
  //       };
  //       setSelectedImages((prevImages) => [...prevImages, imageData]);
  //       setSelectedImagesData((prevSelectedImagesData) => [...prevSelectedImagesData, imageData]);
  //     };
  //   });
  // };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let counter = selectedImages.length + 1;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = {
          Code: modifyId || 0,
          SrNo: counter++,
          FileName: file.name,
          FileExt: file.name.split(".").pop(),
          Base64: reader.result,
        };
        setSelectedImages((prevImages) => [...prevImages, imageData]);
        setSelectedImagesData((prevSelectedImagesData) => [...prevSelectedImagesData, imageData]);
      };
    });
  };
  

  React.useEffect(()=>{
    setSelectedImages(selectedImagesData)
    setSelectedImagesData(selectedImagesData)

  },[selectedImagesData,modifyId])

  const handleRemoveProduct = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((img, i) => i !== index));
    setSelectedImagesData((prevSelectedImagesData) => prevSelectedImagesData.filter((img, i) => i !== index));
  };

  // console.log('selectedImage',selectedImages)


  return (
    <>
      <div className="accordion-card-one accordion" id="accordionExample3">
        <div className="accordion-item">
          <div className="accordion-header" id="headingThree">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-controls="collapseThree"
            >
              <div className="addproduct-icon list">
                <h5>
                  <i data-feather="image" className="add-info" />
                  <span>Images</span>
                </h5>
                <Link to="#">
                  <ChevronDown className="chevron-down-add" />
                </Link>
              </div>
            </div>
          </div>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample3"
          >
            <div className="accordion-body">
              <div className="text-editor add-list add">
                <div className="col-lg-12">
                  <div className="add-choosen">
                    <div className="input-blocks">
                      <div className="image-upload">
                        <input
                          multiple
                          type="file"
                          onChange={handleImageChange}
                        />
                        <div className="image-uploads">
                          <PlusCircle className="plus-down-add me-0" />
                          <h4>Add Images</h4>
                        </div>
                      </div>
                    </div>
                    {selectedImages.map((image, index) => (
                      <div className="phone-img" key={index}>
                        <img
                          src={image.Base64}
                          alt={`image_${index}`}
                          style={{height:'16vh'}}
                          className="object-fit-contain"
                        />
                        <a>
                          <X
                            className="x-square-add remove-product"
                            onClick={() => handleRemoveProduct(index)}
                          />
                        </a>
                      </div>
                    ))}
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

export default ImageAccordian;
