import React, { useEffect, useState } from 'react';
import { List, X } from 'feather-icons-react/build/IconComponents';
import { IoCaretDown, IoExitOutline } from 'react-icons/io5';
import './SalesNavBar.css'; // Include your custom CSS file
import useFetch from '../../Hooks/useFetch';
import { set_product_list } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const SalesNavBar = () => {
    let callFetch = useFetch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const productMainData = useSelector((state) => state.product_list);

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            console.log('Please enter a search term');
            return;
        }
        
        const filteredProducts = productMainData.filter((product) => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        navigate(`search?query=${searchTerm}`);
 
        console.log('Filtered Products:', filteredProducts);
    };
    // Fetch product data
    const GetProductData = async () => {
        let url = `/api/GetProductMasterListWithImg`;
        try {
            setLoading(true);
            const { res, got } = await callFetch(url, 'GET');
            if (res.status === 200) {
                let alldata = got.data;
                dispatch(set_product_list(alldata));
            }
            setLoading(false);
            console.log('GET Response:', got);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        GetProductData();
    }, []);

    const categoryMap = {};
    productMainData?.forEach((product) => {
        if (!categoryMap[product.categoryName]) {
            categoryMap[product.categoryName] = new Set();
        }
        categoryMap[product.categoryName].add(product.subCategoryName);
    });

    const categoryArray = Object.keys(categoryMap).map((categoryName) => ({
        categoryName,
        subCategories: Array.from(categoryMap[categoryName]),
    }));

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue) {
            handleCardClick(selectedValue);
        }
    };

    const handleCardClick = (categoryName) => {
        console.log("categoryId", categoryName);
        navigate(`subcategory/${categoryName}`);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleTypeClick =(type)=>{
      console.log(type)
      navigate(`/pos/productpage/${type}`);
    }

    // const handleProductClick = (subcatName) => {
    //   console.log("subcategoryId", subcatName);
    //   navigate(`/pos/productpage/${subcatName}`);
    // };
    const chunkArray = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };
    return (
      <>
        {/* Top Logo and Search Bar - Hidden on small screens */}
        <div className="header-bar bg-white py-2 border-bottom">
          <div className="container d-flex justify-content-between align-items-center">
            <Link to="/pos" className="logo">
              <img
                src="/assets/img/panipatlogo.png"
                alt="Company Logo"
                style={{ height: "50px" }}
              />
            </Link>
            <div className="w-100 d-flex justify-content-center">
              <div className="input-group search-group w-50">
                {/* Category Dropdown */}
                <div className="input-group-prepend">
                  <select
                    className="form-select"
                    aria-label="Category select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {categoryArray.map((category, index) => (
                      <option key={index} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Search Input */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                {/* Search Button */}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <Link to="/" className="">
              {/* Exit */}
              <IoExitOutline
                size={20}
                data-tooltip-id="exit-tooltip"
                data-tooltip-content="Click here to exit from catalogue"
              />
            </Link>

            <Tooltip id="exit-tooltip" />
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="top-nav-menu bg-white border-bottom d-none d-lg-block">
          <div className="container">
            <ul className="nav1">
              {categoryArray.map((category, index) => (
                <li
                  className="nav-item1 dropdown"
                  key={index}
                  onMouseEnter={() => setOpenDropdown(index)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a className="nav-link">
                    {category.categoryName} <IoCaretDown />
                  </a>
                  <div
                    className={`dropdown-menu ${
                      openDropdown === index ? "show" : ""
                    }`}
                    // style={{
                    //   position: "absolute",
                    //   top: "98%",
                    //   left: "0",
                    //   width: "100vw",
                    //   backgroundColor: "white",
                    //   border: "none",
                    //   padding: "20px",
                    //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    //   justifyContent: "space-between",
                    // }}
                    style={{
                      position: "fixed", 
                      top: "13%",
                      left: "0",
                      right: "0",
                      width: "100vw",
                      backgroundColor: "white",
                      border: "none",
                      padding: "20px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      zIndex: 9999,
                      justifyContent: "space-between",
                    }}
                  >
                    {category.subCategories.map((subCategory, subIndex) => (
                      <a
                        key={subIndex}
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleTypeClick(subCategory)}
                      >
                        {subCategory}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="d-lg-none p-2">
          <button className="btn" onClick={toggleDrawer}>
            {isDrawerOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>
          <div className="drawer-header d-flex justify-content-between p-3">
            <div className="logo">
              <img
                src="/assets/img/panipatlogo.png"
                alt="Company Logo"
                style={{ height: "40px" }}
              />
            </div>
            <button className="btn" onClick={toggleDrawer}>
              <X size={24} />
            </button>
          </div>
          <div className="drawer-body">
            <ul className="list-group">
              {categoryArray.map((category, index) => (
                <li key={index} className="list-group-item">
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="d-flex justify-content-between align-items-center"
                  >
                    {category.categoryName} <IoCaretDown />
                  </div>
                  <div
                    className={`sub-menu ${
                      openDropdown === index ? "d-block" : "d-none"
                    }`}
                  >
                    {category.subCategories.map((subCategory, subIndex) => (
                      <div
                        key={subIndex}
                        className="sub-menu-item"
                        onClick={() => handleTypeClick(subCategory)}
                      >
                        {subCategory}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
};

export default SalesNavBar;
