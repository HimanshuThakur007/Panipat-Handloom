import React,{useState} from 'react'
import ReactLoader from '../../../ReusableComponents/ReactLoader';
import ReactToast from '../../../ReusableComponents/ReactToast';
import Table from "../../../core/pagination/datatable"
import { ProductColumns } from '../../inventory/InventryColumns/InventryColumns';
import { Box,
    ChevronUp,
    Edit,
    Eye,
    Filter,
    GitMerge,
    PlusCircle,
    RotateCcw,
    Sliders,
    StopCircle,
    Trash2,} from 'feather-icons-react/build/IconComponents';
import Select from "react-select";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../Router/all_routes';
import { setToogleHeader } from '../../../core/redux/action';
import useFetch from '../../../Hooks/useFetch';
import DataTable from '../../../common/DataTable';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import DateRangePickerComponent, { defaultEndDate, defaultStartDate } from '../../../ReusableComponents/DateRangePickerComponent';

const EnquirylistPage = () => {
    const callFetch = useFetch()
    const dispatch = useDispatch();
    const route = all_routes
    const [loading, setLoading] = React.useState(false)
    const [dataSource, setDataSource] = React.useState([])
    const [allEnquiryData, setAllEnquiryData] = React.useState([])
      const [dates, setDates] = useState([defaultStartDate, defaultEndDate]);
    // const dataSource = useSelector((state) => state.product_list);
    const data = useSelector((state) => state.toggle_header); 
    const [isFilterVisible, setIsFilterVisible] = useState(false);
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

      const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
      };

      const LoadEnquiryData = async () => {
        let url = `/api/GetEnquryData?rectype=1`;
        console.log("reload");
        try {
          setLoading(true);
          const { res, got } = await callFetch(url, "GET");
          if (res.status == 200) {
            let alldata = got.data;
            setDataSource(alldata)
            console.log("enquiry Table", got);
          }
          setLoading(false);
          console.log("GET Response:", got);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };
      const LoadAllEnquiryData = async () => {
        const [startDate, endDate] = dates;
        const startDateStr = startDate ? startDate.format("DD/MMM/YYYY") : "";
        const endDateStr = endDate ? endDate.format("DD/MMM/YYYY") : "";
        let url = `/api/GetTranList?Rectype=1&FDate=${startDateStr}&TDate=${endDateStr}`;
        console.log('loginurl',url)
        console.log("reload");
        try {
          setLoading(true);
          const { res, got } = await callFetch(url, "GET");
          if (res.status == 200) {
            let alldata = got.data;
            setAllEnquiryData(alldata)
            // setDataSource(alldata)
            console.log("enquiry Table2", got);
          }
          setLoading(false);
          console.log("GET Response:", got);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };
    
      React.useEffect(() => {
        // LoadEnquiryData();
        LoadAllEnquiryData()
      }, [dates]);

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
          sorter: (a, b) => a.vchNo.length - b.vchNo.length,
        },
        {
          title: "Party Name",
          dataIndex: "party",
          key: "party",
          sorter: (a, b) => a.party.length - b.party.length,
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        //   sorter: (a, b) => a.date.length - b.date.length,
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        //   sorter: (a, b) => a.date.length - b.date.length,
        sorter: (a, b) => a.status.length - b.status.length,
        },
        {
            title: "Actions",
            render: (record) => (
              <td className="action-table-data">
                <div className="edit-delete-action">
                  <Link
                    className="me-2 p-2"
                    to={route.addenquiry}
                    state={{code: record.id}}
                    // onClick={()=>editHandler(record)}
                  >
                    <i data-feather="edit" className="feather-edit"></i>
                  </Link>
                  <Link className="confirm-text p-2" to="#">
                    <i
                      data-feather="trash-2"
                      className="feather-trash-2"
                    //   onClick={()=>showConfirmationAlert(deleteHandler,record.id)}
                    ></i>
                  </Link>
                </div>
              </td>
            ),
          },
      ];
    //   const columns = ProductColumns(ProductDelete)
  return (
    <div className="page-wrapper">
        {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Enquiry List</h4>
              <h6>Manage your enquiry</h6>
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
            <Link to={route.addenquiry} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" />
              Add New Enquiry
            </Link>
          </div>
            </li>
          </ul>
        </div>
      
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
          <div className="table-top">
              {/* <div className="search-set">
              </div> */}
               <DateRangePickerComponent value={dates} onChange={onDateChange} />
            </div>
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Box className="info-img" />
                          <Select
                            className="select"
                            options={[]}
                            placeholder="Choose Product"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={[]}
                            placeholder="Choose Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <GitMerge className="info-img" />
                          <Select
                            className="select"
                            options={[]}
                            placeholder="Choose Sub Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={[]}
                            placeholder="Nike"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <i className="fas fa-money-bill info-img" />

                          <Select
                            className="select"
                            options={[]}
                            placeholder="Price"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Link className="btn btn-filters ms-auto">
                            {" "}
                            <i
                              data-feather="search"
                              className="feather-search"
                            />{" "}
                            Search{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              {/* <Table columns={columns} dataSource={dataSource} rowKey={(record)=>record.id}/> */}
              {/* <DataTable columns={columns} data={dataSource} rowSelectionEnabled={false} rowKey={(record)=>record.id}/> */}
              {/* <h5 className="mt-5">All Enquiry Data</h5> */}
              <DataTable columns={columns} data={allEnquiryData} rowSelectionEnabled={false} rowKey={(record) => record.id} />
            </div>
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default EnquirylistPage