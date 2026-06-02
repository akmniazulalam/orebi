import React, { useEffect, useState } from "react";
import FilterTwo from "../layouts/FilterTwo";
import ProductList from "../ProductList";
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
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/services/productService";

const staticDemoProducts = [
  {
    id: 41,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Cup,
    isBadge: true,
    badgeT: "New",
  },
  {
    id: 42,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: HeadPhone,
    isBadge: true,
    badgeT: "-10%",
  },
  {
    id: 43,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: TeaTable,
  },
  {
    id: 44,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Cap,
  },
  {
    id: 45,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: WallClock,
    isBadge: true,
    badgeT: "New",
  },
  {
    id: 46,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Bag,
  },
  {
    id: 47,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: SunGlass,
    isBadge: true,
    badgeT: "-10%",
  },
  {
    id: 48,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: TeaTable,
    isBadge: true,
    badgeT: "-15%",
  },
  {
    id: 49,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Cap,
    isBadge: true,
    badgeT: "-10%",
  },
  {
    id: 50,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Dustbin,
  },
  {
    id: 51,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: Clock,
  },
  {
    id: 52,
    title: "Basic Crew Neck Tee",
    price: 44,
    image: SunGlass,
  },
];

const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <FilterTwo />

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-header font-dmSans">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading products...
        </div>
      ) : (
        <ProductList
          products={products}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-11 mb-14"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-11 grid-rows-4 mb-14">
        {staticDemoProducts.map((item) => (
          <Products
            key={item.id}
            src={item.image}
            alt={item.title}
            isBadge={item.isBadge}
            badgeT={item.badgeT}
            product={item}
            text={item.title}
            price={`$${item.price}`}
          />
        ))}
      </div>

      <Flex className={"justify-between"}>
        <Flex className={"gap-x-4"}>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-white dark:text-[#262626] bg-menuHeading">
              1
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-infoBg hover:bg-menuHeading hover:text-white dark:hover:text-[#262626] transition-all duration-300">
              2
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-infoBg hover:bg-menuHeading hover:text-white dark:hover:text-[#262626] transition-all duration-300">
              3
            </div>
          </Link>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-infoBg hover:bg-menuHeading hover:text-white dark:hover:text-[#262626] transition-all duration-300">
              4
            </div>
          </Link>
          <p className="font-dmSans text-sm text-header px-2">...</p>
          <Link to={"/shop"}>
            <div className="w-10 h-10 flex justify-center items-center font-dmSans text-sm text-header border border-infoBg hover:bg-menuHeading hover:text-white dark:hover:text-[#262626] transition-all duration-300">
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
