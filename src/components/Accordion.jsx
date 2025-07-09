import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="w-1/4 border-b-2 border-infoBg flex justify-between items-center py-5 cursor-pointer "
        onClick={toggleAccordion}>
        <p className="font-dmSans text-base text-header">{title}</p>
        <span className="text-header text-base font-bold">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div
        className={`px-5 bg-infoBg w-1/4 text-base text-header font-dmSans transition-all duration-300 ${
          isOpen ? "opacity-100 py-5 h-16" : "opacity-0 h-0 py-0"
        }`}>
        {content}
      </div>
    </>
  );
};

export default Accordion;
