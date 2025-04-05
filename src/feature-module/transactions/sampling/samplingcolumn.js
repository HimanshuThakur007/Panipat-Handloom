import { Link } from "react-router-dom";
import { Edit, Plus } from 'feather-icons-react/build/IconComponents';
import InputField from "../../../ReusableComponents/InputField";
import Select from "react-select";
// export const newSamplingColumns = (editHandler)=> [

export const newSamplingColumns =(id)=> [
    {
        title: "Enquiry No",
        dataIndex: "enqno",
        key: "enqno",
        sorter: (a, b) => a.enqno.length - b.enqno.length,
      },
    {
        title: "Enquiry Date",
        dataIndex: "enqDt",
        key: "enqDt",
        sorter: (a, b) => new Date(a.enqDt) - new Date(b.enqDt),
      },
      {
        title: "Party Name",
        dataIndex: "party",
        key: "party",
        sorter: (a, b) => a.party.length - b.party.length,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        sorter: (a, b) => a.mobile.length - b.mobile.length,
      },
      {
        title: "Visit Date",
        dataIndex: "visitDt",
        key: "visitDt",
      //   sorter: (a, b) => a.date.length - b.date.length,
      sorter: (a, b) => new Date(a.visitDt) - new Date(b.visitDt),
      },
      {
          title: "Actions",
          render: (record) => (
            <td className="action-table-data">
              <div className="edit-delete-action">
                <Link
                  className="me-2 p-2"
                  to={'/samplingpage/1'}
                  state={{code: record, id:id}}
                //   onClick={()=>editHandler(record)}
                >
                <Plus className="feather-add" />
                </Link>
                {/* <Link className="confirm-text p-2" to="#">
                  <i
                    data-feather="trash-2"
                    className="feather-trash-2"
                    onClick={()=>showConfirmationAlert(deleteHandler,record.id)}
                  ></i>
                </Link> */}
              </div>
            </td>
          ),
        },
]
export const editSamplingColumns =(id)=> [
    {
        title: "Sampling No",
        dataIndex: "vchNo",
        key: "vchNo",
        sorter: (a, b) => a.vchNo.length - b.vchNo.length,
      },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
      },
      {
        title: "Party Name",
        dataIndex: "party",
        key: "party",
        sorter: (a, b) => a.party.length - b.party.length,
      },
      
      {
          title: "Actions",
          render: (record) => (
            <td className="action-table-data">
              <div className="edit-delete-action">
                <Link
                  className="me-2 p-2"
                  to={'/samplingpage/1'}
                  state={{code: record, id:id}}
                //   onClick={()=>editHandler(record)}
                >
                <Edit className="feather-edit"/>
                </Link>
                {/* <Link className="confirm-text p-2" to="#">
                  <i
                    data-feather="trash-2"
                    className="feather-trash-2"
                    onClick={()=>showConfirmationAlert(deleteHandler,record.id)}
                  ></i>
                </Link> */}
              </div>
            </td>
          ),
        },
]

export const partyDetails = [
  {
    title: "SrNo",
    dataIndex: "srNo",
    render: (text, record, index) => index + 1,
    key: "srNo",
    sorter: (a, b) => a.srNo.length - b.srNo.length,
  },
{
    title: "Work",
    dataIndex: "work",
    key: "work",
    sorter: (a, b) =>a.work.length - b.work.length,
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
    sorter: (a, b) => a.desc.length - b.desc.length,
  },
]

export const getColumns = (itemNameOptions, handleInputChange, handleAddRow, handleDeleteRow, validateRow, tableData) => [
  {
    title: "Sr. No",
    dataIndex: "srNo",
    key: "srNo",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Subwork",
    dataIndex: "subWork",
    key: "subWork",
    render: (text, record, index) => (
      <InputField
        name={`subWork-${index}`}
        value={text}
        onChange={(e) => handleInputChange(e, index, "subWork")}
      />
    ),
  },
  // {
  //   title: "Item Name",
  //   dataIndex: "itemName",
  //   key: "itemName",
  //   render: (text, record, index) => (
  //     <Select
  //       value={itemNameOptions.find(option => option.value === tableData[index].itemName) || null}
  //       options={itemNameOptions}
  //       onChange={(value) => handleInputChange(value, index, 'itemName')}
  //       // isClearable
  //     />
  //   ),
  // },
  {
         title: "Action",
         key: "action",
         render: (text, record, index) => (
           <td className="action-table-data">
             <div className="edit-delete-action">
               {index === tableData.length - 1 && (
                 <a
                   className="me-2 p-2"
                  //  to="#"
                   onClick={handleAddRow}
                   disabled={!validateRow(tableData[index])}
                 >
                   <Plus className="feather-add" />
                 </a>
               )}
               {tableData.length > 1 && (
                 <a className="confirm-text p-2">
                   <i
                     data-feather="trash-2"
                     className="feather-trash-2"
                     onClick={() => handleDeleteRow(index)}
                   ></i>
                 </a>
               )}
             </div>
           </td>
         ),
       },
];