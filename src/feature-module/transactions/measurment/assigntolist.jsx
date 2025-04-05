import React, { useState } from "react";
import ReactLoader from "../../../ReusableComponents/ReactLoader";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../../../ReusableComponents/ReactToast";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import DataTable from "../../../common/DataTable";
import useFetch from "../../../Hooks/useFetch";
import { all_routes } from "../../../Router/all_routes";
import { Dropdown, Menu } from "antd";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import moment from "moment";
import DateRangePickerComponent, {
  defaultEndDate,
  defaultStartDate,
} from "../../../ReusableComponents/DateRangePickerComponent";

const AssignToList = () => {
  const callFetch = useFetch();
  const { id } = useParams();
  const dispatch = useDispatch();
  const route = all_routes;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
  const data = useSelector((state) => state.toggle_header);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null); // Store selected status
  const [remark, setRemark] = useState("");
  const [assignTo, setAssignTo] = useState(null);
  const [visitDate, setVisitDate] = useState(new Date());
  const [assignToList, setAssignToList] = useState([]);
  const [rowId, setRowId] = useState(0);

  // Validation states
  const [statusError, setStatusError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [assignToError, setAssignToError] = useState(false);
  const [visitDateError, setVisitDateError] = useState(false);

  // Options for Status Select
  // const statusOptions = [
  //   { value: 1, label: 'Hold' },
  //   { value: 2, label: 'Assign' },
  //   // { value: 3, label: 'Cancel' },
  // ];
  const statusOptions = [
    ...(id === "1" ? [{ value: 1, label: "Hold" }] : []),
    id === "1"
      ? { value: 2, label: "Approval" }
      : { value: 4, label: "Assign" },
  ];

  const assignToHandler = (selected) => {
    setAssignTo(selected);
  };

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

  const AssignToPersonData = async () => {
    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
    let url = `/api/GetPendingSampleList?id=${
      id === "1" ? 1 : 2
    }&FDate=${startDateStr}&TDate=${endDateStr}`;
    console.log("url", url);
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200 && got.status === 1) {
        setDataSource(got.data);
        setLoading(false);
        console.log("data response", got);
      } else {
        console.log("Response Error", got);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const getAssignList = async () => {
    let url = `/api/GetUserMasterList?UType=1&Roll=3`;
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200 && got.status === 1) {
        const correctData = got.data.map((item) => ({
          value: item.id,
          label: item.userName,
        }));
        setAssignToList(correctData);
      } else {
        console.log("Response", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    AssignToPersonData();
    getAssignList();
  }, [id, dates]);

  const handleActionClick = (record) => {
    setRowId(record.id);
    setRemark("");
    setAssignTo(null);
    setStatus(null);
    setVisitDate(new Date());
    setShowModal(true);
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    let hasError = false;

    // Validate status
    if (!status) {
      setStatusError(true);
      hasError = true;
      showToastError("Status is mandatory");
    } else {
      setStatusError(false);
    }

    // Validate remark
    if (!remark) {
      setRemarkError(true);
      hasError = true;
      showToastError("Remark is mandatory");
    } else {
      setRemarkError(false);
    }

    // Additional checks if the status is 'Approval'
    // if (status === 4 ) {
    //   setAssignToError(true);
    //   hasError = true;
    //   showToastError('Assign To is mandatory for Approval status');
    // } else {
    //   setAssignToError(false);
    // }
    // if (status === 2) {
    //   if (!assignTo) {
    //     setAssignToError(true);
    //     hasError = true;
    //     showToastError('Assign To is mandatory for Approval status');
    //   } else {
    //     setAssignToError(false);
    //   }

    //   if (!visitDate) {
    //     setVisitDateError(true);
    //     hasError = true;
    //     showToastError('Visit Date is mandatory for Approval status');
    //   } else {
    //     setVisitDateError(false);
    //   }
    // }

    if (hasError) {
      return;
    }

    const formattedDate = moment(visitDate).format("DD/MMM/YYYY");
    const Jsondata = {
      id: rowId,
      SU: id === "1" ? 1 : 2,
      status: status || 0,
      remark: remark || "",
      assignTo: assignTo?.value || 0,
      visitDate: formattedDate || "",
    };

    console.log("saved-Data", JSON.stringify(Jsondata));
    let saveurl = `/api/ApproveEnquiry`;
    try {
      setLoading(true);

      const { res, got } = await callFetch(saveurl, "POST", Jsondata);
      console.log("ggtt", got);
      if (res.status === 200 && got.status === 1) {
        showToastMessage(got.msg);
        AssignToPersonData();
        setShowModal(false);
        setLoading(false);
      } else {
        showToastError(got.msg);
        setLoading(false);
        console.log("Response :", got);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Sampling No",
      dataIndex: "sampleNo",
      key: "sampleNo",
      sorter: (a, b) => {
        const numA = parseInt(a.sampleNo.match(/\d+/g)?.[0] || 0, 10);
        const numB = parseInt(b.sampleNo.match(/\d+/g)?.[0] || 0, 10);
        return numA - numB;
      },
    },
    {
      title: "Sampling Date",
      dataIndex: "sampleDt",
      key: "sampleDt",
      sorter: (a, b) => new Date(a.sampleDt) - new Date(b.sampleDt),
    },
    {
      title: "Enquiry No",
      dataIndex: "enqno",
      key: "enqno",
      sorter: (a, b) => {
        const numA = parseInt(a.enqno.match(/\d+/g)?.[0] || 0, 10);
        const numB = parseInt(b.enqno.match(/\d+/g)?.[0] || 0, 10);
        return numA - numB;
      },
    },
    {
      title: "Party Name",
      dataIndex: "party",
      key: "party",
      sorter: (a, b) => a.party.length - b.party.length,
    },

    {
      title: "Visit Date",
      dataIndex: "visitDt",
      key: "visitDt",
      sorter: (a, b) => new Date(a.visitDt) - new Date(b.visitDt),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },

    id === "1" && {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return (
          <>
            {record.status === "Hold" && (
              // <span className="badge badge-linedanger">{text}</span>
              <span className="text-danger">{text}</span>
            )}
            {record.status === "Pending" && (
              // <span className="badges badge-linesuccess">{text}</span>
              <span className="text-primary">{text}</span>
            )}
            {!record.status && (
              <span className="badges bg-lightgray">No Status</span> // Handle empty or undefined status
            )}
          </>
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status), // String comparison for sorting
    },

    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Link to="#" onClick={() => handleActionClick(record)}>
            <IoEllipsisVerticalOutline
              style={{ fontSize: "18px", cursor: "pointer" }}
            />
          </Link>
        );
      },
      align: "center",
    },
  ];

  return (
    <div className="page-wrapper">
      <ReactToast />
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>
                {id === "1"
                  ? "Approval for Measurment"
                  : "Assign for Measurment"}
              </h4>
              <h6>Manage your Measurment</h6>
            </div>
          </div>
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

      {/* Modal for Hold/Cancel/Approval */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Select
              value={statusOptions.find((option) => option.value === status)}
              onChange={(option) => setStatus(option.value)}
              options={statusOptions}
              className={statusError ? "border-red" : ""}
            />
          </Form.Group>

          {/* Show additional fields if status is 'approval' */}
          {status === 4 && id === "2" && (
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Select
                value={assignTo}
                onChange={assignToHandler}
                options={assignToList}
                className={assignToError ? "border-red" : ""}
              />
            </Form.Group>
          )}
          {status === 2 && id === "1" && (
            <Form.Group>
              <Form.Label>Visit Date</Form.Label>
              <DatePicker
                className={`form-control ${visitDateError ? "border-red" : ""}`}
                selected={visitDate}
                onChange={(date) => setVisitDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className={remarkError ? "border-red" : ""}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignToList;
