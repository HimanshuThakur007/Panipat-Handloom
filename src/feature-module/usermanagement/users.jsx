import React, { useState, useEffect } from "react";
import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../core/pagination/datatable";
// import EditUser from "../../core/modals/usermanagement/edituser";
import AddUsersPage from "../../core/modals-js/usermanagement/addusers";
import PageHeader from "../../ReusableComponents/PageHeader";
import { showConfirmationAlert } from "../../ReusableComponents/ConfirmAlert";
import TableTop from "../../ReusableComponents/TableTop";
import TableTopFilter from "../../ReusableComponents/TableTopFilter";
import { AddUserColumns } from "../AllPageColumns/TableColumns";
import { toggleFilterVisibility } from "./usersFunctionality";
import useFetch from "../../Hooks/useFetch";
import ReactLoader from "../../ReusableComponents/ReactLoader";
import { filterData } from "../../common/filteredFunction";
import DataTable from "../../common/DataTable";

// var userID = 0
const Users = () => {
  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const users = [
    { value: "Choose Name", label: "Choose Name" },
    { value: "Lilly", label: "Lilly" },
    { value: "Benjamin", label: "Benjamin" },
  ];
  const status = [
    { value: "Choose Name", label: "Choose Status" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  const role = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Back-Office" },
  ];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const dataSource = useSelector((state) => state.userlist_data);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userTableList, setUserTableList]= useState([])
  const [searchText, setSearchText] = useState('');
  const [userCode, setUserCode]= useState(0)
    const callFetch = useFetch()
//    // Example of making a GET request
const GetUserData = async () => {
  let url = `/api/GetUserMasterList?UType=1`;
    try {
      setLoading(true)
        const { res, got } = await callFetch(url, 'GET');
        // Handle response data
        if(res.status == 200){
          let alldata = got.data
          let filteredData = filterData(alldata, searchText, ['userName','mobile','emailID','role'])
          setUserTableList(filteredData)
        }
        setLoading(false)
        // console.log('GET Response-user:', got);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        setLoading(false)
    }
};
const handleSearch = (value) => {
  setSearchText(value);
  GetUserData(value)
};
   useEffect(() => {
    GetUserData();
}, [searchText]);

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };


const HandelEdit=(record)=>{
  let userID = record.id
  setUserCode(userID)
// console.log("rrrsss",userID)
}

  // =============================================delete-Handler=======================================================
  const UserDelete = async (ID) => {
    let url = `/api/DelUserMaster?UserID=${ID}`;
      try {
        setLoading(true)
          const { res, got } = await callFetch(url, 'GET');
          // Handle response data
          if(res.status == 200){
            let alldata = got.data
            // alert(got.msg)
            GetUserData()
          
          }
          setLoading(false)
          // console.log('GET Response:', got);
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          setLoading(false)
      }
  };


// const columns = AddUserColumns(HandelEdit,showConfirmationAlert)
const columns = AddUserColumns(HandelEdit,UserDelete)
const resetHandler =(fun)=>{
  // console.log("PPPPRRRRRR")
  // console.log('resetrrrrrrrrrr',typeof fun)
  global.resetFun=fun
}

function reset(){
  global.resetFun()
}


  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
        {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
          <PageHeader
            onClick={() => {
              dispatch(setToogleHeader(!data));
            }}
            clickButton={reset}
            data={data}
            buttonTitle="Add New User"
            modalId="#add-units"

          />
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <TableTop
              handleSearch={handleSearch}
                isFilterVisible={isFilterVisible}
                toggleFilterVisibility={()=>toggleFilterVisibility({setIsFilterVisible })}
                options={oldandlatestvalue}
              />
              {/* /Filter */}

              <TableTopFilter
                roleOptions={role}
                statusOptions={status}
                newestOptions={users}
                isFilterVisible={isFilterVisible}
              />
              {/* /Filter */}
              <div className="table-responsive">
                <DataTable columns={columns} data={userTableList} rowSelectionEnabled={false} rowKey={(record) => record.id}/>
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddUsersPage userID={userCode} setUserCode={setUserCode} resetHandler={resetHandler} GetUserData={GetUserData}/>
      {/* <EditUser /> */}
    </div>
  );
};

export default Users;
