/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import AddProduct from "./addproduct";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../ReusableComponents/ReactToast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { all_routes } from "../../Router/all_routes";
import AdditionalInfoModal from "../../core/modals/inventory/additionalinformationmodal";
var Category = null;
var ProductType = null;
var SubCategory = null;
var Brand = null;
var Unit = 0;
var TaxType = 0;
var DiscType = 0;
var Store = 0;
var Warehouse = 0;
var Supplier =0;
var modifyId;
const AddProductPage = () => {
  // var modifyId;
  const callFetch = useFetch();
  const location = useLocation();
  const navigate = useNavigate();
  // if (location.state !== null && location.state !== undefined) {
  modifyId = location.state?.code;
  //   console.log("location modifyId", modifyId);
  // }

  let InitialMasterData = {
    // ---main form----
    Name: "",
    webName: "",
    pageNo: "",
    ItemCode: "",
    SkuCode: "",
    Slug: "",
    HSN: "",
    Description: "",
    expectedDelivery: "",
    Qty: 0,
    DiscValue: 0,
    PurcPrice: 0,
    SalePrice: 0,
    MRP: 0,
    MinSPrice: 0,
    MinLevelQty: 0,
    MaxLevelQty: 0,
    ROLevelQty: 0,
  };
  const [productInput, setProductInput] = useState(InitialMasterData);
  const [errors, setErrors] = useState({});
  const [masterInput, setMasterInput] = useState({
    category: "",
    unit: "",
    productType: "",
    subCategory: "",
    brand: "",
    tax: "",
    taxPer: "",
    store: "",
    warehouse: "",
    alias: "",
  });
  const [unit, setUnit] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [taxType, setTaxType] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [storeOption, setStoreOption] = useState([]);
  const [warehouseOption, setWarehouseOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImagesData, setSelectedImagesData] = useState([]);
  const [values, setValues] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [selectedProduct, setSelectedProduct] = React.useState({
    category: null,
    productType: null,
    subCategory: null,
    brand: null,
    unit: null,
    taxType: null,
    discType: null,
    store: null,
    warehouse: null,
    supplier:null
  });
  const [checkboxes, setCheckboxes] = useState({
    warranties: 0,
    manufacturer: 0,
    expiry: 0,
  });
  const [additionalField, setAdditionalField] = useState([]);
  const [dataSource, setDataSource] = useState([
    { SrNo: 1, head: "", description: "" },
    { SrNo: 2, head: "", description: "" },
    { SrNo: 3, head: "", description: "" },
    { SrNo: 4, head: "", description: "" },
  ]);
  const route = all_routes;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  const handleImageConverted = (base64Data) => {
    setImagePath(base64Data);
  };
  // ================================checkbox handler=====================================
  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: checkboxes[checkboxName] === 0 ? 1 : 0,
    });
  };
  // =====================================select-Handler=================================
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    let value = selectedOption !== null ? selectedOption.value : 0;
    if (selectName === "category") {
      Category = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "productType") {
      ProductType = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "subCategory") {
      SubCategory = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "brand") {
      Brand = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "taxType") {
      TaxType = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "unit") {
      Unit = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "discType") {
      DiscType = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "store") {
      Store = selectedOption !== null ? selectedOption.value : 0;
    } else if (selectName === "warehouse") {
      Warehouse = selectedOption !== null ? selectedOption.value : 0;
    }
     else if (selectName === "supplier") {
      Supplier = selectedOption !== null ? selectedOption.value : 0;
    }

    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));

    if (
      Category !== null &&
      ProductType !== null &&
      SubCategory !== null &&
      Brand !== null
    ) {
      getItemCode();
    }
  };

  // ============================master-Input=====================================
  // const handelProductInput = (e) => {
  //   const { name, value } = e.target;
  //   setProductInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
// Define fields expected to hold numeric values
const numericFields = ["SalePrice", "MRP", "MinSPrice", "Qty", "PurcPrice", "DiscValue", "MinLevelQty", "MaxLevelQty", "ROLevelQty"];


const handelProductInput = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;

  // Only parse if the field is numeric
  if (numericFields.includes(name)) {
    updatedValue = isNaN(parseFloat(value)) ? "" : parseFloat(value); 
  }

  // Temporarily store updated values for validation
  const updatedInputs = {
    ...productInput,
    [name]: updatedValue,
  };

  let newErrors = { ...errors };

  // validation for specific fields
  if (numericFields.includes(name)) {
    const salePrice = updatedInputs.SalePrice || 0; 
    const mrp = updatedInputs.MRP || 0;
    const minSPrice = updatedInputs.MinSPrice || 0;

    if (salePrice > mrp) {
      newErrors.SalePrice = "Sale Price cannot be greater than MRP.";
    } else if (salePrice < minSPrice) {
      newErrors.SalePrice = "Sale Price cannot be less than Minimum Sale Price.";
    } else {
      delete newErrors.SalePrice;
    }
  }

  setProductInput(updatedInputs); 
  setErrors(newErrors);
};

  
  
  const handelMasterInput = (e) => {
    const { name, value } = e.target;
    setMasterInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // =============================================Generate-ItemCode=======================================================
  const getItemCode = async () => {
    let url = `/api/GetItemCode?Id=${
      modifyId || 0
    }&ProductType=${ProductType}&Category=${Category}&Subcategory=${SubCategory}&Brand=${Brand}`;
    // console.log("getItemurl", url);
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let alldata = got.data[0];
        setProductInput((prev) => ({
          ...prev,
          ItemCode: alldata.itemCode,
        }));
        // console.log("itemCode-generate", got);
      }
      setLoading(false);
      // console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // ====================================Save-Master-Data================================
  const handleSaveMaster = async (e, val) => {
    e.preventDefault();
    const cleanedBase64Data = imagePath.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    if (masterInput?.alias?.length > 5) {
      showToastError("Alias cannot be more than 5 characters!");
      return;
    }
    const requestBody = {
      ID: 0,
      MasterType: parseInt(val),
      SubChild: values.subcat || 0,
      base64: cleanedBase64Data || "",
      Alias: masterInput.alias || "",
      TextPer: parseFloat(masterInput.taxPer || 0),
      Name:
        val == 8
          ? masterInput.unit
          : val == 4
          ? masterInput.category
          : val == 5
          ? masterInput.productType
          : val == 6
          ? masterInput.subCategory
          : val == 7
          ? masterInput.brand
          : val == 9
          ? masterInput.tax
          : val == 10
          ? masterInput.store
          : val == 11
          ? masterInput.warehouse
          : "",
      ParentID: val == 6 ? parseInt(Category) : 0,
    };
    // console.log("Masters-Json", JSON.stringify(requestBody));
    let saveurl = `/api/SaveMaster`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(saveurl, "POST", requestBody);
      if (res.status == 200) {
        showToastMessage(got.msg);
        setMasterInput({
          category: "",
          unit: "",
          productType: "",
          subCategory: "",
          brand: "",
          tax: "",
          taxPer: 0,
          alias: "",
        });
        setImagePath("");
        loadAllMaster();
      } else {
        showToastError(got.msg);
      }
      setLoading(false);
      // Handle response data
      // console.log("POST Response:", got);
    } catch (error) {
      // Handle errors
      setLoading(false);
      console.error("Error:", error);
    }
  };
  // =======================supplier-load========================
  const customerDataHandler = async () => {
      let customerurl = `/api/GetCustomerList?MasterType=2`;
      // console.log("customerUrl",customerurl)
      try {
        setLoading(true);
        const { res, got } = await callFetch(customerurl, "GET");
        // Handle response data
        if (res.status == 200) {
          let supplierData = got.data;
          let correctData = supplierData.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setSupplierData(correctData);
          //  showToastMessage(got.msg)
          // console.log("supplierData:", supplierData);
          // console.log('GET Response:', got);
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
        showToastError(error);
        setLoading(false);
      }
    };

  // ==============================All-MasterType-dropdownLoad============================
  const loadAllMaster = async () => {
    const fetchApi = [
      { apiUrl: `/api/GetMasterforOther?MasterType=4&ParentID=0` },
      { apiUrl: `/api/GetMasterforOther?MasterType=5&ParentID=0` },
      {
        // apiUrl: `/api/GetMasterforOther?MasterType=6&ParentID=${Category || 0}`,
        apiUrl: `/api/GetMasterforOther?MasterType=6&ParentID=0`,
      },
      { apiUrl: `/api/GetMasterforOther?MasterType=7&ParentID=0` },
      { apiUrl: `/api/GetMasterforOther?MasterType=8&ParentID=0` },
      { apiUrl: `/api/GetMasterforOther?MasterType=9&ParentID=0` },
      { apiUrl: `/api/GetMasterforOther?MasterType=10&ParentID=0` },
      { apiUrl: `/api/GetMasterforOther?MasterType=11&ParentID=0` },
    ];

    try {
      setLoading(true);
      const promises = fetchApi.map(async (item) => {
        const { res, got } = await callFetch(item.apiUrl, "GET");
        if (res.status === 200) {
          return [
            { value: 0, label: "N/A" },
            ...got.data.map((dataItem) => ({
              value: dataItem.code,
              label: dataItem.name,
            })),
          ];
        } else {
          setLoading(false);
          throw new Error(`Failed to fetch data from ${item.apiUrl}`);
        }
      });

      const masterDataArray = await Promise.all(promises);
      setCategory(masterDataArray[0]);
      setProduct(masterDataArray[1]);
      setSubcategory(masterDataArray[2]);
      setBrand(masterDataArray[3]);
      setUnit(masterDataArray[4]);
      setTaxType(masterDataArray[5]);
      setStoreOption(masterDataArray[6]);
      setWarehouseOption(masterDataArray[7]);
      // console.log("Master Data:", masterDataArray);
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
      Category = null;
      ProductType = null;
      SubCategory = null;
      Brand = null;
      Unit = 0;
      TaxType = 0;
      DiscType = 0;
      Store = 0;
      Warehouse = 0;
    return () => {
      modifyId = null;
    };
  }, []);

  React.useEffect(() => {
    loadAllMaster();
    customerDataHandler()
    // getAdditionalField()
  }, [Category]);

  // =====================================Additional-field-data=============================================
  const additionalFieldData = (
    formFields,
    inputValues,
    selectedOptions,
    dates,
    checkboxValues
  ) => {
    if (!formFields) {
      console.error("formFields is undefined");
      return [];
    }
    let corrData = formFields.map((field, index) => {
      const fieldKey = `field_${index}`;
      const inputValue = inputValues[`text${index}`] || "";
      const selectValue = selectedOptions[fieldKey] || null;
      switch (field.type) {
        case 2: // select
          return {
            ParentID: field.id || 0,
            ID: modifyId || 0,
            MasterID: selectValue ? selectValue.value || 0 : 0,
            Name: selectValue ? selectValue.label || "" : "",
            Type: field.type,
          };
        case 1:
          return {
            ParentID: field.id || 0,
            ID: modifyId || 0,
            MasterID: 0,
            Name: inputValues[index] || "",
            Type: field.type,
          };
        case 3:
          return {
            ParentID: field.id || 0,
            ID: modifyId || 0,
            MasterID: 0,
            Name: inputValues[index] || "",
            Type: field.type,
          };
        case 4: {
          const dateValue = moment(dates[index]).format("DD/MMM/YYYY");
          return {
            ParentID: field.id || 0,
            ID: modifyId || 0,
            MasterID: 0,
            Name: dateValue ? dateValue.toString() : "",
            Type: field.type,
          };
        }
        case 5: {
          const checkboxValue = checkboxValues[index] ? 1 : 0;
          return {
            ParentID: field.id || 0,
            ID: modifyId || 0,
            MasterID: 0,
            Name: `${inputValue}${checkboxValue}`,
            Type: field.type,
          };
        }
        default:
          return null;
      }
    });
    setAdditionalField(corrData);
  };
  // ================================Product-Saving==================================================
// Define fields expected to be numeric

const validateField = (value, isInt = false) => {
  return isInt ? parseInt(value) || 0 : parseFloat(value) || 0;
};

// Perform product save with validation
const handleProductSave = async (e) => {
  e.preventDefault();

  // Perform validation
  const validateInputs = () => {
    let newErrors = {};
    const salePrice = validateField(productInput.SalePrice);
    const mrp = validateField(productInput.MRP);
    const minSPrice = validateField(productInput.MinSPrice);

    if (salePrice > mrp) {
      newErrors.SalePrice = "Sale Price cannot be greater than MRP.";
    }
    if (salePrice < minSPrice) {
      newErrors.SalePrice = "Sale Price cannot be less than Minimum Sale Price.";
    }

    return newErrors;
  };

  const validationErrors = validateInputs();

  // If there are validation errors, update state and stop execution
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    showToastError("Please fix validation errors before saving.");
    return;
  }

  // Gather additional field data
  additionalFieldData();
  const addInfoData = dataSource.filter((item) => item.head !== "");

  // Dynamically prepare request body with only necessary numeric conversions
  const requestBody = {
    Code: modifyId || 0,
    Name: productInput.Name || "",
    ItemCode: productInput.ItemCode || "",
    PageNo: productInput.pageNo || "",
    Website: productInput.webName || "",
    HSN: productInput.HSN || "",
    Description: productInput.Description || "",

    // Apply conversions selectively
    Qty: numericFields.includes("Qty") ? validateField(productInput.Qty) : 0,
    DiscValue: numericFields.includes("DiscValue")
      ? validateField(productInput.DiscValue)
      : 0,
    PurcPrice: numericFields.includes("PurcPrice")
      ? validateField(productInput.PurcPrice)
      : 0,
    SalePrice: numericFields.includes("SalePrice")
      ? validateField(productInput.SalePrice)
      : 0,
    MRP: numericFields.includes("MRP")
      ? validateField(productInput.MRP)
      : 0,
    MinSPrice: numericFields.includes("MinSPrice")
      ? validateField(productInput.MinSPrice)
      : 0,
    MinLevelQty: numericFields.includes("MinLevelQty")
      ? validateField(productInput.MinLevelQty)
      : 0,
    MaxLevelQty: numericFields.includes("MaxLevelQty")
      ? validateField(productInput.MaxLevelQty)
      : 0,
    ROLevelQty: numericFields.includes("ROLevelQty")
      ? validateField(productInput.ROLevelQty)
      : 0,
    Category: parseInt(Category) || 0,
    ProductType: parseInt(ProductType) || 0,
    SubCategory: parseInt(SubCategory) || 0,
    Brand: parseInt(Brand) || 0,
    Unit: parseInt(Unit) || 0,
    TaxType: parseInt(TaxType) || 0,
    DiscType: parseInt(DiscType) || 0,
    ExpDel: numericFields.includes("ExpDel")
      ? parseInt(productInput.expectedDelivery) || 0
      : 0,
    Supplier: parseInt(Supplier) || 0,
    ImageInfo: [...selectedImagesData],
    ProductMasterAddInfo: additionalField,
    AdditionalInfo: [],
    AddInfo: addInfoData,
  };

  // console.log("productJson", JSON.stringify(requestBody));
  let saveurl = `/api/SaveProduct`;
  // console.log("saveurl", saveurl);

  try {
    setLoading(true);
    const { res, got } = await callFetch(saveurl, "POST", requestBody);
    if (got.status === 1) {
      showToastMessage(got.msg);

      setProductInput((prevState) => ({
        ...InitialMasterData,
        ItemCode: prevState.ItemCode,
      }));
      setCheckboxes({
        warranties: 0,
        manufacturer: 0,
        expiry: 0,
      });
      setSelectedImagesData([]);
      setAdditionalField([]);
      if (modifyId) {
        navigate(route.productlist);
        setTimeout(() => {
          navigate(route.productlist);
        }, 2000);
      }
      setLoading(false);
      console.log(got.msg);
    } else {
      showToastError(got.msg);
      console.log(got.msg);
      setLoading(false);
    }
    console.log("POST Response:", got);
  } catch (error) {
    setLoading(false);
    console.error("Error:", error);
  }
};

  // =======================================Modify-Handler=======================================
  const parseDate = (dateStr) => {
    return moment(dateStr, "DD/MMM/YYYY").toDate();
  };
  const ProductModifyData = async (
    setInputValues,
    setSelectedOptions,
    setCheckboxValues,
    setDates
  ) => {
    let url = `/api/GetProductMaster?ID=${modifyId}&MasterType=6&ParentID=0`;
    // console.log("modifyUrl", url);
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let allModifydata = got.data[0];
        // console.log("modDatafrommmm", got.data);
        setProductInput({
          Name: allModifydata.name,
          pageNo: allModifydata.pageNo,
          webName: allModifydata.website,
          ItemCode: allModifydata.itemCode,
          SkuCode: allModifydata.skuCode,
          HSN: allModifydata.hsn,
          Slug: allModifydata.slug,
          Description: allModifydata.description,
          Qty: allModifydata.qty,
          DiscValue: allModifydata.discValue,
          PurcPrice: allModifydata.purcPrice,
          SalePrice: allModifydata.salePrice,
          MRP: allModifydata.mrp,
          MinSPrice: allModifydata.minSPrice,
          MinLevelQty: allModifydata.minLevelQty,
          MaxLevelQty: allModifydata.maxLevelQty,
          ROLevelQty: allModifydata.roLevelQty,
          expectedDelivery: allModifydata.expDel,
        });
        setCheckboxes({
          warranties: allModifydata.warranty,
          manufacturer: allModifydata.manufacture,
          expiry: allModifydata.expiry,
        });
        setDataSource(allModifydata.addInfo);
        setSelectedProduct({
          category: {
            value: allModifydata.category || 0,
            label: allModifydata.categoryName || "N/A",
          },
          productType: {
            value: allModifydata.productType || 0,
            label: allModifydata.productTypeName || "N/A",
          },
          subCategory: {
            value: allModifydata.subCategory || 0,
            label: allModifydata.subCategoryName || "N/A",
          },
          brand: {
            value: allModifydata.brand || 0,
            label: allModifydata.brandName || "N/A",
          },
          unit: {
            value: allModifydata.unit || 0,
            label: allModifydata.unitName || "N/A",
          },
          taxType: {
            value: allModifydata.taxType || 0,
            label: allModifydata.taxTypeName || "N/A",
          },
          discType: {
            value: allModifydata.discType || 0,
            label: allModifydata.discTypeName || "N/A",
          },
          store: {
            value: allModifydata.store || 0,
            label: allModifydata.storeName || "N/A",
          },
          warehouse: {
            value: allModifydata.wh || 0,
            label: allModifydata.whName || "N/A",
          },
          supplier: {
            value: allModifydata.supplier || 0,
            label: allModifydata.supplierName || "N/A",
          },
        });
        Category = allModifydata.category;
        ProductType = allModifydata.productType;
        SubCategory = allModifydata.subCategory;
        Brand = allModifydata.brand;
        TaxType = allModifydata.brand;
        Unit = allModifydata.unit;
        DiscType = allModifydata.discType;
        Store = allModifydata.store;
        Warehouse = allModifydata.wh;
        Supplier=allModifydata.supplier
        let imageData = allModifydata.imageInfo;
        const imageBase64Data = imageData.map((item, index) => ({
          SrNo: item.srNo,
          FileName: item.fileName,
          FileExt: item.fileExt,
          Base64: item.base64,
        }));
        setSelectedImagesData(imageBase64Data);
        // setProductTableList(alldata)
        let addfieldData = allModifydata.productMasterAddInfo;
        //  console.log("addfieldData",addfieldData)
        const modifiedInputValues = addfieldData.map((field, index) => {
          if (addfieldData && addfieldData[index]) {
            switch (field.type) {
              case 1: // text
              case 3: // numeric
                return addfieldData[index].name;
              default:
                return "";
            }
          } else {
            return "";
          }
        });

        setInputValues(modifiedInputValues);

        const modifiedSelectedOptions = {};
        const modifiedCheckboxValues = [];
        const modifiedDates = [];

        addfieldData.forEach((field, index) => {
          const fieldKey = `field_${index}`;
          if (addfieldData && addfieldData[index]) {
            switch (field.type) {
              case 2: // Dropdown
                modifiedSelectedOptions[fieldKey] = {
                  value: addfieldData[index].masterID,
                  label: addfieldData[index].name,
                };
                break;
              case 4: // Date
              modifiedDates[index] = parseDate(
                addfieldData[index].name || new Date()
              );
                break;
              // case 4: // Date
              //   modifiedDates[index] = new Date(
              //     addfieldData[index].name == ""
              //       ? new Date()
              //       : addfieldData[index].name
              //   );
              //   break;
              case 5: // Checkbox
                modifiedCheckboxValues[index] =
                  parseInt(addfieldData[index].name) === 1;
                break;
              default:
                break;
            }
          }
        });

        setSelectedOptions(modifiedSelectedOptions);
        setCheckboxValues(modifiedCheckboxValues);
        setDates(modifiedDates);
      }

      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
      setLoading(false);
      // console.log("GET Response:", got);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (location.state !== null && location.state.code !== undefined) {
      ProductModifyData();
      // console.log('selectedImage',selectedImagesData)
    }
  }, [modifyId]);

  return (
    <>
      <ReactToast />
      <AddProduct
        handleSaveMaster={handleSaveMaster}
        productInput={productInput}
        handelProductInput={handelProductInput}
        masterInput={masterInput}
        handelMasterInput={handelMasterInput}
        unit={unit}
        category={category}
        product={product}
        subcategory={subcategory}
        brand={brand}
        taxType={taxType}
        store={storeOption}
        warehouse={warehouseOption}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleSelectChange={handleSelectChange}
        handleProductSave={handleProductSave}
        setSelectedImagesData={setSelectedImagesData}
        handleCheckboxChange={handleCheckboxChange}
        checkboxes={checkboxes}
        loading={loading}
        additionalFieldData={additionalFieldData}
        ProductModifyData={ProductModifyData}
        modifyId={modifyId}
        selectedImagesData={selectedImagesData}
        handleOpenModal={handleOpenModal}
        values={values}
        handleValueChange={handleValueChange}
        imagePath={imagePath}
        handleImageConverted={handleImageConverted}
        errors={errors}
        supplierData={supplierData}
        customerDataHandler={customerDataHandler}
      />
      <AdditionalInfoModal
        show={showModal}
        handleClose={handleCloseModal}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </>
  );
};

export default AddProductPage;
