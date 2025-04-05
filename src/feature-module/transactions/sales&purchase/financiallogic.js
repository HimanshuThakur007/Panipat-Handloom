import React, { useState, useEffect } from "react";
import useFetch from "../../../Hooks/useFetch";
import {
  loadDropdownOptions,
  modifyDataHandler,
} from "../../../core/utility/reuseFunctions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";
import { useLocation, useNavigate } from "react-router-dom";
import { resetFormData } from "../../../core/redux/action";
var qutCode = 0;
var poCode = 0;
var pi = 0;
export const financiallogic = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const callFetch = useFetch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  // const [pi, setPi] = (0)
  const [customerCode, setCustomerCode] = useState(0);
  const [remark, setRemark] = useState("");
  const [quotationDate, setQuotationDate] = useState(new Date());
  const { Financial_Table, billsundry_data, form_data } = useSelector(
    (state) => state
  );
  const financialData = Financial_Table;
  const selectedValues = form_data;
  const billsundryData = billsundry_data;
  const fields = billsundryData?.fields || [];
  const [dropDowmList, setDropDownList] = useState({
    partyList: [],
    saleManList: [],
    unitOptions: [],
    itemList: [],
    againstType: [],
    quotationNo: "",
    quotation: [],
    supplier: [],
    purchaseOrder: [],
  });
  if (location && location.state !== undefined && location.state !== null) {
    var modCode = location.state.code;
    var paramId = location.state.id;
  }

  React.useEffect(() => {
    // =============for-item=========
    loadDropdownOptions({
      url: `/api/GetProductMasterName`,
      valueKey: "id",
      labelKey: "name",
      setState: setDropDownList,
      setLoading: setLoading,
      additionalKeys: [
        "unit",
        "unitName",
        "salePrice",
        "purcPrice",
        "quantity",
        "taxType",
        "tax",
        "discType",
        "discValue",
      ],
      stateKey: "itemList",
    });
    // =========for-unit=====
    loadDropdownOptions({
      url: `/api/GetMaster?MasterType=8&ParentID=0`,
      valueKey: "code",
      labelKey: "name",
      setState: setDropDownList,
      setLoading: setLoading,
      stateKey: "unitOptions",
    });

    // ==========for-customer
    loadDropdownOptions({
      url: `/api/LoadParty?rectype=1`,
      valueKey: "id",
      labelKey: "companyName",
      setState: setDropDownList,
      setLoading: setLoading,
      stateKey: "partyList",
      additionalKeys: ["mobile"],
    });

    //  =========for salesman
    loadDropdownOptions({
      url: `/api/GetUserMasterList?UType=1&Roll=3`,
      setState: setDropDownList,
      setLoading: setLoading,
      stateKey: "saleManList",
    });
    //  =========for quotation-No======
    if (paramId !== "4") {
      loadDropdownOptions({
        url: `/api/LoadPendingQuotation`,
        valueKey: "vchCode",
        labelKey: "vchNo",
        setState: setDropDownList,
        setLoading: setLoading,
        stateKey: "quotation",
        additionalKeys: ["customerCode", "customerName"],
      });
    }
    // =================supplier==========
    if (paramId === "3") {
      loadDropdownOptions({
        url: `/api/GetCustomerList?MasterType=2`,
        valueKey: "id",
        labelKey: "name",
        setState: setDropDownList,
        setLoading: setLoading,
        stateKey: "supplier",
        // additionalKeys: ["customerCode", "customerName"],
      });
    }
  }, []);

  useEffect(() => {
    if (modCode === undefined) {
      GetQuotationNo();
      dispatch(resetFormData());
      pi = 0;
    }
    if (modCode != undefined) {
      // dispatch(resetFormData());
      pi = 0;
      modifyDataHandler({
        url:
          paramId === "1"
            ? `/api/LoadQuotation?id=${modCode}`
            : paramId === "2"
            ? `/api/LoadPurchaseOrder?ID=${modCode}`
            : paramId === "3"
            ? `/api/LoadPurchaseInvoice?ID=${modCode}`
            : paramId === "4"
            ? `/api/LoadSaleInvoice?ID=${modCode}`
            : ``,
        setLoading,
        onSuccess: setModifyValues,
        onError: (status, message) => {
          console.error(`Error [${status}]: ${message}`);
        },
      });
    }
    // console.log('modCode',modCode)
  }, [modCode, paramId]);

  const GetQuotationNo = async () => {
    const RecType =
      paramId === "1"
        ? 4
        : paramId === "2"
        ? 5
        : paramId === "3"
        ? 6
        : paramId === "4"
        ? 7
        : null;

    if (RecType === null) {
      console.error("Invalid ID provided");
      return;
    }
    let url = `/api/GetVchNo?RecType=${RecType}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        setDropDownList((prev) => ({
          ...prev,
          quotationNo: got.enqNo,
        }));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };


  const handleSelectChange = (selectedOption, selectName) => {
    // console.log(selectedOption, selectName, "selected");
    const serializedDate =
      quotationDate instanceof Date
        ? quotationDate.toISOString()
        : quotationDate;
    const currentSelectedValues = form_data?.selectedValues || {};
    if (paramId === "2" && selectName === "quotation") {
      qutCode = selectedOption.value;
      modifyDataHandler({
        url: `/api/LoadQuotation?id=${qutCode}`,
        setLoading,
        onSuccess: setModifyValues,
        onError: (status, message) => {
          console.error(`Error [${status}]: ${message}`);
        },
      });
    }

    if (paramId === "1" && selectName === "against") {
      let rType =
        selectedOption.value === 2 ? 3 : selectedOption.value === 3 && 1;
      loadDropdownOptions({
        url: `/api/GetPendingListForQuotation?Rectype=${rType}`,
        valueKey: "id",
        labelKey: "vchNo",
        setState: setDropDownList,
        setLoading: setLoading,
        additionalKeys: ["enqNo"],
        stateKey: "againstType",
      });
    } else if (
      paramId === "2" &&
      selectName === "against" &&
      selectedOption.value === 1
    ) {
      // ==========for-supplier
      dispatch(resetFormData());
      loadDropdownOptions({
        url: `/api/GetCustomerList?MasterType=2`,
        valueKey: "id",
        labelKey: "name",
        setState: setDropDownList,
        setLoading: setLoading,
        stateKey: "supplier",
        // additionalKeys: ["customerCode", "customerName"],
      });
    }

    if (paramId === "3" && selectName === "supplier") {
      let code = selectedOption.value;
      loadDropdownOptions({
        url: `/api/LoadpendingPOForPI?PartyCode=${code}&RecType=5`,
        valueKey: "vchCode",
        labelKey: "vchNo",
        setState: setDropDownList,
        setLoading: setLoading,
        stateKey: "purchaseOrder",
        // additionalKeys: ["customerCode", "customerName"],
      });
    }
    if (
      (paramId === "3" && selectName === "purchaseOrder") ||
      (paramId === "4" && selectName === "quotation")
    ) {
      poCode = selectedOption.value;
      pi = 1;
      // loadInvioceTable(poCode)
      modifyDataHandler({
        url: `/api/LoadPOProdWiseDetails?VchCode=${selectedOption.value}`,
        setLoading,
        onSuccess: setModifyValues,
        onError: (status, message) => {
          console.error(`Error [${status}]: ${message}`);
        },
      });
    }
    if (paramId === "4" && selectName === "customerName") {
      console.log(selectedOption);
      let code = selectedOption.value;
      loadDropdownOptions({
        url: `/api/LoadpendingPOForPI?PartyCode=${code}&RecType=4`,
        valueKey: "vchCode",
        labelKey: "vchNo",
        setState: setDropDownList,
        setLoading: setLoading,
        stateKey: "quotation",
        // additionalKeys: ["customerCode", "customerName"],
      });
    }

    const updatedValues = {
      ...currentSelectedValues,
      [selectName]: selectedOption,
    };

    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        formData: {
          date: "",
          vchNo: "",
          selectedValues: updatedValues,
        },
      },
    });
  };
  // =================set on modify time & LOAD TIME OF PO AND QUT==============
  const setModifyValues = (data) => {
    const currentSelectedValues = form_data?.selectedValues || {};
    // console.log("fromUnixTime", currentSelectedValues);
    if (paramId === "1") {
      setQuotationDate(new Date(data?.date || Date.now()));
      setDropDownList((prev) => ({
        ...prev,
        quotationNo: data?.vchNo || "",
      }));
      const updatedValues = {
        ...currentSelectedValues,
        customerName: {
          value: data?.customerCode || "",
          label: data?.customerName || "",
        },
        salesman: {
          value: data?.salesManCode || "",
          label: data?.salesManName || "",
        },
        against: { value: data?.against || "", label: data?.againstName || "" },
        MJInqName: {
          value: data?.mjInqCode || "",
          label: data?.mjInqName || "",
        },
      };
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          formData: {
            date: "",
            vchNo: "",
            remark: data?.remark || "",
            selectedValues: updatedValues,
          },
        },
      });
    } else if (paramId === "2" && qutCode == 0) {
      setQuotationDate(new Date(data?.date || Date.now()));
      setDropDownList((prev) => ({
        ...prev,
        quotationNo: data?.vchNo || "",
      }));
      const updatedValues = {
        ...currentSelectedValues,
        customerName: {
          value: data?.customerCode || "",
          label: data?.customerName || "",
        },
        against: { value: data?.against || "", label: data?.againstName || "" },
        supplier: {
          value: data?.supplierCode || "",
          label: data?.supplierName || "",
        },
        quotation: {
          value: data?.qutCode || "",
          label: data?.qutVchNo || "",
          customerName: data?.customerName || "",
        },
        // purchaseOrder :{
        //   value :
        // }
      };
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          formData: {
            date: "",
            vchNo: "",
            remark: data?.remark || "",
            selectedValues: updatedValues,
          },
        },
      });
    } else if (paramId === "3" || paramId === "4") {
      if (pi === 0) {
        setQuotationDate(new Date(data?.date || Date.now()));
        setDropDownList((prev) => ({
          ...prev,
          quotationNo: data?.vchNo || "",
        }));
        const updatedValues = {
          ...currentSelectedValues,
          supplier: {
            value: data?.supplierCode || "",
            label: data?.supplierName || "",
          },
          purchaseOrder: {
            value: data?.poCode || 0,
            label: data?.poVchNo || "",
          },
          customerName: {
            value: data?.customerCode || 0,
            label: data?.customerName || ""
          },
          quotation: {
            value: data?.qutCode || 0,
            label: data?.qutVchNo || ""
          }
        };
        dispatch({
          type: "SET_FORM_DATA",
          payload: {
            formData: {
              date: "",
              vchNo: "",
              remark: data?.remark || "",
              selectedValues: updatedValues,
            },
          },
        });
      }
    }
    // =========table-details=========
    const updatedDataSource =
      (paramId === "1"
        ? data?.quotationDetails || []
        : paramId === "2" && qutCode === 0
        ? data?.poDetails || []
        : paramId === "2" && qutCode != 0
        ? data?.quotationDetails
        : 
        (paramId === "3" && pi === 1) || (paramId === "4" && pi === 1)
        ? data.loadPOProdWiseDetails
        : paramId === "3" && pi === 0
        ? data.piDetails
        : paramId === "4" && pi === 0
        ? data.siDetails
        : []) || [];
    console.log("modupdatedDataSource=>", updatedDataSource);
    const mappedDataSource = updatedDataSource.map((item, index) => ({
      key: item?.srNo || index + 1 || 0,
      itemName: {
        value: item?.product || 0,
        label: item?.productName || "",
        unit: item?.unit || 0,
        unitName: item?.unitName || "",
        salePrice: item?.salePrice || 0,
        purcPrice: item?.purcPrice || 0,
        quantity: item?.qty || 0,
        taxType: item?.taxType || 0,
        tax: item?.tax || 0,
        discType: item?.discType || 0,
        discValue: item?.discValue || 0,
      },
      quantity: item?.qty || 0,
      salePrice: item?.salePrice || 0,
      amount: item?.amt || 0,
      discountPer: item?.disPer || 0,
      discountAmt: item?.disAmt || 0,
      tax: item?.taxPer || 0,
      taxAmount: item?.taxAmt || 0,
      totalAmount: item?.totAmt || 0,
    }));
    
    const total = mappedDataSource?.reduce((sum, row) => {
      return sum + (row?.totalAmount || 0);
    }, 0);
    // console.log("ttootttt fom mod=>", total);
    // =============billsundry-details===========
    const updatedBillsundry =
      (paramId === "1"
        ? data?.qutBillSundary || []
        : paramId === "2" && qutCode === 0
        ? data?.poBillSundary || []
        : paramId === "2" && modCode != undefined
        ? data?.qutBillSundary
        : (paramId === "3" && pi == 1) || (paramId === "4" && pi === 1)
        ? data?.poBillSundary
        : paramId === "3" && pi == 0
        ? data?.piBillSundary
        : paramId === "4" && pi === 0
        ? data?.siBillSundary
        : []) || [];

    const mappedBillsundry = updatedBillsundry.map((bill) => ({
      srNo: bill?.srNo || "",
      absoluteAmount: bill?.absoluteAmount || 0,
      percentage: bill?.percentage || 0,
      type: bill?.type || "",
    }));

    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        billsundryData: {
          ...billsundryData,
          total: total,
          fields: mappedBillsundry,
          finalTotal: data?.finalTotal || 0,
        },
        financialtabledata: mappedDataSource,
      },
    });
  };

  const previewLogic = () => {
    const filteredData = Array.isArray(financialData)
      ? financialData.filter((row) => row.itemName !== null)
      : [];
    // console.log("filteredData", filteredData);
    const currentSelectedValues = form_data?.selectedValues || {};
    // console.log("currentSelectedValues", currentSelectedValues);

    const formattedDate = moment(quotationDate).format("DD/MMM/YYYY");
    // console.log("Before formatting:", financialData);
    const formattedData = filteredData.map((row) => ({
      SrNo: row.key,
      Product: row.itemName?.value || 0,
      ProductName: row.itemName?.label || "",
      Qty: row.quantity || 1,
      Unit: row.unitName || 0,
      UnitName: row.unit || "",
      SalePrice: row.price || 0,
      Amt: row.amount || 0,
      DisPer: row.discountPer || 0,
      DisAmt: row.discountAmt || 0,
      TaxPer: row.tax || 0,
      TaxAmt: row.taxAmount || 0,
      TotAmt: row.totalAmount || 0,
      isEditable: false,
    }));

    let requestBody = {};
    const quotation = currentSelectedValues?.quotation || {};
    const supplier = currentSelectedValues?.supplier || {};
    const customerName = currentSelectedValues?.customerName || {};
    const salesman = currentSelectedValues?.salesman || {};
    const against = currentSelectedValues?.against || {};
    const MJInqName = currentSelectedValues?.MJInqName || {};
    const purchaseOrder = currentSelectedValues?.purchaseOrder || {};
    switch (paramId) {
      case "1":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 4,
          CustomerCode: customerName.value || 0,
          CustomerName: customerName.label || "",
          SalesManCode: salesman.value || 0,
          SalesManName: salesman.label || "",
          Against: against.value || 0,
          AgainstName: against.label || "",
          MJInqCode: MJInqName.value || 0,
          MJInqName: MJInqName.label || "",
          BillNo: "",
          PurDate: "",
          Remark: selectedValues.remark || "",
          File: "",
          QuotationDetails: formattedData,
          finalTotal: billsundryData?.finalTotal,
          QutBillSundary: fields,
        };
        break;

      case "2":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 5,
          CustomerCode: quotation.customerCode || 0,
          CustomerName: quotation.customerName || "",
          SupplierName: supplier.label || "",
          SupplierCode: supplier.value || 0,
          Against: against.value || 0,
          AgainstName: against.label || "",
          QutCode: quotation.value || 0,
          QutVchNo: quotation.label || "",
          Remark: selectedValues.remark || "",
          PODetails: formattedData,
          // TotalAmount: billsundryData?.finalTotal,
          finalTotal: billsundryData?.finalTotal,
          POBillSundary: fields,
          // AdditionalData: fields,
        };
        break;
        case "3":
          requestBody = {
            VchCode: modCode || 0,
            VchNo: dropDowmList.quotationNo || "",
            Date: formattedDate || "",
            RecType: 6,
            SupplierCode: supplier.value || 0,
            SupplierName: supplier.label || "",
            // POCode: purchaseOrder.value || 0,
            POName: purchaseOrder.label ||'',
            Remark: selectedValues.remark || "",
            finalTotal: billsundryData?.finalTotal,
            PIDetails: formattedData,
            PIBillSundary: fields,
          };
          break;
        case "4":
          requestBody = {
            VchCode: modCode || 0,
            VchNo: dropDowmList.quotationNo || "",
            Date: formattedDate || "",
            RecType: 7,
            CustomerCode: customerName.value || 0,
            CustomerName: customerName.label || "",
            QutCode: quotation.value || 0,
            QutVchNo: quotation.label || "",
            Remark: selectedValues.remark || "",
            finalTotal: billsundryData?.finalTotal,
            SIDetails: formattedData,
            SIBillSundary: fields,
          };
          break;
      default:
        requestBody = {};
        break;
    }
    return requestBody;
  };

  const saveHandler = async (e) => {
    const filteredData = financialData?.filter((row) => row.itemName !== null);
    const currentSelectedValues = form_data?.selectedValues || {};
    e.preventDefault();
    const formattedDate = moment(quotationDate).format("DD/MMM/YYYY");
    const formattedData = filteredData.map((row) => ({
      SrNo: row.key,
      Product: row.itemName?.value || 0,
      ProductName: row.itemName?.label || "",
      Qty: row.quantity || 1,
      Unit: row.unitName || 0,
      UnitName: row.unit || "",
      SalePrice: row.price || 0,
      Amt: row.amount || 0,
      DisPer: row.discountPer || 0,
      DisAmt: row.discountAmt || 0,
      TaxPer: row.tax || 0,
      TaxAmt: row.taxAmount || 0,
      TotAmt: row.totalAmount || 0,
      isEditable: false,
    }));

    let requestBody = {};
    const quotation = currentSelectedValues?.quotation || {};
    const supplier = currentSelectedValues?.supplier || {};
    const customerName = currentSelectedValues?.customerName || {};
    const salesman = currentSelectedValues?.salesman || {};
    const against = currentSelectedValues?.against || {};
    const MJInqName = currentSelectedValues?.MJInqName || {};
    const purchaseOrder = currentSelectedValues?.purchaseOrder || {};
    switch (paramId) {
      case "1":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 4,
          CustomerCode: customerName.value || 0,
          CustomerName: customerName.label || "",
          SalesManCode: salesman.value || 0,
          SalesManName: salesman.label || "",
          Against: against.value || 0,
          AgainstName: against.label || "",
          MJInqCode: MJInqName.value || 0,
          MJInqName: MJInqName.label || "",
          BillNo: "",
          PurDate: "",
          Remark: selectedValues.remark || "",
          File: "",
          QuotationDetails: formattedData,
          finalTotal: billsundryData?.finalTotal,
          QutBillSundary: fields,
        };
        break;

      case "2":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 5,
          CustomerCode: quotation.customerCode || 0,
          CustomerName: quotation.customerName || "",
          SupplierName: supplier.label || "",
          SupplierCode: supplier.value || 0,
          Against: against.value || 0,
          AgainstName: against.label || "",
          QutCode: quotation.value || 0,
          QutVchNo: quotation.label || "",
          Remark: selectedValues.remark || "",
          // TotalAmount: billsundryData?.finalTotal,
          finalTotal: billsundryData?.finalTotal,
          PODetails: formattedData,
          POBillSundary: fields,
          // AdditionalData: fields,
        };
        break;
      case "3":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 6,
          SupplierCode: supplier.value || 0,
          POCode: purchaseOrder.value || 0,
          Remark: selectedValues.remark || "",
          finalTotal: billsundryData?.finalTotal,
          PIDetails: formattedData,
          PIBillSundary: fields,
        };
        break;
      case "4":
        requestBody = {
          VchCode: modCode || 0,
          VchNo: dropDowmList.quotationNo || "",
          Date: formattedDate || "",
          RecType: 7,
          CustomerCode: customerName.value || 0,
          CustomerName: customerName.label || "",
          QutCode: quotation.value || 0,
          QutVchNo: quotation.label || "",
          Remark: selectedValues.remark || "",
          finalTotal: billsundryData?.finalTotal,
          SIDetails: formattedData,
          SIBillSundary: fields,
        };
        break;

      default:
        requestBody = {};
        break;
    }
    console.log("Formatted Json Data:", JSON.stringify(requestBody));

    let saveurl =
      paramId === "1"
        ? `/api/SaveQuotation`
        : paramId === "2"
        ? "/api/SavePurchaseOrder"
        : paramId === "3"
        ? "/api/SavePurchaseInvoice"
        : paramId === "4"
        ? `/api/SaveSaleInvoice`
        : "";
    console.log("saveurl", saveurl);
    try {
      setLoading(true);

      const { res, got } = await callFetch(saveurl, "POST", requestBody);

      if (res.status === 200 && got.status === 1) {
        showToastMessage(got.msg);
        // dispatch(resetQuotationData());
        dispatch(resetFormData());
        setTimeout(() => {
          if(paramId === "1"){
            navigate('/list/1')
          }else if (paramId === "2"){
            navigate('/list/2')
          }else if (paramId === "3"){
            navigate('/list/3')
          }else if (paramId === "4"){
            navigate('/list/4')
          }
        }, 1000);
       
        
      } else {
        showToastError(got.msg);
        console.log("save measurment error", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return {
    customerCode,
    setCustomerCode,
    loading,
    selectedValues,
    handleSelectChange,
    dropDowmList,
    quotationDate,
    setQuotationDate,
    saveHandler,
    setRemark,
    remark,
    paramId,
    previewLogic,
    modCode,
    pi,
  };
};
