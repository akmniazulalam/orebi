import React from "react";

const ToggleButtons = ({isOpen}) => {
  return (
    <div className={`z-10 absolute right-0 transition-all duration-300 ${isOpen ? "top-[35px] opacity-100" : "top-[18px] opacity-0"}`}>
      <button className="w-[200px] bg-similarBlack font-dmSans font-bold text-sm text-white text-center py-4 px-14 cursor-pointer">
        My Account
      </button>
      <button className="w-[200px] bg-white font-dmSans text-sm text-menuHeading text-center border-[1px] border-[#F0f0f0] py-4 px-14 cursor-pointer">
        Log Out
      </button>
    </div>
  );
};

export default ToggleButtons;
