import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="text-center flex items-center justify-center flex-col">
        <FiAlertTriangle className="text-9xl" />
        <h1 className="text-4xl font-bold mt-8">Oops! Something Went Wrong</h1>
        <a
          href="/"
          className="hover:bg-info btn-link text-white font-semibold px-6 py-3 rounded-full mt-6 bg-red-400 hover:text-white transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default Error;
