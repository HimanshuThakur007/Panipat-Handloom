import React, { useState } from 'react'
import Banner from '../../ReusableComponents/Banner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderTag from '../../ReusableComponents/HeaderTag';
import ProductCard from '../../ReusableComponents/Productcard';
import SubcategoryCard from '../../ReusableComponents/SubcategoryCard';

const Productpage = () => {
    const { subcatId } = useParams();
    const [productcount, setProductCount] = useState(0)
    const navigate = useNavigate()
    const productMainData = useSelector((state) => state.product_list);
  
    const selectedSubCategories = productMainData?.filter(
      (category) => category?.subCategoryName === subcatId 
    );

    const totalProductCount = selectedSubCategories?.length || 0;

    console.log("selectedSubCategories",selectedSubCategories)
    // const uniquesubCategories = Array?.from(
    //   new Map(selectedSubCategories?.map((category) => [category.subCategoryName, category])).values()
    // );

    // console.log(uniquesubCategories,'uniquesubCategories')
    const productCountBySubCategory = selectedSubCategories?.reduce((acc, category) => {
      // category.productMainData?.forEach((product) => {
        const subCatName = category.subCategoryName; 
        acc[subCatName] = (acc[subCatName] || 0) + 1; 
      // });
      return acc;
    }, {});
    console.log(productCountBySubCategory ,'productCountBySubCategory ')

    const handlTypeClick = (code) => {
        console.log("code", code);
        navigate(`/pos/productdetail/${code}`);
      };
  
  return (
    <div className="page-wrapper pos-pg-wrapper ms-0 mt-4">
    <div className="content pos-design p-0">
      <div className="row align-items-start pos-wrapper">
        <div className="col-md-12 col-lg-12">
          {/* Full-width banner */}
          {/* <Banner imgSrc="/assets/img/product/blinds_for_windows.jpg"/> */}

          {/* Subcategory section */}
          <div className="pos-categories tabs_wrapper">
            <HeaderTag headTitle="Products...." />
            <p className='text-end'>Showing <b>{totalProductCount}</b> products</p>
            <hr />
            <div className="row">
              {selectedSubCategories && selectedSubCategories.length > 0 ? (
                selectedSubCategories.map((subcategory) => {
                  const imgArr = subcategory.imageInfo[0]?.base64

                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3"
                      key={subcategory.code} 
                      style={{ cursor: 'pointer' }}
                      onClick={()=>handlTypeClick(subcategory.code)}
                    >
                      <div className="d-flex flex-column align-items-center">
                        {/* Display the subcategory card */}
                        {/* <ProductCard brand={subcategory.name} image={imgArr}/> */}
                        <SubcategoryCard
                          name={subcategory.name}
                          btnName="Select Product"
                          imageSrc={imgArr}
                        />
                         <h6 className="card-title mt-2 text-center">
                          {subcategory.name}
                        </h6>
                        {/*<span className="text-muted">
                          ({productCount} Products)
                        </span> */}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center">
                  <p>No products available for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Productpage