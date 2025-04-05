/* eslint-disable react/prop-types */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { PlusCircle } from "react-feather";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";

const PageHeader = ({data,onClick,buttonTitle,modalId,clickButton}) => {
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
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <>
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>User List</h4>
            <h6>Manage Your Users</h6>
          </div>
        </div>
        <ul className="table-top-head">
          {/* <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <Link>
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li> */}
          {/* <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <Link data-bs-toggle="tooltip" data-bs-placement="top">
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li> */}
          {/* <li>
            <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
              <Link data-bs-toggle="tooltip" data-bs-placement="top">
                <i data-feather="printer" className="feather-printer" />
              </Link>
            </OverlayTrigger>
          </li> */}
         
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <Link
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                id="collapse-header"
                className={data ? "active" : ""}
                onClick={onClick}
                // onClick={() => {
                //   dispatch(setToogleHeader(!data));
                // }}
              >
                <ChevronUp />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
        <div className="page-btn">
          <a
            to="#"
            className="btn btn-added"
            data-bs-toggle="modal"
            // data-bs-target="#add-units"
            data-bs-target={modalId}
            onClick={clickButton}
          >
            <PlusCircle className="me-2" />
            {buttonTitle}
          </a>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
