

/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React,{useEffect,useState} from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import ReactLoader from "../../../ReusableComponents/ReactLoader";

const Signin = () => {
  const route = all_routes;
  const url = process.env.REACT_APP_PRO_BASEURL;
  // console.log("baseurl",url)
  const port = process.env.REACT_APP_PRO_PORT;
  const [eye, seteye] = useState(true);
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onEyeClick = () => {
    seteye(!eye);
  };

  //----input handler--------------
  const inputHanlder = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const onSubmit = (data) => {
  //     navigate('/delivery/dashboard')
  //     console.log('ddddd',data)
  // };

  useEffect(() => {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", true);
      window.location.reload();
    }
  }, []);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //-------------json data ------------------------
  const jsonData = {
    UType: parseInt(1),
    // Type: 1,
    UName: userData.userName,
    PWD: userData.password,
  };


  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      console.log("urlLogin", url + "/api/Authentication");
      
      const response = await fetch(
        url + "/api/Authentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData), // Send the JSON data
        }
      );
  
      const result = await response.json();
      console.log(result, "result of login data user");
  
      if (result.msg === "Valid" && result.status === 1) {
        // Convert jsonData to a string before storing it in sessionStorage
        const encryptedData = JSON.stringify(result);
        sessionStorage.setItem("encryptedData", encryptedData);
        global.encData = encryptedData;
        navigate(route.dashboard);
        setLoading(false);
      } else {
        alert("Invalid userId or password");
        setLoading(false);
      }
    } catch (e) {
      alert("Error" + e);
      setLoading(false);
    }
  };
  
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper">
          <div className="login-content">
            {loading ? (
              <ReactLoader loaderClass="position-absolute" loading={loading} />
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath
                    src="assets/img/panipatlogo.png"
                    alt="img"
                  />
                </div>
                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/panipatlogo.png" alt />
                </Link>
                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4>Access the admin panel using your mobile no../ Email</h4>
                </div>
                <div className="form-login">
                  <label>Mobile No./ Email</label>
                  <div className="form-addons">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Email Address or Phone Number"
                      autoComplete="off"
                      value={userData.userName}
                      onChange={inputHanlder}
                      required
                    />
                    <ImageWithBasePath
                      src="assets/img/icons/mail.svg"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="form-login">
                  <label>Password</label>
                  <div className="pass-group">
                    <input
                      type={eye ? "password" : "text"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      value={userData.password}
                      onChange={inputHanlder}
                      required
                    />
                    <span
                      onClick={onEyeClick}
                      className={`fas toggle-password ${
                        eye ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </div>
                </div>
                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-6">
                      {/* <div className="custom-control custom-checkbox">
                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          Remember me
                        </label>
                      </div> */}
                    </div>
                    {/* <div className="col-6 text-end">
                      <Link
                        className="forgot-link"
                        to={route.forgotPasswordTwo}
                      >
                        Forgot Password?
                      </Link>
                    </div> */}
                  </div>
                </div>
                <div className="form-login">
                  {/* <Link  to={route.dashboard}className="btn btn-login">
                    Sign In
                  </Link> */}
                  <button
                    className="btn btn-login"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255, 0, 120, 1) 15%, rgba(0, 199, 255, 1) 100%)",
                      border: "none",
                      // color: "white"
                    }}
                  >
                    Sign In
                  </button>
                </div>
                {/* <div className="signinform">
                  <h4>
                    New on our platform?
                    <Link to={route.registerTwo} className="hover-a">
                      {" "}
                      Create an account
                    </Link>
                  </h4>
                </div>
                <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div> */}
                <div className="form-sociallink">
                  {/* <ul className="d-flex">
                    <li>
                      <Link to="#" className="facebook-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/facebook-logo.svg"
                          alt="Facebook"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/google.png"
                          alt="Google"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="apple-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/apple-logo.svg"
                          alt="Apple"
                        />
                      </Link>
                    </li>
                  </ul> */}
                    <div className="my-4 justify-content-center align-items-center copyright-text">
                    <p>Copyright ©{currentYear} Panipat Handloom.All rights reserved. </p>
                      
                    <p className="text-center">
                       Developed by Excellent Software&apos;s</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="login-img">
            <ImageWithBasePath
              src="assets/img/authentication/painting-hanging-shelf-full-cacti-succulents.jpg"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
