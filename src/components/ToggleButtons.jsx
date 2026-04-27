import React from "react";

const ToggleButtons = ({isOpen}) => {
  return (
    <>
    {isOpen && (
      <div className={`z-10 absolute right-0 transition-all duration-300 top-8.75 animate-slide`}>
      <button className="w-50 bg-similarBlack font-dmSans font-bold text-sm text-white text-center py-4 px-14 cursor-pointer">
        My Account
      </button>
      <button className="w-50 bg-white font-dmSans text-sm text-menuHeading text-center border border-[#F0f0f0] py-4 px-14 cursor-pointer">
        Log Out
      </button>
    </div>
    )}
    </>
  );
};

export default ToggleButtons;
