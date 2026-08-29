import React from "react";
import Flex from "../Flex";
import { FaCaretDown } from "react-icons/fa";

const FilterTwo = () => {
  return (
    <div className="ml-auto mb-15">
      <div className="flex flex-wrap gap-4 justify-start sm:justify-end items-center">
        <Flex className={"gap-x-3"}>
          <p className="font-dmSans text-base text-header dark:text-gray-400">Sort by:</p>
          <div className="relative">
            <select
              name="sort"
              id="sort"
              className="font-dmSans text-sm text-menuHeading dark:text-white bg-white dark:bg-[#16192E] focus:outline-none focus:ring-0 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 px-5 appearance-none w-59.75 cursor-pointer">
              <option value="all" className="font-dmSans text-sm text-menuHeading">
                Featured
              </option>
              <option value="low" className="font-dmSans text-sm text-menuHeading">
                Price: Low to High
              </option>
              <option value="high" className="font-dmSans text-sm text-menuHeading">
                Price: High to Low
              </option>
              <option value="newest" className="font-dmSans text-sm text-menuHeading">
                Newest
              </option>
              <option value="best" className="font-dmSans text-sm text-menuHeading">
                Best Selling
              </option>
              <option value="rating" className="font-dmSans text-sm text-menuHeading">
                Rating
              </option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
              <FaCaretDown className="text-header dark:text-gray-400" />
            </div>
          </div>
        </Flex>
        <Flex className={"gap-x-3"}>
          <p className="font-dmSans text-base text-header dark:text-gray-400">Show:</p>
          <div className="relative">
            <select
              name="show"
              id="show"
              className="font-dmSans text-sm text-menuHeading dark:text-white bg-white dark:bg-[#16192E] focus:outline-none focus:ring-0 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 px-5 appearance-none w-34.75 cursor-pointer">
              <option value="36" className="font-dmSans text-sm text-menuHeading">36</option>
              <option value="12" className="font-dmSans text-sm text-menuHeading">12</option>
              <option value="24" className="font-dmSans text-sm text-menuHeading">24</option>
              <option value="48" className="font-dmSans text-sm text-menuHeading">48</option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
              <FaCaretDown className="text-header dark:text-gray-400" />
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default FilterTwo;

