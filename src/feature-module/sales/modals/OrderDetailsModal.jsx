/* eslint-disable react/prop-types */
import { Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const OrderDetailsModal = ({orderDetails,onRowClick}) => {
    const columns = [
        {
          title: "Product Name",
          dataIndex: "productName",
          sorter: (a, b) => a.productName.length - b.productName.length,
        },
        {
          title: "Quantity",
          dataIndex: "qty",
          sorter: (a, b) => a.qty.length - b.qty.length,
        },
        {
          title: "Amount",
          dataIndex: "amount",
          sorter: (a, b) => a.amount.length - b.amount.length,
        },
       
        // {
        //   title: "Status",
        //   dataIndex: "statusName",
        //   render: (text, record) => (
        //     <>
        //       {text === "Pending" && (
        //         <span className="badges bg-lightred">{text}</span>
        //       )}
        //       {text === "Order Place" && (
        //         <span className="badges bg-lightgreen">{text}</span>
        //       )}
        //     </>
        //   ),
        //   sorter: (a, b) => a.statusName.length - b.statusName.length,
        // },
        // {
        //   title: "Payment",
        //   dataIndex: "Payment",
        //   render: (text, record) => (
        //     <>
        //       {text === "Paid" && (
        //         <span className="badges bg-lightgreen">{text}</span>
        //       )}
        //       {text === "Due" && <span className="badges bg-lightred">{text}</span>}
        //     </>
        //   ),
        //   sorter: (a, b) => a.Payment.length - b.Payment.length,
        // },
        
        {
          title: "Action",
          render: (text, record) => (
            <>
              <div className="text-center">
                <Link
                  className="action-set"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  <i className="fa fa-ellipsis-v" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item"
                      onClick={()=>{onRowClick(record,'1','2')}}
                    >
                      {/* <img src="" className="me-2" alt="img" /> */}
                      Approved
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#shipped"
                      onClick={()=>{onRowClick(record,'2',"2")}}
                    >
                      {/* <img src="" className="me-2" alt="img" /> */}
                      Shipped
                      {/* shipped */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item"
                    //   data-bs-toggle="modal"
                    //   data-bs-target="#showpayment"
                    onClick={()=>{onRowClick(record,'3',"2")}}
                    >
                      {/* <img src="" className="me-2" alt="img" /> */}
                      Out for Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item"
                    //   data-bs-toggle="modal"
                    //   data-bs-target="#createpayment"
                      onClick={()=>{onRowClick(record,'4','2')}}
                    >
                      {/* <img src="" className="me-2" alt="img" /> */}
                      Delivered
                    </Link>
                  </li>
                  <li>
                    <Link to="#" 
                    className="dropdown-item"
                    onClick={()=>{onRowClick(record,'5',"2")}}
                    >
                      {/* <img src="" className="me-2" alt="img" /> */}
                      Cancel
                    </Link>
                  </li>
                 
                 
                </ul>
              </div>
            </>
          ),
        },
      ];
    //   const onRowClick =(record,statusId)=>{
    //     console.log('recordList',record)
    //     console.log('statusId',statusId)
    // }
  return (
    <>
      <div
            className="modal fade"
            id="orderdetails"
            tabIndex={-1}
            aria-labelledby="orderdetails"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
              <div className="modal-content">
                <div className="page-wrapper-new p-0">
                  <div className="content">
                    <div className="modal-header border-0 custom-modal-header">
                      <div className="page-title">
                        <h4>Shipped</h4>
                      </div>
                      <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body custom-modal-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="modal-body-table total-orders">
                          

                            <div className="table-responsive">
                              <Table 
                              className="table datanew dataTable no-footer"
                              columns={columns}
                              dataSource={orderDetails}
                              pagination={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer border-0'>
                      <button className='btn btn-submit'>Save</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default OrderDetailsModal