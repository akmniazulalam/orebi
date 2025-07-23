import React from "react";
import Flex from "../Flex";
import { FaCaretDown } from "react-icons/fa";

const FilterTwo = () => {
  return (
    <div className="ml-auto mb-15">
      <Flex className={"gap-x-5 justify-end"}>
        <Flex className={"gap-x-3"}>
          <p className="font-dmSans text-base text-header">Sort by:</p>
          <div className="relative">
            <select
              name="sort"
              id="sort"
              className="font-dmSans text-base text-header focus:outline-none focus:ring-0 border border-[#F0F0F0] py-2.5 px-5 appearance-none w-[239px] cursor-pointer">
              <option value="all" className="font-dmSans text-base text-header">
                Featured
              </option>
              <option value="low" className="font-dmSans text-base text-header">
                Price: Low to High
              </option>
              <option
                value="high"
                className="font-dmSans text-base text-header">
                Price: High to Low
              </option>
              <option
                value="newest"
                className="font-dmSans text-base text-header">
                Newest
              </option>
              <option
                value="best"
                className="font-dmSans text-base text-header">
                Best Selling
              </option>
              <option
                value="rating"
                className="font-dmSans text-base text-header">
                Rating
              </option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
              <FaCaretDown className="text-header" />
            </div>
          </div>
        </Flex>
        <Flex className={"gap-x-3"}>
          <p className="font-dmSans text-base text-header">Show:</p>
          <div className="relative">
            <select
              name="sort"
              id="sort"
              className="font-dmSans text-base text-header focus:outline-none focus:ring-0 border border-[#F0F0F0] py-2.5 px-5 appearance-none w-[139px] cursor-pointer">
              <option value="all" className="font-dmSans text-base text-header">
                36
              </option>
              <option value="low" className="font-dmSans text-base text-header">
                12
              </option>
              <option
                value="high"
                className="font-dmSans text-base text-header">
                24
              </option>
              <option
                value="newest"
                className="font-dmSans text-base text-header">
                36
              </option>
              <option
                value="best"
                className="font-dmSans text-base text-header">
                48
              </option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
              <FaCaretDown className="text-header" />
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default FilterTwo;
