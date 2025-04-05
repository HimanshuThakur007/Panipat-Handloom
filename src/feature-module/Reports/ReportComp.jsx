import React, { useState } from "react";
import ReportPage from "./ReportPage";
import moment from "moment";
import { useParams } from "react-router-dom";
import { loadDropdownOptions, loadTableData } from "../../core/utility/reuseFunctions";
import {
  partyWiseColumns,
  pendingPoDetailsColumns,
  pIColumns,
  poDetailsColumns,
  quotationColumns,
  stockBalanceColumns,
  stockDetailColumns,
} from "./ReportColumn";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const ReportComp = () => {
  const defaultStartDate = dayjs().startOf("month");
  const defaultEndDate = dayjs();
  const { id } = useParams();
  const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
  const [asOnDate, setAsOnDate] = useState(new Date());
  const [reportTableData, setReportTableData] = useState([]);
  const [productList, setProductList] = useState([])
  const [productSelect, setProductSelect] = useState(null)
  const [loading, setLoading] = useState(false);
  const typeMapping = {
    podetails: "1",
    pendingpo: "2",
    quotation: "3",
    pendingquotation: "4",
    purchaseinvoice: "5",
    partywisepi: "6",
    saleinvoice: "7",
    partywisesi: "8",
    stockdetails: "9",
    stockbalance: "10",
  };
  const typeValue = typeMapping[id];
  console.log(typeValue, typeValue);

  // Effect to handle API call when dates change
  React.useEffect(() => {
    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
    const asOnDateStr = moment(asOnDate).format("DD/MMM/YYYY"); 
    const apiEndpoints = {
      1: `/api/RptPODetails?RecType=5&FDate=${startDateStr}&TDate=${endDateStr}`,
      2: `/api/RptPendingPODetails?RecType=5&FDate=${startDateStr}&TDate=${endDateStr}`,
      3: `/api/RptQutDetails?RecType=4&FDate=${startDateStr}&TDate=${endDateStr}`,
      4: `/api/RptPendingQutDetails?RecType=4&FDate=${startDateStr}&TDate=${endDateStr}`,
      5: `/api/RptInvoiceReport?RecType=6&FDate=${startDateStr}&TDate=${endDateStr}`,
      6: `/api/RptPartyWiseInvoiceReport?RecType=6&FDate=${startDateStr}&TDate=${endDateStr}`,
      7: `/api/RptInvoiceReport?RecType=7&FDate=${startDateStr}&TDate=${endDateStr}`,
      8: `/api/RptPartyWiseInvoiceReport?RecType=7&FDate=${startDateStr}&TDate=${endDateStr}`,
      9: `/api/RptStockDetails?ProductCode=${productSelect?.value || 0}&FDate=${startDateStr}&TDate=${endDateStr}`,
      10: `/api/RptStockBal?ProductCode=${productSelect?.value || 0}&AsOndate=${asOnDateStr}`,
    };
    const url = apiEndpoints[typeValue] || null;
    if (url) {
      loadTableData({
        url,
        setState: setReportTableData,
        setLoading: setLoading,
      });
    } else {
      console.error("Invalid typeValue or missing endpoint");
    }
    if(typeValue === "9" || typeValue ==="10"){
    loadDropdownOptions({
      url: `/api/GetProductMasterList?ID=0`,
      valueKey: "code",
      labelKey: "name",
      setState: setProductList,
      setLoading: setLoading,
      // stateKey: setProductSelect,
      // additionalKeys: ["customerCode", "customerName"],
    });
  }
  }, [dates, typeValue, productSelect, asOnDate]);

  // const onDateChange = (value) => {
  //   const [newStartDate, newEndDate] = value;
  //   if (!newStartDate?.isSame(dates[0]) || !newEndDate?.isSame(dates[1])) {
  //     setDates(value);
  //   }
  // };

  const onDateChange = (value) => {
    if (value && value.length === 2) {
      const [newStartDate, newEndDate] = value;
      if (!newStartDate?.isSame(dates[0]) || !newEndDate?.isSame(dates[1])) {
        setDates(value);
      }
    } else {
      setDates([defaultStartDate, defaultEndDate]);
    }
  };

  const productSelectValues = (select)=>{
       setProductSelect(select)
  }

  const onAsOnDateChange = (date) => {
    if (date) {
      setAsOnDate(date);
    }
  };

const dynamicSelections = (id) => {
    let columns = [];
    let heading = '';
  
    switch (id) {
      case "1":
        columns = poDetailsColumns;
        heading = 'Purchase Order';
        break;
      case "2":
        columns = pendingPoDetailsColumns;
        heading = 'Pending PO';
        break;
      case "3":
        columns = quotationColumns(id);
        heading = 'Quotation';
        break;
      case "4":
        columns = quotationColumns(id);
        heading = 'Pending Quotation';
        break;
      case "5":
        columns = pIColumns(id);
        heading = 'Purchase Invoice';
        break;
      case "7":
        columns = pIColumns(id);
        heading = 'Sale Invoice';
        break;
      case "6":
        columns = partyWiseColumns(id);
        heading = 'Party Wise PI';
        break;
      case "8":
        columns = partyWiseColumns(id);
        heading = 'Party Wise SI';
        break;
      case "9":
        columns = stockDetailColumns(id);
        heading = 'Stock Details';
        break;
      case "10":
        columns = stockBalanceColumns(id);
        heading = 'Stock Balance';
        break;
      default:
        columns = [];
        heading = 'No Data Available';
    }
  
    return { heading, columns };
  };
  
// const columns = dynamicSelections(typeValue);
const { heading, columns } = dynamicSelections(typeValue);

  return (
    <>
      <ReportPage
        onDateChange={onDateChange}
        reportTableData={reportTableData}
        columns={columns}
        heading={heading}
        asOnDate={asOnDate}
        onAsOnDateChange={onAsOnDateChange}
        productList={productList}
        typeValue={typeValue}
        productSelectValues={productSelectValues}
        productSelect={productSelect}
        dates={dates}
      />
    </>
  );
};

export default ReportComp;
