import React, { useState } from "react";
import Intro from "../Intro";
import Container from "../Container";
import { ImCross } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import useCart from "@/store/cart";
import toast from "react-hot-toast";
import axios from "axios";

const Cart = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(
    (state) => state,
  );
  let subTotal = items.reduce(
    (total, item) =>
      total + (item.price || item.variants[0].price) * item.quantity,
    0,
  );

  // coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // apply coupon
  const handleCoupon = async () => {
    try {
      const res = await axios.post(
        "https://mern-ecommerce-91cv.onrender.com/api/v1/coupon/apply-coupon",
        {
          code: couponCode,
          subtotal: subTotal,
        },
      );

      setDiscount(res.data.discount);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      setDiscount(0);
    }
  };

  // final total
  const total = Math.max(subTotal - discount, 0);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <Intro text={"Cart"} pText={"Cart"} />

        <Container>
          <div className="pb-14 text-center">
            <h2 className="text-3xl font-bold">Your cart is empty</h2>

            <Link to={"/shop"}>
              <button className="mt-5 px-6 py-3 bg-black text-white cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </Container>
      </>
    );
  }

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
          {items.map((item) => (
            <tbody className="border border-infoBg w-full">
              <tr>
                <td className="px-5 py-6">
                  <div className="flex items-center">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        removeFromCart(item._id || item.id);
                      }}>
                      <ImCross />
                    </button>
                    <img
                      src={
                        item.thumbnail ||
                        item.image ||
                        item.variants[0].images[0]
                      }
                      className="w-20 h-20 bg-[#D8D8D8] ml-10 mx-5"
                    />
                    <div className="text-left space-y-2.5">
                      <h3 className="text-[15px] font-dmSans font-bold text-menuHeading">
                        {item.name || item.title}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="text-[20px] font-dmSans font-bold text-menuHeading py-6 px-5">
                  ${item.price || item.variants[0].price}
                </td>
                <td className="py-6 px-5">
                  <div className="py-1.5 px-4 w-36 border border-infoBg flex gap-x-10 font-dmSans text-header justify-center">
                    <button
                      onClick={() => decreaseQuantity(item._id || item.id)}
                      className="cursor-pointer">
                      -
                    </button>
                    <h6>{item.quantity}</h6>
                    <button
                      onClick={() => increaseQuantity(item._id || item.id)}
                      className="cursor-pointer">
                      +
                    </button>
                  </div>
                </td>
                <td className="text-[20px] font-dmSans font-bold text-menuHeading py-6 px-5">
                  $
                  {(
                    item.quantity * (item.price || item.variants[0].price)
                  ).toFixed(2)}
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

            {/* coupon */}
            <Field orientation="horizontal">
              <Input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border-2 border-infoBg rounded-none"
              />

              <Button
                className="rounded-none cursor-pointer font-dmSans"
                onClick={handleCoupon}>
                Apply Coupon
              </Button>
            </Field>
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
            <tbody>
              <tr className="border-b border-infoBg">
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Subtotal
                </th>
                <td className="font-dmSans font-medium text-base text-header py-4 px-5 w-2xs">
                  ${subTotal.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-infoBg">
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Discount
                </th>
                <td className="font-dmSans text-base text-header py-4 px-5 w-2xs">
                  -${discount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Total
                </th>
                <td className="font-dmSans text-base text-menuHeading py-4 px-5 w-2xs font-semibold">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tbody>
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
