import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SubcategoryCard from "../../ReusableComponents/SubcategoryCard";
import Header from "../../InitialPage/Sidebar/Header";
import HeaderTag from "../../ReusableComponents/HeaderTag";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productMainData = useSelector((state) => state.product_list);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = new URLSearchParams(location.search).get("query");
  console.log(query, "query");

  useEffect(() => {
    if (query) {
      const filtered = productMainData?.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, productMainData]);

  const handlTypeClick = (code) => {
    navigate(`/pos/productdetail/${code}`);
  };

  return (
    <div className="page-wrapper pos-pg-wrapper ms-0 mt-5">
      <div className="content pos-design p-0">
        <div className="container mt-3">
          {/* <h2>Search Results for {query}</h2>
           */}
          <div className="row">
            <HeaderTag headTitle={`Search Results for ${query}`} />
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3"
                  key={product.code}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlTypeClick(product.code)}
                >
                  <div className="d-flex flex-column align-items-center">
                    <SubcategoryCard
                      name={product.name}
                      btnName="Select Product"
                      imageSrc={product.imageInfo[0]?.base64}
                    />
                    <h6 className="card-title mt-2 text-center">
                      {product.name}
                    </h6>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found for your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
