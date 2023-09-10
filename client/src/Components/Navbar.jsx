import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.jsx";
import { useLogin } from "../Contexts/LoginContext.jsx";
import { useLogout } from "../hooks/apiQueries/api-queries.jsx";
import { useMediaQuery } from "react-responsive";
import GL from "../assets/GL.jsx";

const Navbar = () => {
  const { isLoggedIn, user, setLoginData } = useLogin();
  const { handleLogout, isLoggingout } = useLogout();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div>
      <div className="navbar sticky top-0 left-0 z-10 lg:p-8 pb-2 h-[9dvh] backdrop-blur-sm backdrop-saturate-100 bg-[rgba(10, 14, 23, 0.64)] ">
        <div className={`flex-1 gap-1 justify-between`}>
          <NavLink className="btn btn-ghost  normal-case text-xl" to={"/"}>
            {isTabletOrMobile ? <GL /> : <Logo sm={true} />}
          </NavLink>
          <div className={`flex `}>
            <NavLink
              className={({ isActive, isPending }) =>
                ` btn btn-sm lg:btn-md btn-ghost normal-case text-sm  text-slate-300 hover:text-slate-100 
                ${
                  isActive
                    ? " bg-neutral underline decoration-info  decoration-2 underline-offset-2"
                    : " "
                } `
              }
              to={"/games"}
            >
              <span className="">Browse Games</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                `btn btn-sm lg:btn-md btn-ghost normal-case text-sm text-slate-300 hover:text-slate-100  
                ${
                  isActive
                    ? " bg-neutral underline decoration-info  decoration-2 underline-offset-2"
                    : " "
                } `
              }
              to={"/forum"}
            >
              <span>Forum</span>
            </NavLink>
          </div>
          <div className="flex-none gap-2 ">
            {!isLoggedIn && (
              <button
                className="btn btn-ghost link link-info normal-case text-sm text-slate-300 hover:text-info"
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
                  <li
                    onClick={async () => {
                      const wait = await handleLogout(setLoginData);
                      window.location.reload();
                    }}
                  >
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
      </div>
      <div className="h-[0.5px] w-11/12 bg-cyan-950 m-auto rounded-lg absolute z-10 left-[5%] "></div>
    </div>
  );
};

export default Navbar;
