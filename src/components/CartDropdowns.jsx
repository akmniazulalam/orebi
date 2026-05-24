import useCart from "@/store/cart";
import React from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const CartDropdowns = ({ items, onClick }) => {
  const removeFromCart = useCart((state) => state.removeFromCart);
  const subTotal = items.reduce((total, item) => total + (item.price || item.variants[0].price), 0)
  return (
    <div className="absolute top-10 right-0 w-89.5 z-10">
      {items.length === 0 ? (
        <div className="p-4 bg-[#acaca1]">
          <p>There is no product.</p>
        </div>
      ) : (
        <div className="">
          <div className="p-5 bg-bHeaderBg dark:bg-[#1a1414] space-y-4">
            {items.map((item) => (
              <div
                key={item._id || item.id}
                className="flex gap-x-5 items-center">
                <img
                  src={
                    item.thumbnail || item.image || item.variants[0].images[0]
                  }
                  alt={item.title}
                  className="w-20 h-20 bg-[#D8D8D8]"
                />
                <div className="text-left space-y-2.5">
                  <h3 className="text-[14px] font-dmSans font-bold text-menuHeading">
                    {item.title || item.name}
                  </h3>
                  <p className="text-[14px] font-dmSans font-bold text-menuHeading">
                    ${(item.price || item.variants[0].price).toFixed(2)}
                  </p>
                </div>
                <button
                  className="cursor-pointer ml-auto"
                  onClick={(e) => {
                    removeFromCart(item._id || item.id);
                    e.stopPropagation();
                  }}>
                  <ImCross />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3.75 px-5.25 pb-5 bg-white">
            <h4 className="pb-4 text-left font-dmSans text-base text-header dark:text-[#4b4646] font-medium">
              Subtotal:
              <span className="pl-2 font-bold text-menuHeading dark:text-[#262626] font-dmSans text-base">
                ${subTotal.toFixed(2)}
              </span>
            </h4>
            <div className="flex items-center justify-between">
              <Link to={"/cart"}>
                <button
                  className="py-3.5 px-10 border-2 border-black font-dmSans text-sm text-menuHeading dark:text-[#262626] dark:hover:text-white font-bold  hover:text-white hover:bg-black transition-all duration-300 cursor-pointer"
                  onClick={onClick}>
                  View Cart
                </button>
              </Link>
              <Link to={"/checkout"}>
                <button
                  className="py-3.5 px-10 border-2 border-black font-dmSans text-black font-bold text-sm hover:text-white hover:bg-black transition-all duration-300 cursor-pointer"
                  onClick={onClick}>
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdowns;
