import React from "react";

function Shards({ idx }) {
  switch (idx) {
    case 1:
      return (
        <svg
          width="13"
          height="38"
          viewBox="0 0 13 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0L7 23L12.3772 37.414L6.5 23.5L0 0Z" fill="#1699B9" />
        </svg>
      );
      break;
    case 2:
      return (
        <svg
          width="13"
          height="38"
          viewBox="0 0 13 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.570313 0L5.07031 14L9.57031 28L12.9475 37.414L7.00018 22L0.570313 0Z"
            fill="#1699B9"
          />
        </svg>
      );
      break;
    case 3:
      return (
        <svg
          width="13"
          height="38"
          viewBox="0 0 13 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.570313 0L9.57031 28L12.9475 37.414L6.00018 22.5L0.570313 0Z"
            fill="#1699B9"
          />
        </svg>
      );
      break;
    case 4:
      return (
        <svg
          width="13"
          height="31"
          viewBox="0 0 13 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9224 30.3662L5.93198 11.7216L0.560233 -2.69168e-05L8 12.5L12.9224 30.3662Z"
            fill="#1699B9"
          />
        </svg>
      );
      break;
    case 5:
      return (
        <svg
          width="13"
          height="38"
          viewBox="0 0 13 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.311523 0.292969L8.00012 18.4999L12.6888 37.7069L7.66094 21.9837L0.311523 0.292969Z"
            fill="#1699B9"
          />
        </svg>
      );
      break;
    default:
      return "";
      break;
  }
  return "";
}

export default Shards;
