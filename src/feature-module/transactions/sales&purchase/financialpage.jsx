import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { setToogleHeader } from "../../../core/redux/action";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import { all_routes } from "../../../Router/all_routes";
import { ArrowLeft, ChevronUp } from "feather-icons-react/build/IconComponents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PdfDocument, PdfViewModal } from "./PdfViewModal";
import DownloadPdfButton from "./DownloadPdfButton";
import PurchaseInvoiceForm from "./purchaseinvoiceform";
import FinancialTable from "./financialTable";
import { financiallogic } from "./financiallogic";
import Quotation_Po_form from "./quotation&poform";
import useFetch from "../../../Hooks/useFetch";

const FinancialPage = () => {
  const route = all_routes;
  const callFetch = useFetch()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state) => state.toggle_header);
  const { saveHandler, paramId,previewLogic,modCode,loading } = financiallogic();
  const [companyDetails, setCompanyDetails] = React.useState({})
  const { billsundry_data } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const jsonData = previewLogic()

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  const loadCustomerInfo = async () => {
    let url = `/api/GetCompInfo`;
    // console.log("modify", url);
    try {
      // setLoading(true)
      const { res, got } = await callFetch(url, "GET");
      // Handle response data
      if (res.status == 200) {
        let loadData = got.data[0];
        console.log("modDta:-email", loadData);
        setCompanyDetails(loadData)
        // setBase64Image(loadData.logo);
        // setLoading(false)
      }
    } catch (error) {
      // Handle errors
      // setLoading(false)
      console.error("Error:", error);
    }
  };
  React.useEffect(()=>{
    loadCustomerInfo()
  },[])
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
              {paramId === "1"
              ? modCode === undefined
                ? "New Quotation"
                : "Edit Quotation"
              : paramId === "2"
              ? modCode === undefined
                ? "New Purchase Order"
                : "Edit Purchase Order"
              : paramId === "3"
              ? modCode === undefined
                ? "New Purchase Invoice"
                : "Edit Purchase Invoice"
              : paramId === "4"
              ? modCode === undefined
                ? "New Sale Invoice"
                : "Edit Sale Invoice"
              : ""}
              </h4>
              <h6>
              {paramId === "1"
              ? modCode === undefined
                ? "Create new Quotation"
                : "Edit Quotation"
              : paramId === "2"
              ? modCode === undefined
                ? "Create new Purchase Order"
                : "Edit Purchase Order"
              : paramId === "3"
              ? modCode === undefined
                ? "Create new Purchase Invoice"
                : "Edit Purchase Invoice"
              : paramId === "4"
              ? modCode === undefined
                ? "Create new Sale Invoice"
                : "Edit Sale Invoice"
              : ""}
              </h6>
            </div>
          </div>
          {loading ? (
            <ReactLoader loaderClass="position-absolute" loading={loading} />
          ) : null}
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link to={`/list/${paramId}`} className="btn btn-secondary">
                  <ArrowLeft className="me-2" />
                  {paramId === "1"
                    ? "Back to Quotation"
                    : paramId === "2"
                    ? "Back to Purchase Order"
                    : paramId === "3"
                    ? "Back to Purchase Invoice"
                    : paramId === "4"
                    ? "Back to Sale Invoice"
                    :''
                  }
                </Link>
              </div>
            </li>

            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Collapse"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp className="feather-chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        {/* /add */}
        <form onSubmit={(e) => saveHandler(e)}>
          {/* <form onSubmit={() => {}}> */}
          <div className="card">
            <div className="card-body add-product pb-0">
              <div className="row">
                 {/* <Quotationform>
                   <QuotationTable />
                 </Quotationform> */}
                {paramId === "1" || paramId === "2" ? (
                  // <Quotationform/>
                  <Quotation_Po_form/>
                ): paramId === '3' || paramId === '4' ? 
                 <PurchaseInvoiceForm/>
                 :''
              }
                 <FinancialTable/>
              </div>
            </div>

            <div className="col-lg-12 p-2">
              <div className="btn-addproduct mb-4">
                {/* <button
                  type="button"
                  className="btn btn-cancel me-2"
                  // onClick={() => navigate(route.dashboard)}
                >
                  Cancel
                </button>
                <button className="btn btn-submit me-2">Save</button>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the form from submitting
                    handleShow(); // Show the modal
                  }}
                >
                  View Quotation
                </button> */}
              </div>
            </div>
            <div className="col-lg-12 p-2">
              <div className="btn-addproduct mb-4">
                <div className="total-amount-container">
                  <div className="total-amount-header">
                    <span>Total Amount</span>
                    <span>
                      {/* {billsundry_data?.finalTotal > 0 ? billsundry_data?.finalTotal?.toFixed(2) : billsundry_data?.total} */}
                      {billsundry_data?.finalTotal?.toFixed(2)}
                    </span>
                  </div>
                  <div className="total-amount-actions">
                    <button className="btn btn-light cancel-button"   onClick={(e) => {
                        e.preventDefault();
                        navigate(route.dashboard)
                      }}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary save-button"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   navigate(route.dashboard)
                      // }}
                    >
                      <span>Save</span>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ marginLeft: "-8px" }}
                      ></button>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            style={{ width: "100%", padding: "10px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleShow();
                            }}
                          >
                            Preview
                          </button>
                        </li>
                        <li>
                          {/* <PDFDownloadLink
                            document={<PdfDocument data={jsonData} />}
                            fileName={`Pdf_${jsonData.VchNo || "Details"}.pdf`}
                          >
                            {({ loading }) => (
                              <button className="dropdown-item" style={{ width: "100%", padding: "10px" }} onClick={(e)=>e.preventDefault()}>
                                {loading
                                  ? "Preparing document..."
                                  : "Download PDF"}
                              </button>
                            )}
                          </PDFDownloadLink> */}
                          <DownloadPdfButton data={jsonData} paramId={paramId} companyDetails={companyDetails}/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* /add */}
      </div>
      <PdfViewModal show={show} handleClose={handleClose} data={jsonData} paramId={paramId} companyDetails={companyDetails}/>
    </div>
  );
};

export default FinancialPage;
