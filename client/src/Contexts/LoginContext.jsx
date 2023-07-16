import React, { useContext } from "react";

const Context = React.createContext({});

export const useLogin = () => {
  return useContext(Context);
};
export const LoginProvider = ({ children }) => {
  return (
    <Context.Provider value={{ isLoggedIn: false, userId: 5565792 }}>
      {children}
    </Context.Provider>
  );
};
