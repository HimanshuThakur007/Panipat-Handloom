import { Link } from "react-router-dom";
import { Edit, Plus } from 'feather-icons-react/build/IconComponents';
import InputField from "../../../ReusableComponents/InputField";
import { Input } from "antd";
// export const newSamplingColumns = (editHandler)=> [

export const newMeasurmentColumns =(id)=> [
    {
        title: "Type",
        dataIndex: "typeName",
        key: "typeName",
        sorter: (a, b) => a.typeName.length - b.typeName.length,
      },
    {
        title: "Voucher No",
        dataIndex: "enqno",
        key: "enqno",
        sorter: (a, b) => a.enqno.length - b.enqno.length,
      },
    {
        title: "Voucher Date",
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
                  to={'/measurmentpage'}
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

export const editMeasurmentColumns =(id)=> [
    {
        title: "Measurement No",
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
                  to={'/measurmentpage'}
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

export const getMeasurmentColumns = (itemNameOptions, handleInputChange2, handleAddRow, handleDeleteRow, validateRow, tableData) => [
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
      <Input
        name={`subWork-${index}`}
        value={text}
        onChange={(e) => handleInputChange2(e, index, "subWork")}
      />
    ),
  },
  {
    title: "Length",
    dataIndex: "length",
    key: "length",
    render: (text, record, index) => (
      <Input
        value={text}
        onChange={(e) => handleInputChange2(e, index, "length")}
      />
    ),
  },
  {
    title: "Width",
    dataIndex: "width",
    key: "width",
    render: (text, record, index) => (
      <Input
        value={text}
        onChange={(e) => handleInputChange2(e, index, "width")}
      />
    ),
  },
  {
    title: "Height",
    dataIndex: "height",
    key: "height",
    render: (text, record, index) => (
      <Input
        value={text}
        onChange={(e) => handleInputChange2(e, index, "height")}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record, index) => (
      <div className="edit-delete-action">
        <a
          className="me-2 p-2"
          onClick={handleAddRow}
          disabled={!validateRow(record)}
        >
          <span className="feather-add">+</span>
        </a>
        {tableData.length > 1 && (
          <a className="confirm-text p-2" onClick={() => handleDeleteRow(index)}>
            <span className="feather-trash-2"></span>
          </a>
        )}
      </div>
    ),
  },
];
