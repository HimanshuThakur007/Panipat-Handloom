import React from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../common/AuthContext";

const Profile = () => {
  const { url, port, state, actions } = useAuthContext();
  var myUrl = url
  const decData = state.decryptedData;
  var { EMail,Mobile,Name,IsApproved } = decData;
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Profile</h4>
            <h6>User Profile</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="profile-set">
              <div className="profile-head"></div>
              <div className="profile-top">
                <div className="profile-content">
                  <div className="profile-contentimg">
                    <ImageWithBasePath
                      src="assets/img/customer/customer5.jpg"
                      alt="img"
                      id="blah"
                    />
                    <div className="profileupload">
                      <input type="file" id="imgInp" />
                     <Link to="#">
                        <ImageWithBasePath src="assets/img/icons/edit-set.svg" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="profile-contentname">
                    <h2>{Name}</h2>
                    <h4>{IsApproved === 1 ? "Active" : "Inactive"}</h4>
                    {/* <h4>Updates Your Photo and Personal Details.</h4> */}
                  </div>
                </div>
                
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={Name}
                    disabled
                  />
                </div>
              </div>
              {/* <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Castilo"
                  />
                </div>
              </div> */}
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={EMail}
                    disabled
                    
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Phone</label>
                  <input type="text" defaultValue={Mobile} disabled />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={IsApproved === 1 ? "Active" : "Inactive"}
                    disabled
                  />
                </div>
              </div>
              {/* <div className="col-lg-6 col-sm-12">
                <div className="input-blocks">
                  <label className="form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input form-control"
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12">
               <Link to="#" className="btn btn-submit me-2">
                  Submit
                </Link>
               <Link to="#" className="btn btn-cancel">
                  Cancel
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Profile;
