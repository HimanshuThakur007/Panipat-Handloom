import React, { useState, useEffect } from "react";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import { all_routes } from "../../../Router/all_routes";
import DataTable from "../../../common/DataTable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../../core/redux/action";
import moment from "moment";
import {
  ChevronUp,
  PlusCircle,
} from "feather-icons-react/build/IconComponents";
import { loadTableData } from "../../../core/utility/reuseFunctions";
import useFetch from "../../../Hooks/useFetch";
import { showConfirmationAlert } from "../../../ReusableComponents/ConfirmAlert";
import DateRangePickerComponent from "../../../ReusableComponents/DateRangePickerComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Financiallist = () => {
  const route = all_routes;
  const { id } = useParams();
  const dispatch = useDispatch();
  const callFetch = useFetch();
  const data = useSelector((state) => state.toggle_header);
  // const defaultStartDate = moment().subtract(1, "months").startOf("month");
  // // const defaultEndDate = moment().endOf("month");
  // const defaultEndDate = moment();
  const defaultStartDate = dayjs().startOf("month");
  const defaultEndDate = dayjs();
  const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
  const [loading, setLoading] = useState(false);
  const [quotationTableData, setQuotationTableData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const columns = [
    {
      title: "Type",
      dataIndex: "againstName",
      key: "againstName",
      sorter: (a, b) => a.againstName.length - b.againstName.length,
    },
    {
      title: `${id === "1" ? "Quotation No" : "PO. No"}`,
      dataIndex: "vchNo",
      key: "vchNo",
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Party Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "SalesMan Name",
      dataIndex: "salesManName",
      key: "salesManName",
      sorter: (a, b) => a.salesManName.length - b.salesManName.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to={route.financialpage}
              state={{ code: record.vchCode, id: id }}
              // onClick={()=>editHandler(record)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() =>
                  showConfirmationAlert(InvoicesDelete, record.vchCode)
                }
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const purchasecolumns = [
    {
      title: "Type",
      dataIndex: "againstName",
      key: "againstName",
      sorter: (a, b) => a.againstName.length - b.againstName.length,
    },
    {
      title: "Purchase Order No",
      dataIndex: "vchNo",
      key: "vchNo",
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //   sorter: (a, b) => a.date.length - b.date.length,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to={route.financialpage}
              state={{ code: record.vchCode, id: id }}
              // onClick={()=>editHandler(record)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() =>
                  showConfirmationAlert(InvoicesDelete, record.vchCode)
                }
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const PIcolumns = [
    {
      title: "Purchase Invoice No",
      dataIndex: "vchNo",
      key: "vchNo",
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Purchase Order No",
      dataIndex: "poVchNo",
      key: "poVchNo",
      sorter: (a, b) => a.poVchNo.length - b.poVchNo.length,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //   sorter: (a, b) => a.date.length - b.date.length,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to={route.financialpage}
              state={{ code: record.vchCode, id: id }}
              // onClick={()=>editHandler(record)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() =>
                  showConfirmationAlert(InvoicesDelete, record.vchCode)
                }
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const SIcolumns = [
    {
      title: "Sale Invoice No",
      dataIndex: "vchNo",
      key: "vchNo",
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Quotation No",
      dataIndex: "qutVchNo",
      key: "qutVchNo",
      sorter: (a, b) => a.qutVchNo.length - b.qutVchNo.length,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //   sorter: (a, b) => a.date.length - b.date.length,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to={route.financialpage}
              state={{ code: record.vchCode, id: id }}
              // onClick={()=>editHandler(record)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={() =>
                  showConfirmationAlert(InvoicesDelete, record.vchCode)
                }
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const InvoicesDelete = async (ID) => {
    var RecType =
      id === "1" ? 4 : id === "2" ? 5 : id === "3" ? 6 : id === "4" ? 7 : 0;
    let url = `/api/DelTransaction?ID=${ID}&RecType=${RecType}`;

    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");

      if (res.status == 200) {
        const [startDate, endDate] = dates;
        const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
        const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";

        const apiEndpoints = {
          1: `/api/LoadQuotationList?FDate=${startDateStr}&TDate=${endDateStr}`,
          2: `/api/LoadPOList?FDate=${startDateStr}&TDate=${endDateStr}`,
          3: `/api/LoadPurchaseInvoiceList?FDate=${startDateStr}&TDate=${endDateStr}`,
          4: `/api/LoadSaleInvoiceList?FDate=${startDateStr}&TDate=${endDateStr}`,
        };

        const reloadUrl = apiEndpoints[id] || null;
        if (reloadUrl) {
          await loadTableData({
            url: reloadUrl,
            setState: setQuotationTableData,
            setLoading: setLoading,
          });
        }

        setLoading(false);
        return got.msg;
      }

      setLoading(false);
      console.log("GET Response:", got);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuotationTableData([]);

    if (dates.length !== 2) return;

    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";

    const apiEndpoints = {
      1: `/api/LoadQuotationList?FDate=${startDateStr}&TDate=${endDateStr}`,
      2: `/api/LoadPOList?FDate=${startDateStr}&TDate=${endDateStr}`,
      3: `/api/LoadPurchaseInvoiceList?FDate=${startDateStr}&TDate=${endDateStr}`,
      4: `/api/LoadSaleInvoiceList?FDate=${startDateStr}&TDate=${endDateStr}`,
    };

    const url = apiEndpoints[id] || null;
    
    if (url) {
      loadTableData({
        url,
        setState: setQuotationTableData,
        setLoading: setLoading,
      });
    }
  }, [id, dates]);

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
  

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="page-wrapper">
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>
                {id === "1"
                  ? "Quotation List"
                  : id === "2"
                  ? "Purchase Order List"
                  : id === "3"
                  ? "Purchase Invoice List"
                  : id === "4"
                  ? "Sale Invoice List"
                  : ""}
              </h4>
              <h6>
                {id === "1"
                  ? "Manage your Quotation"
                  : id === "2"
                  ? "Manage your Purchase Order"
                  : id === "3"
                  ? "Manage your Purchase Invoice"
                  : id === "4"
                  ? "Manage Your Sale Invoice"
                  : ""}
              </h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <div className="page-btn">
                <Link
                  to={route.financialpage}
                  state={{ id: id }}
                  className="btn btn-added"
                >
                  <PlusCircle className="me-2 iconsize" />
                  {id === "1"
                    ? "Add New Quotation"
                    : id === "2"
                    ? "Add New Purchase Order"
                    : id === "3"
                    ? "Add New Purchase Invoice"
                    : id === "4"
                    ? "Add New Sales Invoice"
                    : ""}
                  {/* Add New Quotation */}
                </Link>
              </div>
            </li>
          </ul>
        </div>

        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            {/* /Filter */}
            <div className="table-top">
              <DateRangePickerComponent value={dates} onChange={onDateChange} />
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <DataTable
                columns={
                  id === "1"
                    ? columns
                    : id === "2"
                    ? purchasecolumns
                    : id === "3"
                    ? PIcolumns
                    : id === "4"
                    ? SIcolumns
                    : []
                }
                data={quotationTableData}
                rowKey={(record) => record.vchCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financiallist;
