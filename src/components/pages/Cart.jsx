import React, { useState } from "react";
import Intro from "../Intro";
import Container from "../Container";
import sunglass from "/src/assets/sunGlass.png";
import { ImCross } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/features/cart/addToCartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = cartItems.reduce((total, item) => total + item.price, 0)
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  console.log(cartItems);

  return (
    <>
      <Intro text={"Cart"} pText={"Cart"} />
      <Container>
        <table className="border border-infoBg w-full">
          <thead className="border border-[#F5F7F7] bg-bHeaderBg w-full">
            <tr>
              <th className="font-dmSans font-bold text-base text-menuHeading p-5 w-1/4 text-left">
                Product
              </th>
              <th className="font-dmSans font-bold text-base text-menuHeading p-5 w-1/4 text-left">
                Price
              </th>
              <th className="font-dmSans font-bold text-base text-menuHeading p-5 w-1/4 text-left">
                Quantity
              </th>
              <th className="font-dmSans font-bold text-base text-menuHeading p-5 w-1/4 text-left">
                Total
              </th>
            </tr>
          </thead>
          {cartItems.map((item) => (
            <tbody className="border border-infoBg w-full">
              <tr>
                <td className="px-5 py-6">
                  <div className="flex items-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(removeFromCart(item._id || item.id));
                      }}>
                      <ImCross />
                    </button>
                    <img
                      src={item.thumnail || item.image}
                      className="w-20 h-20 bg-[#D8D8D8] ml-10 mx-5"
                    />
                    <div className="text-left space-y-2.5">
                      <h3 className="text-[14px] font-dmSans font-bold text-base text-menuHeading">
                        {item.name || item.title}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="text-[20px] font-dmSans font-bold text-menuHeading py-6 px-5">
                  ${item.price}
                </td>
                <td className="py-6 px-5">
                  <div className="py-1.5 px-4 w-36 border border-infoBg flex gap-x-10 font-dmSans text-header justify-center">
                    <button
                      onClick={handleDecrement}
                      className="cursor-pointer">
                      -
                    </button>
                    <h6>{quantity}</h6>
                    <button
                      onClick={handleIncrement}
                      className="cursor-pointer">
                      +
                    </button>
                  </div>
                </td>
                <td className="text-[20px] font-dmSans font-bold text-menuHeading py-6 px-5">
                  $44
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="border border-infoBg p-5 border-t-0 flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            <Select className={"rounded-none!"}>
              <SelectTrigger className="w-40 h-10 rounded-none">
                <SelectValue placeholder={"SIZE"} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>

                  <SelectItem value="xs">Extra Small</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <button className="font-bold font-dmSans text-sm text-menuHeading cursor-pointer">
              Apply coupon
            </button>
          </div>
          <button className="font-bold font-dmSans text-sm text-menuHeading cursor-pointer">
            Update Cart
          </button>
        </div>

        <div className="text-end">
          <p className="pt-13 text-[20px] font-dmSans font-bold text-menuHeading">
            Cart totals
          </p>
          <table className="border border-infoBg mt-6 mb-7.5 ml-auto text-left">
            <tr className="border-b border-infoBg">
              <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                Subtotal
              </th>
              <td className="font-dmSans text-base text-header py-4 px-5 w-2xs">
                ${subTotal.toFixed(2)}
              </td>
            </tr>
            <tr className="">
              <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                Total
              </th>
              <td className="font-dmSans text-base text-menuHeading py-4 px-5 w-2xs">
                389.99 $
              </td>
            </tr>
          </table>
          <Link to={"/checkout"}>
            <button className="py-5 px-8 text-white text-sm font-bold font-dmSa bg-menuHeading cursor-pointer border border-menuHeading">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Cart;
