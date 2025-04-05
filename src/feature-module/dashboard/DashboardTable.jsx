/* eslint-disable react/prop-types */
import React from 'react'
import DataTable from '../../common/DataTable'

const DashboardTable = ({header,columns,data}) => {
  return (
    <div className="col-xl-6 col-sm-12 col-12 d-flex">
      <div className="card flex-fill default-cover mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">{header}</h4>
        </div>
        <div className="card-body">
          <DataTable
            columns={columns}
            data={data}
            rowSelectionEnabled={false}
            rowKey={(index) => index + 1}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardTable