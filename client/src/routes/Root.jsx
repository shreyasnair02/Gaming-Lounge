import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
const Root = () => {
  return (
    <div className=" font-orbitron">
      <Navbar />
      {/* <AnimatePresence location={location.pathname} initial={false}> */}
      <Outlet />
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Root;
