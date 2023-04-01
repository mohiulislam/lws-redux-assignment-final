import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  element: Component,
  isAuthenticated,
  role,
  ...rest
}) => {
  if (isAuthenticated && role === "Student") {
    return <Route {...rest} element={<Component />} />;
  } else if (isAuthenticated && role === "Admin") {
    return <Route {...rest} element={<Component />} />;
  } else {
    return <Navigate to={role === "Student" ? "/" : "/Admin/Login"} replace />;
  }
};

export default PrivateRoute;
