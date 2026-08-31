import React from "react";
import Container from "../Container";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Error = () => {
  return (
    <Container>
      <h1 className="font-dmSans font-bold text-[100px] sm:text-[200px] text-menuHeading pt-10 sm:pt-20 leading-30 sm:leading-60">
        404
      </h1>
      <p className="max-w-161 w-full font-dmSans text-base leading-7.5 text-header dark:text-gray-400">
        The page you were looking for couldn't be found. The page could be
        removed or you misspelled the word while searching for it. Maybe try a
        search?
      </p>
      <div className="relative block max-w-160.75 w-full">
        <input
          type="text"
          className="w-full p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16192E] placeholder:text-base placeholder:font-dmSans placeholder:text-header dark:placeholder:text-gray-500 text-menuHeading dark:text-white mt-14 mb-15 focus:outline-none font-dmSans transition-colors duration-200"
          placeholder="Type to search"
        />
        <FaSearch className="text-base text-menuHeading dark:text-gray-400 absolute top-1/2 right-5 -translate-y-1/2" />
      </div>
      <Link to={"/"}>
        <button className="inline-flex items-center justify-center cursor-pointer rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] py-3.5 px-12 font-dmSans font-bold text-sm hover:opacity-90 transition-opacity duration-200 shadow-sm">
          Back to Home
        </button>
      </Link>
    </Container>
  );
};

export default Error;
