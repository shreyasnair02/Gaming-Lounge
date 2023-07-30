import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.jsx";
import { useLogin } from "../Contexts/LoginContext.jsx";
import { useLogout } from "../hooks/apiQueries/api-queries.jsx";

const Navbar = () => {
  const { isLoggedIn, user, setLoginData } = useLogin();
  const { handleLogout, isLoggingout } = useLogout();
  return (
    <div>
      <div className="navbar sticky top-0 left-0 z-10 lg:p-8 pb-2 h-[9dvh] backdrop-blur-sm backdrop-saturate-100 bg-[rgba(10, 14, 23, 0.64)] ">
        <div className="flex-1">
          <NavLink className="btn btn-ghost normal-case text-xl" to={"/"}>
            <Logo sm={true} />
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          {!isLoggedIn && (
            <button
              className="btn-link"
              onClick={() => window.my_modal_1.showModal()}
            >
              Sign in
            </button>
          )}
          {isLoggedIn && (
            <div className="dropdown dropdown-end z-10">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={`${user.avatar_url}`} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-100 "
              >
                <li className="hover:bg-transparent">
                  <div className="justify-between">
                    {user.name}
                    <span className="badge">Prime</span>
                  </div>
                </li>
                <li>
                  <div className="justify-between">{user.email_id}</div>
                </li>
                <li onClick={() => handleLogout(setLoginData)}>
                  <button disabled={false}>
                    {false ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <span>Logout</span>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="h-[0.5px] w-11/12 bg-cyan-950 m-auto rounded-lg absolute z-10 left-[5%] "></div>
    </div>
  );
};

export default Navbar;
