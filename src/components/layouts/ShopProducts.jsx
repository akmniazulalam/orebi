import React from "react";
import FilterTwo from "../layouts/FilterTwo";
import Products from "../Products";
import Cup from "/src/assets/cup.png";
import HeadPhone from "/src/assets/headPhone.png";
import TeaTable from "/src/assets/teaTable.png";
import Cap from "/src/assets/cap.png";
import WallClock from "/src/assets/wallClock.png";
import Bag from "/src/assets/productThree.png";
import Dustbin from "/src/assets/dustbin.png";
import SunGlass from "/src/assets/sunGlass.png";
import Clock from "/src/assets/alarmClock.png";
import { Link } from "react-router-dom";
import Flex from "../Flex";

const ShopProducts = () => {
  return (
    <div>
      <FilterTwo />
      <div className="grid grid-cols-3 gap-x-6 gap-y-11 grid-rows-4 mb-14">
        <Products src={Cup} alt={"cup.png"} isBadge badgeT={"New"} />
        <Products
          src={HeadPhone}
          alt={"headPhone.png"}
          isBadge
          badgeT={"-10%"}
        />
        <Products src={TeaTable} alt={"teaTable.png"} />
        <Products src={Cap} alt={"cap.png"} />
        <Products
          src={WallClock}
          alt={"wallClock.png"}
          isBadge
          badgeT={"New"}
        />
        <Products src={Bag} alt={"productThree.png"} />
        <Products src={SunGlass} alt={"sunGlass.png"} isBadge badgeT={"-10%"} />
        <Products src={TeaTable} alt={"teaTable.png"} isBadge badgeT={"-15%"} />
        <Products src={Cap} alt={"cap.png"} isBadge badgeT={"-10%"} />
        <Products src={Dustbin} alt={"dustbin.png"} />
        <Products src={Clock} alt={"alarmClock.png"} />
        <Products src={SunGlass} alt={"sunGlass.png"} />
      </div>
      <Flex className={"justify-between"}>
        <Flex className={"gap-x-4"}>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-white bg-menuHeading">
              1
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-[#F0F0F0] hover:bg-menuHeading hover:text-white transition-all duration-300">
              2
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-[#F0F0F0] hover:bg-menuHeading hover:text-white transition-all duration-300">
              3
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-[#F0F0F0] hover:bg-menuHeading hover:text-white transition-all duration-300">
              4
            </div>
          </Link>
          <p className="font-dmSans text-sm text-header px-2">...</p>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-[#F0F0F0] hover:bg-menuHeading hover:text-white transition-all duration-300">
              10
            </div>
          </Link>
        </Flex>
        <p className="font-dmSans text-sm text-header">
          Products from 1 to 12 of 80
        </p>
      </Flex>
    </div>
  );
};

export default ShopProducts;
