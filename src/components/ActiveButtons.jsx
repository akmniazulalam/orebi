import React from "react";
import Flex from "./Flex";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import CompareIcon from "../assets/icons/CompareIcon";
import useCart from "@/store/cart";
import { buildCartLineItem } from "@/lib/cartUtils";
import { getPrimaryVariant } from "@/lib/productUtils";

const ActiveButtons = ({ className, product }) => {
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    if (product?.variants?.length) {
      addToCart(buildCartLineItem(product, getPrimaryVariant(product.variants)));
      return;
    }
    addToCart(product);
  };

  return (
    <div
      className={`py-5 px-4.5 bg-white opacity-0 ${className}`}
      onClick={(e) => e.preventDefault()}>
      <Flex className={"justify-end"}>
        <button className="font-dmSans text-base text-header dark:hover:text-[#262626] hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer">
          Add to Wish List
        </button>
        <FaHeart className="text-menuHeading ml-3 dark:text-[#262626]" />
      </Flex>
      <Flex className={"pt-4 justify-end"}>
        <button className="font-dmSans text-base text-header pr-3 dark:hover:text-[#262626] hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer">
          Compare
        </button>
        <CompareIcon />
      </Flex>
      <Flex className={"pt-4 justify-end"}>
        <button
          className="font-dmSans text-base text-header dark:hover:text-[#262626] hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer"
          onClick={handleAddToCart}>
          Add to Cart
        </button>
        <FaShoppingCart className="text-menuHeading ml-3 dark:text-[#262626]" />
      </Flex>
    </div>
  );
};

export default ActiveButtons;
