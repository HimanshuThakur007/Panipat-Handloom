import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import { setToogleHeader } from "../../../core/redux/action";
import useFetch from "../../../Hooks/useFetch";
import DataTable from "../../../common/DataTable";
import { editSamplingColumns, newSamplingColumns } from "./samplingcolumn";
import { RotateCcw, ChevronUp } from "feather-icons-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DateRangePickerComponent, {
  defaultEndDate,
  defaultStartDate,
} from "../../../ReusableComponents/DateRangePickerComponent";

const Samplinglist = () => {
  const { id } = useParams();
  const callFetch = useFetch();
  const dispatch = useDispatch();

  const getsessionData = useMemo(
    () => JSON.parse(sessionStorage.getItem("encryptedData")),
    []
  );
  const userID = getsessionData?.userID;
  let role = getsessionData?.role;

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);

  const data = useSelector((state) => state.toggle_header);

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

  const loadSamplingData = async (type) => {
    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
    const url =
      type === "1"
        ? `/api/GetAssignedList?Rectype=1&Ucode=${
            role === 1 ? 0 : userID
          }&FDate=${startDateStr}&TDate=${endDateStr}`
        : `/api/GetEnquryData?Rectype=2&Ucode=${
            role === 1 ? 0 : userID
          }&FDate=${startDateStr}&TDate=${endDateStr}`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200) {
        setDataSource(got.data);
        setColumns(
          type === "1" ? newSamplingColumns(id) : editSamplingColumns(id)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadSamplingData(id);
    }
  }, [id, dates]);

  return (
    <div className="page-wrapper">
      {loading && (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      )}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>{id === "1" ? "New Sampling List" : "Edit Sampling List"}</h4>
              <h6>Manage your Sampling</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Collapse</Tooltip>}
              >
                <Link
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
          <div className="table-top">
            <DateRangePickerComponent value={dates} onChange={onDateChange} />
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={dataSource}
                rowSelectionEnabled={false}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Samplinglist;
