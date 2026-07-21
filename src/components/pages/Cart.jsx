import React, { useState } from "react";
import Intro from "../Intro";
import Container from "../Container";
import { ImCross } from "react-icons/im";
import { Button } from "@/components/ui/button";
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
import { Minus, Plus, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import {
  getCartLineId,
  getCartLineImage,
  getCartLineName,
  getCartLinePrice,
} from "@/lib/cartUtils";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";

const Cart = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(
    (state) => state,
  );

  const subTotal = items.reduce(
    (total, item) => total + getCartLinePrice(item) * item.quantity,
    0,
  );

  // coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // apply coupon
  const handleCoupon = async () => {
    try {
      const res = await apiClient.post(apiPaths.coupon.apply, {
        code: couponCode,
        subtotal: subTotal,
      });
      setDiscount(res.data.discount);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setDiscount(0);
    }
  };

  // final total
  const total = Math.max(subTotal - discount, 0);
  const savings = subTotal > 0 ? ((discount / subTotal) * 100).toFixed(0) : 0;

  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <Intro text={"Cart"} pText={"Cart"} />
        <Container>
          <div className="flex flex-col items-center justify-center pb-24 px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-menuHeading dark:text-[#262626]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-menuHeading mb-8 max-w-md">
              Looks like you haven't added anything yet. Let's find something
              you'll love.
            </p>
            <Link to="/shop">
              <Button className="px-8 py-6 text-base font-semibold rounded-full bg-black hover:bg-gray-800 text-white cursor-pointer">
                Continue Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
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
        <div className="py-10 px-4 lg:px-0">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-menuHeading">
              Shopping Cart
            </h1>
            <p className="text-header mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT — Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Header (desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-menuHeading dark:text-[#262626]">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const lineId = getCartLineId(item);
                    const price = getCartLinePrice(item);
                    const lineTotal = (item.quantity * price).toFixed(2);
                    return (
                      <div
                        key={lineId}
                        className="grid grid-cols-12 gap-4 px-4 md:px-6 py-5 items-center hover:bg-gray-50/50 transition-colors">
                        {/* Product */}
                        <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                          <button
                            onClick={() => removeFromCart(lineId)}
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-menuHeading dark:text-[#262626] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                            aria-label="Remove item">
                            <ImCross className="w-2.5 h-2.5" />
                          </button>
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={getCartLineImage(item)}
                              alt={getCartLineName(item)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {getCartLineName(item)}
                            </h3>
                            {(item.color || item.size) && (
                              <p className="text-xs text-menuHeading mt-0.5">
                                {[item.color, item.size]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            )}
                            <p className="text-sm text-menuHeading md:hidden mt-1">
                              ${price}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:block col-span-2 text-center text-menuHeading dark:text-[#262626] font-medium">
                          ${price}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-6 md:col-span-2 flex justify-start md:justify-center">
                          <div className="inline-flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <button
                              onClick={() => decreaseQuantity(lineId)}
                              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Decrease quantity">
                              <Minus className="w-3.5 h-3.5 dark:text-[#262626]" />
                            </button>
                            <span className="w-10 text-center font-semibold text-sm dark:text-[#262626]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(lineId)}
                              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Increase quantity">
                              <Plus className="w-3.5 h-3.5 dark:text-[#262626]" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-6 md:col-span-2 text-right font-bold text-gray-900">
                          ${lineTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coupon + size */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-menuHeading dark:text-[#262626] mb-3">
                    Select Size
                  </label>
                  <Select>
                    <SelectTrigger className="rounded-xl dark:border-[#E5E7EB]">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sizes</SelectLabel>
                        <SelectItem value="xs">Extra Small</SelectItem>
                        <SelectItem value="s">Small</SelectItem>
                        <SelectItem value="m">Medium</SelectItem>
                        <SelectItem value="l">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-menuHeading dark:text-[#262626] mb-3">
                    <Tag className="inline w-3.5 h-3.5 mr-1" />
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-xl dark:text-[#262626] font-bold dark:border-[#E5E7EB]"
                    />
                    <Button
                      onClick={handleCoupon}
                      className="rounded-xl bg-black hover:bg-gray-800 text-white px-5 shrink-0 cursor-pointer">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  className="rounded-full border-gray-300 hover:bg-gray-50 cursor-pointer">
                  Update Cart
                </Button>
              </div>
            </div>

            {/* RIGHT — Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">
                <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3 py-5">
                  <div className="flex justify-between text-menuHeading dark:text-[#262626]">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${subTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-menuHeading dark:text-[#262626]">
                    <span>
                      Discount
                      {discount > 0 && (
                        <span className="ml-2 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          -{savings}%
                        </span>
                      )}
                    </span>
                    <span className="font-medium text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-menuHeading dark:text-[#262626]">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </div>
                    <div className="text-xs text-menuHeading dark:text-[#262626]">
                      USD, tax incl.
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full py-6 rounded-full bg-black hover:bg-gray-800 text-white text-base font-semibold cursor-pointer">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>

                <Link
                  to="/shop"
                  className="block text-center mt-4 text-sm text-menuHeading dark:text-[#262626] hover:text-gray-900 transition-colors">
                  ← Continue Shopping
                </Link>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-menuHeading dark:text-[#262626]">
                  <span>🔒</span>
                  <span>Secure checkout · SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
