// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem("dados");

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  const token = JSON.parse(authData).token;

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
