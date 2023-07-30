import { motion } from "framer-motion";
import PageWrapper from "../../utils/PageWrapper";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useSignUp, useLogin } from "../../hooks/apiQueries/api-queries";
import { useLogin as useLoginContext } from "../../Contexts/LoginContext";
import { MdErrorOutline } from "react-icons/md";
export const LoginModal = ({ setIsLoginModalOpen }) => {
  const handleClick = () => {
    setIsLoginModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <dialog id="my_modal_1" className="modal">
        <div method="" className="modal-box">
          <h3 className="font-bold text-lg">Welcome</h3>
          <FormComponent></FormComponent>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => window.my_modal_1.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal")
  );
};

function FormComponent() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const newUserMutation = useSignUp();
  const newCheckMutation = useLogin();
  const { isLoggedIn, user, setLoginData } = useLoginContext();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    newCheckMutation
      .mutateAsync({
        email_id: loginEmail,
        password: loginPassword,
      })
      .then((data) => {
        if (!data.errors) {
          window.my_modal_1.close();
          setLoginEmail("");
          setLoginPassword("");
          setLoginData(true, data);
        }
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    newUserMutation
      .mutateAsync({
        email_id: signupEmail,
        name: signupName,
        password: signupPassword,
      })
      .then((data) => {
        if (!data.errors) {
          window.my_modal_1.close();
          setSignupEmail("");
          setSignupPassword("");
          setSignupName("");
          setLoginData(true, data);
        }
      });
  };

  return (
    <div className="form-container p-1">
      <div className="tabs">
        <a
          className={`tab tab-bordered ${
            activeTab === "login" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "signup" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("signup")}
        >
          Sign Up
        </a>
      </div>
      {activeTab === "login" ? (
        <form
          onSubmit={handleLoginSubmit}
          className="form-content flex flex-col gap-5 m-3"
        >
          <div className="input-group items-center gap-3">
            <label>Email:</label>
            <div>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="input w-full max-w-xs  focus:outline-offset-1"
              />
              {newCheckMutation.isSuccess &&
                newCheckMutation.data?.errors?.email && (
                  <span className="flex-wrap text-sm text-red-500 bg-transparent">
                    <MdErrorOutline fill="red" />
                    {"  "}
                    {newCheckMutation.data?.errors?.email}
                  </span>
                )}
            </div>
          </div>

          <div className="input-group items-center gap-3">
            <label>Password:</label>
            <div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="input focus:outline-offset-1"
              />
              {newCheckMutation.isSuccess &&
                newCheckMutation.data?.errors?.password && (
                  <span className="flex-wrap text-sm text-red-500 bg-transparent">
                    <MdErrorOutline fill="red" />
                    {"  "}
                    {newCheckMutation.data?.errors?.password}
                  </span>
                )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSignupSubmit}
          className="form-content flex flex-col gap-5 m-3"
        >
          <div className="input-group items-center gap-3">
            <label>Name:</label>
            <div>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                className="input focus:outline-offset-1"
              />
              {newUserMutation.isSuccess &&
                newUserMutation.data?.errors?.name && (
                  <span className="flex-wrap text-sm text-red-500 bg-transparent">
                    <MdErrorOutline fill="red" />
                    {"  "}
                    {newUserMutation.data?.errors?.name}
                  </span>
                )}
            </div>
          </div>
          <div className="input-group items-center gap-3">
            <label>Email:</label>
            <div>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                className="input"
              />
              {newUserMutation.isSuccess &&
                newUserMutation.data?.errors?.email && (
                  <span className="flex-wrap text-sm text-red-500 bg-transparent">
                    <MdErrorOutline fill="red" />
                    {"  "}
                    {newUserMutation.data?.errors?.email}
                  </span>
                )}
            </div>
          </div>

          <div className="input-group items-center gap-3">
            <label>Password:</label>
            <div>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                className="input"
              />

              {newUserMutation.isSuccess &&
                newUserMutation.data?.errors?.password && (
                  <span className="flex-wrap text-sm text-red-500 bg-transparent">
                    <MdErrorOutline fill="red" />
                    {"  "}
                    {newUserMutation.data?.errors?.password}
                  </span>
                )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {newUserMutation.isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default FormComponent;
