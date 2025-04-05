import React, { useState, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, FileText, PlusCircle, RotateCcw, Sliders, StopCircle, User } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from 'react-feather';
import Select from 'react-select';
import { DatePicker } from 'antd';
// import AddInvoice from '../../components/Invoice/AddInvoice';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MdEdit } from "react-icons/md";
import ReactLoader from '../../ReusableComponents/ReactLoader';
import { useAuthContext } from "../../common/AuthContext";
import moment from 'moment';


const SalesList = () => {
    const { url, port, state, actions } = useAuthContext();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading , setLoading] = useState(false);
    const [getSaleListData, setGetSaleListData] = useState([])


    const navigate = useNavigate();

    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisibility) => !prevVisibility);
    };


    
      let searchInput;

      useEffect(() => {
        getSaleList()
      },[url, port])
 const getSaleList  = async() => {
    const apiurl = `${url}:${port}/api/GetSaleDetails`;
    try {
          setLoading(true);
          const response  =  await fetch(apiurl);
          const result  =  await response.json();
          console.log(result)
          if(result.status == 1){
              setGetSaleListData(result.data)
          }
         setLoading(false)
    } catch (error) {
        console.log(error)
    }
}


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


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
    )






//----for  searching-----------------
const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => 
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    render: text => searchedColumn === dataIndex ? <span style={{ fontWeight: 'bold' }}>{text}</span> : text,
  });
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setSearchText('');
    setSearchedColumn('');
    setGetSaleListData(data); 
  };
  
  //----edit  handler-------------
  const handleEdit = (record) => {
    console.log("Edit record:", record);

    navigate('/add-invoice', { state: { vchCode: record.vchCode } });
  };


      const columns = [
        {
          title: 'Acc Name',
          dataIndex: 'accName',
          key: 'accName',
          sorter: (a, b) => a.accName.localeCompare(b.accName),
          ...getColumnSearchProps('accName'),
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => moment(a.date, 'DD/MM/YYYY').unix() - moment(b.date, 'DD/MM/YYYY').unix(),
          ...getColumnSearchProps('date'),
        },
        {
          title: 'VCH No.',
          dataIndex: 'vchNo',
          key: 'vchNo',
          sorter: (a, b) => a.vchNo.localeCompare(b.vchNo),
          ...getColumnSearchProps('vchNo'),
        },
        {
          title: 'QTY',
          dataIndex: 'qty',
          key: 'qty',
          sorter: (a, b) => a.qty - b.qty,
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Button  onClick={() => handleEdit(record)}>
              <MdEdit size={20} style={{color:'green'}} />
            </Button>
          ),
        },
      ];
    

  



    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                {loading ? (
                        <ReactLoader loaderClass="position-absolute" loading={loading} />
                    ) : null}
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Sales List</h4>
                                <h6>Manage Your Sales</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                    <Link>
                                        <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i data-feather="printer" className="feather-printer" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <RotateCcw />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>

                                    <Link
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        id="collapse-header"
                                        className={data ? "active" : ""}
                                        onClick={() => { dispatch(setToogleHeader(!data)) }}
                                    >
                                        <ChevronUp />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                        </ul>
                        <div className="page-btn">
                            <Link
                                to="/add-invoice"
                                className="btn btn-added"
                                // data-bs-toggle="modal"
                                // data-bs-target="#add-sales-new"
                            >

                                <PlusCircle className="me-2" />
                                Add New Sales
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
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
                                <div className="search-path">
                                    <div className="d-flex align-items-center">
                                        <div className="search-path">
                                            <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
                                                <Filter
                                                    className="filter-icon"
                                                    onClick={toggleFilterVisibility}
                                                />
                                                <span onClick={toggleFilterVisibility}>
                                                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                    
                            </div>
                            {/* /Filter */}
                            <div
                                className={`card${isFilterVisible ? ' visible' : ''}`}
                                id="filter_inputs"
                                style={{ display: isFilterVisible ? 'block' : 'none' }}
                            >
                        
                            </div>
                            {/* /Filter */}
                   
                            <div className="invoice-table-container" style={{ height: '60vh', overflow: 'auto' }}>
                                <Table
                                    columns={columns}
                                    dataSource={getSaleListData}
                                    pagination={false}
                                    scroll={{ y: 'calc(58vh - 45px)', x: '100%' }}
                                   
                                />
                                </div>
                             
                        </div>
                    </div>
                    {/* /product list */}
                </div>
            </div>
            <>
{/* --------------------------------need to remove------------ADD  INVOIVCE-------------------------------------- */}


             {/* <AddInvoice /> */}
{/* ------------------------------------------------------------------------- */}


            </>

        </div>
    )
}

export default SalesList
