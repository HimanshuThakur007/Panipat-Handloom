/* eslint-disable react/prop-types */
import { ChevronUp } from "feather-icons-react/build/IconComponents";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Brand from "../../core/modals/inventory/brand";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Table from "../../core/pagination/datatable";
import { setToogleHeader } from "../../core/redux/action";

const LeadListPage = ({ leadTable, columns }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Lead List</h4>
              <h6>Manage Your Leads</h6>
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
          </ul>
        </div>
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                  />
                  <Link to className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <Table columns={columns} dataSource={leadTable} />
            </div>
          </div>
        </div>
        <Brand />
      </div>
    </div>
  );
};

export default LeadListPage;
