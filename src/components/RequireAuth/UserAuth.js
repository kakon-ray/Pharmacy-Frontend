import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../loading/Loading";

const RequireAuth = ({ children }) => {

  let location = useLocation();
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const mytoken = localStorage.getItem("token");

  // http://127.0.0.1:8000
  
  useEffect(() => {

    const getToken = async () => {

      try {
        const response = await axios.get(`http://testapi.web-builderit.com/api/me/${mytoken}`, {
          headers: {
            Authorization: 'Bearer' + ' ' + mytoken,
          },
        });

        if (!response) {
          setLoading(true)
        }

        if (response) {
          setLoading(false)
        }

        if (response.data.user) {
          setUser(response.data.user)
          setLoading(false)
        }


      } catch (error) {
        console.log(error);

      }

    }

    getToken();

  }, [mytoken]);

  if (loading) {
    return <Loading />
  }

  if (user?.role === 'user' || user?.role === 'admin') {
    return children;
    
  }else{
    return <Navigate to="/" state={{ from: location }} replace />;
  }


};

export default RequireAuth;