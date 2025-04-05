/* eslint-disable react/prop-types */
import React, {useEffect,useState} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../InitialPage/Sidebar/Header";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import { pagesRoute, posRoutes, publicRoutes } from "./router.link";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeSettings from "../InitialPage/themeSettings";
import Loader from "../feature-module/loader/loader";
import { PrivateRoute } from "../feature-module/pages/login/PrivateRoute";
import SalesNavBar from "../feature-module/sales/salesnavbar";


const AllRoutes = () => {
  const data = useSelector((state) => state.toggle_header);
  const HeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <Header />
     
      <Sidebar />
      <Outlet />
      <ThemeSettings />
      <Loader />
    </div>
  );

  const Authpages = () => (
    <div className={data ? "header-collapse" : ""}>
      <Outlet />
      <Loader />
      <ThemeSettings />
    </div>
  );

  const Pospages = () => (
    <div>
      {/* <Header /> */}
      <SalesNavBar/>
      <Outlet />
      <Loader />
      <ThemeSettings />
    </div>
  );

  // console.log(publicRoutes, "dashboard");

  return (
    <div>

      <Routes>
        <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
        <Route path={"/"} element={<PrivateRoute><HeaderLayout/></PrivateRoute>}>
          {publicRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>

        <Route path={"/"} element={<Authpages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
      </Routes>

    </div>
  );
};
export default AllRoutes;
