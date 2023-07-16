import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.jsx";

const Navbar = () => {
  return (
    <div>
      <div className="navbar sticky top-0 left-0 z-10 lg:p-8 pb-2 h-[9dvh] backdrop-blur-sm backdrop-saturate-100 bg-[rgba(10, 14, 23, 0.64)] ">
        <div className="flex-1">
          <NavLink className="btn btn-ghost normal-case text-xl" to={"/"}>
            <Logo sm={true} />
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn-link"
            onClick={() => window.my_modal_1.showModal()}
          >
            Sign in
          </button>
          <div className="dropdown dropdown-end z-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://randomuser.me/api/portraits/men/44.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-100 "
            >
              <li>
                <NavLink className="justify-between" to={"/profile"}>
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                {/* <a>Settings</a> */}
                {/* <NavLink to={"/"}>Settings</NavLink> */}
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[0.5px] w-11/12 bg-cyan-950 m-auto rounded-lg absolute z-10 left-[5%] "></div>
    </div>
  );
};

export default Navbar;
