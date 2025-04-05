import React, { useState } from 'react';
import './ProductDetail.css'; // Custom CSS for additional styling if needed
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderTag from '../../ReusableComponents/HeaderTag';
import { Descriptions } from 'antd';

const ProductDetails = () => {
  const { prodId } = useParams();
  const productMainData = useSelector((state) => state.product_list);
  
  // Filter selected product based on prodId
  let selectedProduct = productMainData?.find((product) => product?.code == prodId);
  console.log('selectedprod',selectedProduct)

  const [selectedImage, setSelectedImage] = useState('');

  React.useEffect(() => {
    // Set the initial image when selectedProduct changes
    if (selectedProduct) {
      setSelectedImage(selectedProduct.imageInfo[0]?.base64 || '');
    }
  }, [selectedProduct]);
  return (
    <div className="page-wrapper pos-pg-wrapper ms-0 mt-5">
      <div className="content pos-design p-0">
        <div className="container product-detail-page">
          <div className="row">
            {/* Left Section: Product Image */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="product-image">
                <img src={selectedImage} alt="Vista Cellular Blind" className="img-fluid main-product-image" />
              </div>
              <div className="thumbnail-images d-flex mt-3">
                {/* Map over the images array and display each image */}
                {selectedProduct?.imageInfo?.map((image, index) => (
                  <div key={index} className="variant-image me-2">
                    <img
                      src={image.base64}
                      alt={`Variant ${index}`}
                      className="img-fluid thumbnail"
                      onClick={() => setSelectedImage(image.base64)}
                      style={{ cursor: 'pointer', border: selectedImage === image.base64 ? '2px solid #6c0ba9' : '1px solid #ddd' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Product Info */}
            <div className="col-lg-6 col-md-6 col-sm-12">
            <HeaderTag headTitle={selectedProduct?.name || 'Vista Cellular Blind For Windows'} />
              {/* <h1 className="product-title">{selectedProduct?.name || 'Vista Cellular Blind For Windows'}</h1> */}
              <p className="rating">(Best Rated)</p>

              <div className="product-meta">
                <p><strong>Category:</strong> {selectedProduct?.categoryName || 'Cellular Window Blinds'}</p>
                <p><strong>Brand:</strong> {selectedProduct?.brandName || ''}</p>
              </div>

              {/* Availability Button */}
              <button className="btn btn-dark btn-check-availability mt-3">Check Availability</button>

              {/* Shipping Details */}
              {/* <div className="shipping-details mt-4">
                <p><strong>Estimated Delivery:</strong> 10 - 17 Aug, 2024</p>
                <p><strong>Free Shipping & Returns:</strong> On all orders over ₹999.00</p>
              </div> */}

              {/* Payment Methods */}
              {/* <div className="payment-methods mt-3">
                <img src="path_to_payment_method_image" alt="Payment Methods" className="img-fluid" />
              </div> */}
            </div>
          </div>
        </div>

        <div className="container product-detail-page">
      {/* Product Description Section */}
      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" style={{color:"grey"}}>
                <span>Description</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="additional-info-tab" data-bs-toggle="tab" data-bs-target="#additional-info" type="button" role="tab" style={{color:"grey"}}>
                Additional Information
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" style={{color:"grey"}}>
                Reviews (0)
              </button>
            </li> */}
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link" id="vendor-info-tab" data-bs-toggle="tab" data-bs-target="#vendor-info" type="button" role="tab" style={{color:"grey"}}>
                Vendor Info
              </button>
            </li> */}
          </ul>

          <div className="tab-content mt-3" id="myTabContent">
            <div className="tab-pane fade show active" id="description" role="tabpanel">
              <p className=''><em>{selectedProduct?.description}</em></p>
            </div>

            {/* Additional Tabs content (empty for now) */}
            <div className="tab-pane fade" id="additional-info" role="tabpanel">
            <ul className="additional-info-list">
                    {selectedProduct?.addInfo?.map((item) => (
                      <li key={item.srNo}>
                        <strong>{item.head} - </strong> {item.description}
                      </li>
                    ))}
                  </ul>
            </div>
            {/* <div className="tab-pane fade" id="reviews" role="tabpanel"></div>
            <div className="tab-pane fade" id="vendor-info" role="tabpanel"></div> */}
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ProductDetails;
