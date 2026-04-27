import React, { useEffect, useState } from "react";
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
import axios from "axios";

const ShopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://mern-ecommerce-91cv.onrender.com/api/v1/product/getproduct")
      .then((res) => setProducts(res.data.data));
  }, []);

  return (
    <div>
      <FilterTwo />
      <div className="grid grid-cols-3 gap-x-6 gap-y-11 grid-rows-4 mb-14">
        {products.map((item) => (
          <Link to={`/productdetails/${item._id}`}>
            <Products
              src={item.image}
              text={item.name}
              price={`$${item.price}`}
              product={item}
              className={"bg-amber-500"}
            />
          </Link>
        ))}
        <Products
          src={Cup}
          alt={"cup.png"}
          isBadge
          badgeT={"New"}
          product={{ id: 1, title: "Basic Crew Neck Tee", price: 44, image: Cup }}
        />
        <Products
          src={HeadPhone}
          alt={"headPhone.png"}
          product={{
            id: 2,
            title: "Basic Crew Neck Tee",
            price: 44,
            image: HeadPhone,
          }}
          isBadge
          badgeT={"-10%"}
        />
        <Products
          src={TeaTable}
          alt={"teaTable.png"}
          product={{ id: 3,title: "Basic Crew Neck Tee", price: 44, image: TeaTable }}
        />
        <Products src={Cap} alt={"cap.png"} product={{ id: 4, title: "Basic Crew Neck Tee", price: 44, image: Cap }}/>
        <Products
          src={WallClock}
          alt={"wallClock.png"}
          product={{ id: 5, title: "Basic Crew Neck Tee", price: 44, image: WallClock }}
          isBadge
          badgeT={"New"}
        />
        <Products
          src={Bag}
          alt={"productThree.png"}
          product={{ id: 6, title: "Basic Crew Neck Tee", price: 44, image: Bag }}
        />
        <Products
          src={SunGlass}
          alt={"sunGlass.png"}
          isBadge
          badgeT={"-10%"}
          product={{ id: 7, title: "Basic Crew Neck Tee", price: 44, image: SunGlass }}
        />
        <Products
          src={TeaTable}
          alt={"teaTable.png"}
          isBadge
          badgeT={"-15%"}
          product={{ id: 8, title: "Basic Crew Neck Tee", price: 44, image: TeaTable }}
        />
        <Products
          src={Cap}
          alt={"cap.png"}
          isBadge
          badgeT={"-10%"}
          product={{id: 9, title: "Basic Crew Neck Tee", price: 44, image: Cap }}
        />
        <Products
          src={Dustbin}
          alt={"dustbin.png"}
          product={{ id: 10, title: "Basic Crew Neck Tee", price: 44, image: Dustbin }}
        />
        <Products
          src={Clock}
          alt={"alarmClock.png"}
          product={{id: 11, title: "Basic Crew Neck Tee", price: 44, image: Clock }}
        />
        <Products
          src={SunGlass}
          alt={"sunGlass.png"}
          product={{id: 12, title: "Basic Crew Neck Tee", price: 44, image: SunGlass }}
        />
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
