import React from "react";
import Container from "../Container";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Error = () => {
  return (
    <Container>
      <h1 className="font-dmSans font-bold text-[200px] text-menuHeading pt-[80px] leading-[240px]">
        404
      </h1>
      <p className="w-[644px] font-dmSans text-base leading-7.5 text-[#767676]">
        The page you were looking for couldn't be found. The page could be
        removed or you misspelled the word while searching for it. Maybe try a
        search?
      </p>
      <div className="relative inline">
        <input
        type="text"
        className="w-[643px] p-5 border border-[#F0F0F0] placeholder:text-base placeholder:font-dmSans placeholder:text-[#767676] mt-14 mb-15 focus:outline-0 font-dmSans"
        placeholder="Type to search"
      />
      <FaSearch className="text-base text-menuHeading absolute top-1/2 right-[20px] -translate-y-1/2"/>
      </div>
      <Link to={"/"}>
        <button className="block cursor-pointer bg-menuHeading py-[15px] px-[50px] text-white font-dmSans font-bold text-sm">
          Back to Home
        </button>
      </Link>
    </Container>
  );
};

export default Error;
