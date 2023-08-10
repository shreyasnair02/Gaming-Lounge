import React from "react";

function IconBtn({isDeleteIcon, Icon, isActive, color, children, size, ...props }) {
  return (
    <button
      className={`btn btn-ghost lg:btn-sm btn-sm join-item font-thin text-xs bg-inherit border-none hover:contrast-200 hover:brightness-200 transition-all ${
        isActive ? "" : "btn-disabled",
        isDeleteIcon?"hover:bg-red-700 hover:text-red-400 transition-all ":""
      } ${color || ""}`}
      {...props}
    >
      <span className={children != null ? `mr-0` : ""}>
        <Icon size={size || 18} stroke="white"  fill="white" color="white"/>

      </span>
      {children}
    </button>
  );
}

export default IconBtn;
