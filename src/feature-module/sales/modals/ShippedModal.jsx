/* eslint-disable react/prop-types */
// import React from 'react'
// import { Link } from 'react-router-dom'
// import InputField from '../../../ReusableComponents/InputField'

// const ShippedModal = ({inputValues,setInputValues}) => {
//   return (
//     <>
//       <div
//         className="modal fade"
//         id="shipped"
//         tabIndex={-1}
//         aria-labelledby="shipped"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
//           <div className="modal-content">
//             <div className="page-wrapper-new p-0">
//               <div className="content">
//                 <div className="modal-header border-0 custom-modal-header">
//                   <div className="page-title">
//                     <h4>Shipped</h4>
//                   </div>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   >
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body custom-modal-body">
//                   <div className="row">
//                     <div className="col-lg-12">
//                       <div className="modal-body-table total-orders">
//                         <InputField label="AWS" value={inputValues} onChange={(e) => setInputValues(e.target.value)}/>

//                         {/* <div className="table-responsive">
//                               <table className="table  datanew">
//                                 <thead>
//                                   <tr>
//                                     <th>Date</th>
//                                     <th>Reference</th>
//                                     <th>Amount</th>
//                                     <th>Paid By</th>
//                                     <th className="no-sort">Action</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   <tr>
//                                     <td>19 Jan 2023</td>
//                                     <td>INV/SL0101</td>
//                                     <td>$1500</td>
//                                     <td>Cash</td>
//                                     <td className="action-table-data">
//                                       <div className="edit-delete-action">
//                                         <Link className="me-3 p-2" to="#">
//                                           <i
//                                             data-feather="printer"
//                                             className="feather-rotate-ccw"
//                                           />
//                                         </Link>
//                                         <Link
//                                           className="me-3 p-2"
//                                           to="#"
//                                           data-bs-toggle="modal"
//                                           data-bs-target="#editpayment"
//                                         >
//                                           <i
//                                             data-feather="edit"
//                                             className="feather-edit"
//                                           />
//                                         </Link>
//                                         <Link
//                                           className="confirm-text p-2"
//                                           to="#"
//                                         >
//                                           <i
//                                             data-feather="trash-2"
//                                             className="feather-trash-2"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0">
//                   <button className="btn btn-submit">Save</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ShippedModal

/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../../ReusableComponents/InputField'

const ShippedModal = ({ inputValues, setInputValues, isOpen, onClose, onSave }) => {
  return (
    <>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="shipped"
        tabIndex={-1}
        aria-labelledby="shipped"
        aria-hidden="true"
        style={{ display: isOpen ? 'block' : 'none' }}
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
                    onClick={onClose}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="modal-body-table total-orders">
                        <InputField label="AWS" value={inputValues} onChange={(e) => setInputValues(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-submit" onClick={onSave}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippedModal;
