import { Link } from "react-router-dom";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { all_routes } from "../../../Router/all_routes";
import { showConfirmationAlert } from "../../../ReusableComponents/ConfirmAlert";
import { TbRadioactiveFilled, TbRadioactiveOff } from "react-icons/tb";
var route = all_routes;

export const ProductColumns = (deleteHandler) => [
  {
    title: "Design Name",
    dataIndex: "name",
    render: (text, record) => (
      <span className="productimgname">
        <Link to="#" className="product-img stock-img">
          <ImageWithBasePath alt="" src={record.img} />
        </Link>
        <Link
          to="#"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
            maxWidth: "300px",
          }}
        >
          {text}
        </Link>
      </span>
    ),
    sorter: (a, b) => a.name.length - b.name.length,
    width: "215px",
  },
  // {
  //   title: "SKU",
  //   dataIndex: "skuCode",
  //   sorter: (a, b) => a.skuCode.length - b.skuCode.length,
  // },

  {
    title: "Sagment",
    dataIndex: "categoryName",
    sorter: (a, b) => a.categoryName.length - b.categoryName.length,
  },

  {
    title: "Brand",
    dataIndex: "brandName",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   sorter: (a, b) => a.price.length - b.price.length,
  // },
  {
    title: "Unit",
    dataIndex: "unitName",
    sorter: (a, b) => a.unitName.length - b.unitName.length,
  },
  {
    title: "Qty",
    dataIndex: "qty",
    sorter: (a, b) => a.qty.length - b.qty.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      //  text === 'Activate'?(
      <span
        className={`${
          text === "Activate"
            ? "badge badge-linesuccess"
            : text === "Deactivate"
            ? "badge badge-linedanger"
            : ""
        }`}
      >
        {/* <Link to="#"> Active</Link> */}
        {text === "Activate"
          ? "Active"
          : text === "Deactivate"
          ? "Inactive"
          : ""}
      </span>
      // :()
    ),
    sorter: (a, b) => a.status.length - b.status.length,
  },

  // {
  //   title: "Created By",
  //   dataIndex: "createdby",
  //   render: (text, record) => (
  //     <span className="userimgname">
  //       <Link to="/profile" className="product-img">
  //         <ImageWithBasePath alt="" src={record.img} />
  //       </Link>
  //       <Link to="/profile">{text}</Link>
  //     </span>
  //   ),
  //   sorter: (a, b) => a.createdby.length - b.createdby.length,
  // },
  {
    title: "Action",
    render: (text, record) => (
      <td className="action-table-data">
        <div className="edit-delete-action">
          <div className="input-block add-lists"></div>
          {record &&
            record.code &&
            (record.status === "Activate" ? (
              <Link
                className="me-2 p-2"
                to={route.addproductpage}
                state={{ code: record.code }}
              >
                <Edit className="feather-edit" />
              </Link>
            ) : (
              <a
                className="me-2 p-2 text-muted"
                style={{
                  cursor: "not-allowed",
                  background: "grey",
                  color: "white",
                }}
              >
                <Edit className="feather-edit" style={{ color: "white" }} />
              </a>
            ))}
          <a
            className="confirm-text p-2"
            onClick={() => showConfirmationAlert(deleteHandler, record.code)}
          >
            {record.status === "Activate" ? (
              <TbRadioactiveOff />
            ) : (
              <TbRadioactiveFilled />
            )}
          </a>
        </div>
      </td>
    ),
  },
];
