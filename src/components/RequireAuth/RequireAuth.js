import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";

const RequireAuth = ({ children }) => {
    
  let location = useLocation();

  const [token, setToken] = useContext(TokenContext);

  

  if (!token?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;