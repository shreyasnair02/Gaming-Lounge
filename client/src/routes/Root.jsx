import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { LoginModal } from "../Components/Login/LoginModal";
const Root = () => {
  const targetRef = useRef(null);
  const [isTargetSet, setIsTargetSet] = useState(false);

  return (
    <div className=" font-orbitron">
      <Navbar />

      {/* <AnimatePresence location={location.pathname} initial={false}> */}
      <Outlet />
      <div
        id="modal"
        ref={(current) => {
          targetRef.current = current;
          setIsTargetSet(true);
        }}
      />
      {isTargetSet && <LoginModal curr={targetRef.current} />}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Root;
