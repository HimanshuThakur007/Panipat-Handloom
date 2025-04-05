/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import {
  RefreshCcw,
  RotateCw,
  ShoppingCart,
} from "feather-icons-react/build/IconComponents";
import {
  Check,
  CheckCircle,
  Edit,
  MoreVertical,
  Trash2,
  UserPlus,
} from "react-feather";
import Select from "react-select";
import PlusCircle from "feather-icons-react/build/IconComponents/PlusCircle";
import MinusCircle from "feather-icons-react/build/IconComponents/MinusCircle";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import CategoryCard from "../../ReusableComponents/CategoryCard";
import HeaderTag from "../../ReusableComponents/HeaderTag";
import Banner from "../../ReusableComponents/Banner";
import CarouselComponent from "../../ReusableComponents/CarouselComponent";

const Pos = () => {
  const navigate = useNavigate();
  const productMainData = useSelector((state) => state.product_list);
  console.log('productMainData',productMainData)
  const customers = [
    { value: "walkInCustomer", label: "Walk in Customer" },
    { value: "john", label: "John" },
    { value: "smith", label: "Smith" },
    { value: "ana", label: "Ana" },
    { value: "elza", label: "Elza" },
  ];
  const products = [
    { value: "walkInCustomer", label: "Walk in Customer" },
    { value: "john", label: "John" },
    { value: "smith", label: "Smith" },
    { value: "ana", label: "Ana" },
    { value: "elza", label: "Elza" },
  ];
  const gst = [
    { value: "5", label: "GST 5%" },
    { value: "10", label: "GST 10%" },
    { value: "15", label: "GST 15%" },
    { value: "20", label: "GST 20%" },
    { value: "25", label: "GST 25%" },
    { value: "30", label: "GST 30%" },
  ];
  const shipping = [
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
    { value: "30", label: "30" },
  ];
  const discount = [
    { value: "10", label: "10%" },
    { value: "15", label: "15%" },
    { value: "20", label: "20%" },
    { value: "25", label: "25%" },
    { value: "30", label: "30%" },
  ];
  const tax = [
    { value: "exclusive", label: "Exclusive" },
    { value: "inclusive", label: "Inclusive" },
  ];
  const discounttype = [
    { value: "percentage", label: "Percentage" },
    { value: "earlyPaymentDiscounts", label: "Early payment discounts" },
  ];
  const units = [
    { value: "kilogram", label: "Kilogram" },
    { value: "grams", label: "Grams" },
  ];
  const [quantity, setQuantity] = useState(4);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const [quantity1, setQuantity1] = useState(3);

  const handleDecrement1 = () => {
    if (quantity1 > 1) {
      setQuantity1(quantity1 - 1);
    }
  };

  const handleIncrement1 = () => {
    setQuantity1(quantity1 + 1);
  };
  const [quantity2, setQuantity2] = useState(3);

  const handleDecrement2 = () => {
    if (quantity2 > 1) {
      setQuantity2(quantity2 - 1);
    }
  };

  const handleIncrement2 = () => {
    setQuantity2(quantity2 + 1);
  };
  const [quantity3, setQuantity3] = useState(1);

  const handleDecrement3 = () => {
    if (quantity3 > 1) {
      setQuantity3(quantity3 - 1);
    }
  };

  const handleIncrement3 = () => {
    setQuantity3(quantity3 + 1);
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );

  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 5,
    margin: 0,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  const uniqueCategories = Array?.from(
    new Map(
      productMainData?.map((category) => [category.categoryName, category])
    ).values()
  );
  const filteredProducts = productMainData?.filter(product => product.categoryName === "WALL DECOR");

  const uniqueBrand = Array.from(
    new Map(
      filteredProducts?.map((brand) => [brand.brandName, brand])
    ).values()
  );
  console.log(uniqueBrand,'uqbrand')
  const handleCardClick = (categoryName) => {
    console.log("categoryId", categoryName);
    navigate(`subcategory/${categoryName}`);
  };
  return (
    <div>
      <div className="page-wrapper pos-pg-wrapper ms-0 mt-4">
        <div className="content pos-design p-0">
          <div className="row align-items-start pos-wrapper">
            <div className="col-md-12 col-lg-12">
              {/* <Banner imgSrc="/assets/img/IMG_6143.jpg" /> */}
              <CarouselComponent/>
              <div className="pos-categories tabs_wrapper">
                <HeaderTag headTitle="Shop By Category" />
                <hr />
                <div className="row">
                  {uniqueCategories?.map((category, index) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-custom mb-3"
                      key={index}
                      onClick={() => handleCardClick(category.categoryName)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <CategoryCard
                          categoryName={category.categoryName}
                          imageSrc={category.catImg}
                        />
                        <h6 className="card-title mt-2 text-center">
                          {category.categoryName}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row align-items-start pos-wrapper">
            <div className="col-md-12 col-lg-12">
              <div className="pos-categories tabs_wrapper">
                <HeaderTag headTitle="Shop by Wallpaper Brands" />
                <hr />
                <div className="row">
                  {uniqueBrand?.map((category, index) => (
                    <div
                      className="col-sm-2 col-md-6 col-lg-2 col-xl-2 mb-4"
                      key={index}
                    >
                      <div className="d-flex flex-column align-items-center">
                        {" "}
                        <CategoryCard
                          categoryName={category.brandName}
                          imageSrc={category.subCatImg}
                        />
                        <h6 className="card-title mt-0 text-center">
                          {category.brandName}
                        </h6>{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Pos;
