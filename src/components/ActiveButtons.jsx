import React from "react";
import Flex from "./Flex";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import CompareIcon from "../assets/icons/CompareIcon";
import useCart from "@/store/cart";
import { buildCartLineItem } from "@/lib/cartUtils";
import { getPrimaryVariant } from "@/lib/productUtils";

const ActiveButtons = ({ className = "", product }) => {
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
      className={`py-4 px-4 bg-white/95 dark:bg-[#121429]/95 backdrop-blur-sm opacity-0 ${className}`}
      onClick={(e) => e.preventDefault()}>
      <Flex className="justify-end items-center">
        <button
          type="button"
          className="font-dmSans text-xs sm:text-sm text-header dark:text-gray-300 hover:text-menuHeading dark:hover:text-white transition-colors duration-200 hover:font-bold cursor-pointer">
          Add to Wish List
        </button>
        <FaHeart className="text-menuHeading dark:text-white ml-2.5 text-xs sm:text-sm" />
      </Flex>
      <Flex className="pt-3 justify-end items-center">
        <button
          type="button"
          className="font-dmSans text-xs sm:text-sm text-header dark:text-gray-300 pr-2.5 hover:text-menuHeading dark:hover:text-white transition-colors duration-200 hover:font-bold cursor-pointer">
          Compare
        </button>
        <CompareIcon className="dark:text-white" />
      </Flex>
      <Flex className="pt-3 justify-end items-center">
        <button
          type="button"
          className="font-dmSans text-xs sm:text-sm text-header dark:text-gray-300 hover:text-menuHeading dark:hover:text-white transition-colors duration-200 hover:font-bold cursor-pointer"
          onClick={handleAddToCart}>
          Add to Cart
        </button>
        <FaShoppingCart className="text-menuHeading dark:text-white ml-2.5 text-xs sm:text-sm" />
      </Flex>
    </div>
  );
};

export default ActiveButtons;
