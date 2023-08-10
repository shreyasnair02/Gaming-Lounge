import React, { useState, useContext } from "react";
import { useCheckAuth } from "../hooks/apiQueries/api-queries";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import { useEffect } from "react";

const Context = React.createContext({});

export const useLogin = () => {
  return useContext(Context);
};
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const setLoginData = (loggedIn, userData) => {
    setIsLoggedIn(loggedIn);
    setUser(userData);
  };
  const initUserAuth = useCheckAuth();
  useEffect(() => {
    if (!initUserAuth.isLoading && !initUserAuth.isError && initUserAuth.data) {
      setLoginData(true, initUserAuth.data);
    }
  }, [initUserAuth.data]);
  return (
    <Context.Provider value={{ isLoggedIn, user, setLoginData }}>
      {initUserAuth.isLoading ? (
        <Loading/>
      ) : initUserAuth.isError ? (
        <Error/>
      ) : (
        children
      )}
    </Context.Provider>
  );
};
