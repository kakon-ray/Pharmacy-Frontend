

import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const TokenContext = createContext();

export const TokenListProvider = (props) => {
  const [token, setToken] = useState({});
  const mytoken = localStorage.getItem("token");


  useEffect(() => {

    const getToken = async () => {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/me/${mytoken}`, {
          headers: {
            Authorization: 'Bearer' + ' ' + mytoken,
          },
        });


        if (response.data.user) {
          setToken(response.data.user)
        }



      } catch (error) {
        console.log(error);

      }

    }

    if (mytoken) {
      getToken();
    }

  }, [mytoken]);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};