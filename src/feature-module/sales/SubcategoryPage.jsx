import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderTag from '../../ReusableComponents/HeaderTag';
import CategoryCard from '../../ReusableComponents/CategoryCard';
import SubcategoryCard from '../../ReusableComponents/SubcategoryCard';
import Banner from '../../ReusableComponents/Banner';

const SubcategoryPage = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const productMainData = useSelector((state) => state.product_list);
  const navigate = useNavigate()

  // Find all categories that match the categoryId
  const selectedCategories = productMainData?.filter(
    (category) => category?.categoryName === categoryId 
  );
  const uniquesubCategories = Array?.from(
    new Map(selectedCategories?.map((category) => [category.subCategoryName, category])).values()
  );
  const productCountBySubCategory = selectedCategories?.reduce((acc, category) => {
    // category.productMainData?.forEach((product) => {
      const subCatName = category.subCategoryName; 
      acc[subCatName] = (acc[subCatName] || 0) + 1; 
    // });
    return acc;
  }, {});
  console.log(productCountBySubCategory ,'productCountBySubCategory ')

  const handleCardClick = (subcatName) => {
    console.log("subcategoryId", subcatName);
    navigate(`/pos/productpage/${subcatName}`);
  };
  // Log the selected categories
  console.log(uniquesubCategories, 'sel');
  return (
    <div className="page-wrapper pos-pg-wrapper ms-0 mt-4">
    <div className="content pos-design p-0">
      <div className="row align-items-start pos-wrapper">
        <div className="col-md-12 col-lg-12">
          {/* Full-width banner */}
          {/* <div className="banner-container mb-4">
            <img 
              src="/assets/img/product/blinds_for_windows.jpg" 
              alt="Category Banner"
              className="img-fluid w-100"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div> */}
          <Banner imgSrc="/assets/img/product/blinds_for_windows.jpg"/>

          {/* Subcategory section */}
          <div className="pos-categories tabs_wrapper">
            <HeaderTag headTitle="Shop By Category...." />
            <p className='text-end'>Showing <b>{uniquesubCategories.length}</b> Categories</p>
            <hr />
            <div className="row">
              {uniquesubCategories && uniquesubCategories.length > 0 ? (
                uniquesubCategories.map((subcategory) => {
                  const productCount = productCountBySubCategory[subcategory.subCategoryName] || 0;
                    console.log('subCategory from map', subcategory)
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3"
                      key={subcategory.code} 
                      style={{ cursor: 'pointer' }}
                      onClick={()=>handleCardClick(subcategory.subCategoryName)}
                    >
                      <div className="d-flex flex-column align-items-center">
                        {/* Display the subcategory card */}
                        <SubcategoryCard
                          name={subcategory.subCategoryName}
                          imageSrc={subcategory.subCatImg} // Ensure this matches your data structure
                        />
                        <h6 className="card-title mt-2 text-center">
                          {subcategory.subCategoryName}
                        </h6>
                        <span className="text-muted">
                          ({productCount} Products)
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center">
                  <p>No subcategories available for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SubcategoryPage;
