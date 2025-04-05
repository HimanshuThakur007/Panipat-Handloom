import React, { useState } from 'react';
import ReactLoader from '../../../ReusableComponents/ReactLoader';
import ReactToast, { showToastError, showToastMessage } from '../../../ReusableComponents/ReactToast';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select'; 
import DataTable from '../../../common/DataTable';
import useFetch from '../../../Hooks/useFetch';
import { all_routes } from '../../../Router/all_routes';
import { Dropdown, Menu } from 'antd';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import DatePicker from "react-datepicker";
import moment from "moment";
import InputSelect from '../../../ReusableComponents/InputSelect';
import DateRangePickerComponent, { defaultEndDate, defaultStartDate } from '../../../ReusableComponents/DateRangePickerComponent';

const SalespersonList = () => {
  const callFetch = useFetch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const data = useSelector((state) => state.toggle_header);
  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [visitDate, setVisitDate] = useState(new Date());
  const [assignToList, setAssignToList] = useState([]);
  const [rowId, setRowId] = useState(0)
        const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
    const [statusError, setStatusError] = useState(false);
    const [remarkError, setRemarkError] = useState(false);
    const [assignToError, setAssignToError] = useState(false);
    const [visitDateError, setVisitDateError] = useState(false);
    const [assignSelect, setAssignSelect] = useState({
      status:null,
      assignTo: null,
      asssignPerson: null
    })

  const statusOptions = [
    { value: 1, label: 'Hold' },
    // { value: 2, label: 'Approval' },
    { value: 4, label: 'Assign' },
    { value: 3, label: 'Cancel' },
  ];
  const asstgnToOptions = [
    { value: 1, label: 'Sampling' },
    { value: 2, label: 'Measurment' },
    { value: 3, label: 'Quotation' },
  ];
  // options for assign to
const handleSelectChange = (selectedOption, selectName)=>{
  setAssignSelect((prev)=>({
    ...prev,
    [selectName]: selectedOption
  }))
}

  const AssignToPersonData = async () => {
    const [startDate, endDate] = dates;
    const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
    const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
    let url = `/api/GetEnqPendingList?Rectype=1&Id=${id==="1"?1:2}&FDate=${startDateStr}&TDate=${endDateStr}`;
    console.log('assign-url',url)
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");
      if (res.status === 200 && got.status === 1) {
        setDataSource(got.data);
        setLoading(false);
        console.log('data response', got)
      }else{
        console.log('Response Error', got)
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
          label: item.userName
        }));
        setAssignToList(correctData);
      }else{
        console.log("Response", got)
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
  }, [id]);


  const handleActionClick = (record) => {
    setRowId(record.id)
    setRemark(''); 
    // setAssignTo(null);
    // setStatus(null)
    setAssignSelect({
      status:null,
      assignTo: null,
      asssignPerson: null
    })
    setVisitDate(new Date()); 
    setShowModal(true); 
  };

  // Handle Form Submission
const handleSubmit = async () => {
  let hasError = false;

  // Validate status
  if (!assignSelect?.status) {
    setStatusError(true);
    hasError = true;
    showToastError('Status is mandatory');
  } else {
    setStatusError(false);
  }

  // Validate remark
  if (!remark) {
    setRemarkError(true);
    hasError = true;
    showToastError('Remark is mandatory');
  } else {
    setRemarkError(false);
  }

  // if (status === 4 ) {
  //       setAssignToError(true);
  //       hasError = true;
  //       showToastError('Assign To is mandatory for Approval status');
  //     } else {
  //       setAssignToError(false);
  //     }

  // Additional checks if the status is 'Approval'
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
    Id: rowId,
    Status: assignSelect?.status?.value||0,
    Dest: assignSelect?.assignTo?.value || 0,
    VisitDate: formattedDate || '',
    AssignTo: assignSelect?.asssignPerson?.value || 0,
    Remark: remark || "",
  };
  // const Jsondata = {
  //   id: rowId,
  //   SU: id=== "1"?1:2,
  //   status: status || 0,
  //   remark: remark || '', 
  //   assignTo: assignTo?.value || 0, 
  //   visitDate: formattedDate || ''
  // };

  console.log('status-Json==>', JSON.stringify(Jsondata));
  // let saveurl = `/api/ApproveEnquiry`;
  let saveurl = `/api/EnqApproval`;
  try {
    setLoading(true);

    const { res, got } = await callFetch(saveurl, "POST", Jsondata);

    if (res.status === 200 && got.status === 1 ) {
      showToastMessage(got.msg);
      AssignToPersonData();
      setShowModal(false);
      setLoading(false);
    } else {
      showToastError(got.msg);
      setLoading(false);
      console.log('Response :', got);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
  }
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

  const columns = [
    {
      title: "Enquiry No",
      dataIndex: "vchNo",
      key: "vchNo",
      sorter: (a, b) => {
        const numA = parseInt(a.vchNo.match(/\d+/g)?.[0] || 0, 10);
        const numB = parseInt(b.vchNo.match(/\d+/g)?.[0] || 0, 10);
        return numA - numB;
      }
    },
    {
      title: "Party Name",
      dataIndex: "party",
      key: "party",
      sorter: (a, b) => a.party.length - b.party.length
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    id === "1" ? {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
          // Log status to check if it's populated correctly
          console.log('record.status:', record.status);
      
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
      }:{
        
          title: "Visit Date",
          dataIndex: "visitDate",
          key: "visitDate",
          sorter: (a, b) => a.visitDate.length - b.visitDate.length
        
      },
   
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return (
          <Link to="#" onClick={() => handleActionClick(record)}>
            <IoEllipsisVerticalOutline style={{ fontSize: '18px', cursor: 'pointer' }} />
          </Link>
        );
      },
      align: 'center',
    }
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
                  ? "Approval List"
                  : "Assign to Sales Person List (Sampling)"}
              </h4>
              <h6>Manage your {id === "1" ? "Approval" : "Sales Person"}</h6>
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
            <InputSelect
              label="Status"
              value={assignSelect.status}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "status")
              }
              options={statusOptions}
              className={assignToError ? "border-red" : ""}
            />
            {/* <InputSelect
            label="Status"
             value={statusOptions.find(option => option.value === status)}
             onChange={(option) => setStatus(option.value)}
             options={statusOptions}
             className={statusError ? 'border-red' : ''}
            /> */}
          </Form.Group>

          {/* Show additional fields if status is 'approval' */}
          {/* {status === 4 && id==="2" && ( */}

          <Form.Group>
            <InputSelect
              label="Assign For"
              value={assignSelect.assignTo}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "assignTo")
              }
              options={asstgnToOptions}
              className={assignToError ? "border-red" : ""}
            />
          </Form.Group>
          {assignSelect?.assignTo?.value === 1 ||
          assignSelect?.assignTo?.value === 2 ? (
            <>
              <Form.Group>
                {/* <Form.Label>Assign To Person</Form.Label> */}
                <InputSelect
                  label="Assign To Person"
                  value={assignSelect.asssignPerson}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "asssignPerson")
                  }
                  options={assignToList}
                  className={assignToError ? "border-red" : ""}
                />
              </Form.Group>
              {/* )} */}
              {/* {status === 2 && id === "1" && ( */}
              <Form.Group>
                <Form.Label>Visit Date</Form.Label>
                <DatePicker
                  className={`form-control ${
                    visitDateError ? "border-red" : ""
                  }`}
                  selected={visitDate}
                  onChange={(date) => setVisitDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Group>
              {/* )} */}
            </>
          ) : null}

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

export default SalespersonList;
