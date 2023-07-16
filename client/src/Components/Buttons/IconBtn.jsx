import React from "react";

function IconBtn({ Icon, isActive, color, children, size, ...props }) {
  return (
    <button
      className={`btn lg:btn-md btn-sm join-item ${isActive ? "" : "btn-disabled"} ${
        color || ""
      }`}
      {...props}
    >
      <span className={children != null ? `mr-1` : ""}>
        <Icon size={size || 20} />
      </span>
      {children}
    </button>
  );
}

export default IconBtn;
