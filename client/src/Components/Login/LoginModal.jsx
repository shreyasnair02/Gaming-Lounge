import { motion } from "framer-motion";
import PageWrapper from "../../utils/PageWrapper";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useSignUp, useLogin } from "../../hooks/apiQueries/api-queries";
export const LoginModal = ({ setIsLoginModalOpen }) => {
  const OVERLAY = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const modalDiv = {
    minHeight: "auto",
    fontFamily: "sans-serif",
    border: "1px solid Hot",
    padding: "1rem",
    backgroundColor: "black",
    color: "white",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    maxWidth: "fit-content",
  };
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "1000vh",
      transition: {
        duration: 0.51,
      },
    },
  };
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
            {/* if there is a button in form, it will close the modal */}
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    newCheckMutation.mutate({ email_id: loginEmail, password: loginPassword });
    console.log("login form submitted");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    newUserMutation.mutate({
      email_id: signupEmail,
      name: signupName,
      password: signupPassword,
    });
    window.my_modal_1.close();
    console.log(newUserMutation.data);
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
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="input  w-full max-w-xs"
            />
          </div>
          <div className="input-group items-center gap-3">
            <label>Password:</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="input"
            />
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
            <input
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group items-center gap-3">
            <label>Email:</label>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group items-center gap-3">
            <label>Password:</label>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default FormComponent;
