import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Edit, Eye, Globe, Trash2, User } from "react-feather";
import { Switch } from 'antd';
import { showConfirmationAlert } from '../../ReusableComponents/ConfirmAlert';

export const AddUserColumns = (editHandler, deleteHandler)=>[
    {
        title: "User Name",
        dataIndex: "userName",
        render: (text, record) => (
          <span className="userimgname">
            {/* <Link to="#" className="userslist-img bg-img">
              <ImageWithBasePath alt="" src={record.img} />
            </Link> */}
            <div>
              <Link to="#">{text}</Link>
            </div>
          </span>
        ),
        sorter: (a, b) => a.userName.length - b.userName.length,
      },
  
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        sorter: (a, b) => a.mobile.length - b.mobile.length,
      },
      {
        title: "Email",
        dataIndex: "emailID",
        sorter: (a, b) => a.emailID.length - b.emailID.length,
      },
      {
        title: "Role",
        dataIndex: "role",
        sorter: (a, b) => a.role.length - b.role.length,
      },
      // {
      //   title: "Created On",
      //   dataIndex: "createdon",
      //   sorter: (a, b) => a.createdon.length - b.createdon.length,
      // },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   render: (text) => (
      //     <div>
      //       {text === "Active" && (
      //         <span className="badge badge-linesuccess">{text}</span>
      //       )}
      //       {text === "Inactive" && (
      //         <span className="badge badge-linedanger">{text}</span>
      //       )}
      //     </div>
      //   ),
      //   sorter: (a, b) => a.status.length - b.status.length,
      // },
      {
        title: "Actions",
        // dataIndex: "actions",
        // key: "actions",
        render: (record) => (
          <td className="action-table-data">
            <div className="edit-delete-action">
              {/* <Link className="me-2 p-2" to="#">
                <i
                  data-feather="eye"
                  className="feather feather-eye action-eye"
                ></i>
              </Link> */}
              <Link
                className="me-2 p-2"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
                onClick={()=>editHandler(record)}
              >
                <i data-feather="edit" className="feather-edit"></i>
              </Link>
              <Link className="confirm-text p-2" to="#">
                <i
                  data-feather="trash-2"
                  className="feather-trash-2"
                  onClick={()=>showConfirmationAlert(deleteHandler,record.id)}
                ></i>
              </Link>
            </div>
          </td>
        ),
      },
]

export const AddCustomerColumns = (editHandler, deleteHandler, id)=> [
   

      {
        title: "Company Name",
        dataIndex: "companyName",
        sorter: (a, b) => a.companyName.length - b.companyName.length,
      },
  
      {
        title:`${id === "1" ?"Customer Name" : "Supplier Name"}`,
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
      },

      // {
      //   title: "Code",
      //   dataIndex: "Code",
      //   sorter: (a, b) => a.Code.length - b.Code.length,
      // },
      
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        sorter: (a, b) => a.mobile - b.mobile,
      },
  
      {
        title: "Email",
        dataIndex: "emailID",
        sorter: (a, b) => a.emailID.length - b.emailID.length,
      },
  
      {
        title: "Country",
        dataIndex: "countryName",
        // sorter: (a, b) => a.countryName.length - b.countryName.length,
      },
  
      {
        title: "City",
        dataIndex: "city",
        sorter: (a, b) => a.city.length - b.city.length,
      },
      // {
      //   title: "Status",
      //   dataIndex: "isApproved",
      //   render: (text, record) => (
      //     <>
      //       {text == 0 && (
      //         <span className="badges bg-lightred">Not Approved</span>
      //       )}
      //       {text == 1 && (
      //         <span className="badges bg-lightgreen">Approved</span>
      //       )}
           
      //     </>
      //   ),
      //   sorter: (a, b) => a.isApproved - b.isApproved,
      // },
  
//       {
//         title: "Action",
//         render: (record) => (
//           <>

//           <div className="text-center">
//             <Link
//               className="action-set"
//               to="#"
//               data-bs-toggle="dropdown"
//               aria-expanded="true"
//             >
//               <i className="fa fa-ellipsis-v" aria-hidden="true" />
//             </Link>
//             <ul className="dropdown-menu">
             
//               <li>
//                 <Link
//                   to="#"
//                   className="dropdown-item"
//                   data-bs-toggle="modal"
//                   data-bs-target="#add-units"
//                   onClick={()=>editHandler(record)}
               
//                 >
//                 Edit
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="#"
//                   className="dropdown-item"
//                   onClick={() => showConfirmationAlert(deleteHandler,record.id)}
               
//                 >
//                 Delete
//                 </Link>
//               </li>
              
//             </ul>
//           </div>
// </>
//         ),
//       },

{
  title: "Actions",
  // dataIndex: "actions",
  // key: "actions",
  render: (record) => (
    <td className="action-table-data">
      <div className="edit-delete-action">
        {/* <Link className="me-2 p-2" to="#">
          <i
            data-feather="eye"
            className="feather feather-eye action-eye"
          ></i>
        </Link> */}
        <Link
          className="me-2 p-2"
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#add-units"
          onClick={()=>editHandler(record)}
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link className="confirm-text p-2" to="#">
          <i
            data-feather="trash-2"
            className="feather-trash-2"
            onClick={()=>showConfirmationAlert(deleteHandler,record.id)}
          ></i>
        </Link>
      </div>
    </td>
  ),
},
]

