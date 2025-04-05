/* eslint-disable react/prop-types */
import { useLocation, Navigate } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { children } = props;
  const isLoggedIn = sessionStorage.getItem("encryptedData") !== null;
  // const isLoggedIn = true;
  const location = useLocation();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/signin"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};
