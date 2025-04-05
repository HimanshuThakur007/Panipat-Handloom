/* eslint-disable react/prop-types */
import { Edit } from "feather-icons-react/build/IconComponents";
import React from "react";
import { Link } from "react-router-dom";

const MeasurmentUpdateWorkTable = ({
  groupedWorkData,
  itemNameOptions,
  handleEditFromTable,
  handleDeleteFromTable,
}) => {
  return (
    <div className="col-12">
      {groupedWorkData.map((workData, workIndex) => (
        <div key={workData.work} className="mt-4">
          <div
            style={{
              backgroundColor: "black",
              padding: "10px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 className="m-0" style={{ color: "white" }}>
              {workIndex + 1}. {workData.work}
            </h4>
            <a
              onClick={() => handleEditFromTable(workData.work)}
              className="p-2"
              style={{ color: "white" }}
            >
              <Edit className="feather-edit" />
            </a>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Subwork</th>
                <th>Length</th>
                <th>Width</th>
                <th>Height</th>
                {/* <th>Item Name</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workData.subwork.map((record, index) => (
                <tr key={record.globalIndex}>
                  <td>{index + 1}</td>
                  <td>{record.subWork}</td>
                  <td>{record.length}</td>
                  <td>{record.width}</td>
                  <td>{record.height}</td>
                  {/* <td>
                    {itemNameOptions.find(item => item.value === record.itemName)?.label || record.itemName}
                  </td> */}
                  <td className="">
                    <a className="confirm-text p-2">
                      <i
                        data-feather="trash-2"
                        className="feather-trash-2"
                        onClick={() => handleDeleteFromTable(workData.work, record.globalIndex)}
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MeasurmentUpdateWorkTable;
