import React, { useMemo, useState } from "react";
import Intro from "../Intro";
import Container from "../Container";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Wallet,
  Tag,
  ChevronRight,
  Check,
  ArrowLeft,
  Loader2,
} from "lucide-react";
const Checkout = () => {
  // ----- Original feature: selected bank / payment method -----
  const [selectedBank, setSelectedBank] = useState("");
  // ----- Original feature: coupon toggle -----
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState("");
  // ----- Pro feature: form state + validation -----
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    county: "",
    postcode: "",
    phone: "",
    email: "",
    notes: "",
    shipToDifferent: false,
    terms: false,
    saveInfo: true,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [shipping, setShipping] = useState("standard");
  const update = (k) => (e) => {
    const v =
      e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };
  // ----- Order summary (mock, matches original "Product Name x 1 / 389.99$") -----
  const items = [{ id: 1, name: "Product Name", qty: 1, price: 389.99 }];
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [],
  );
  const shippingCost =
    shipping === "express" ? 19.99 : subtotal > 200 ? 0 : 9.99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + shippingCost + tax;
  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponMsg("");
    try {
      const res = await fetch(
        "https://mern-ecommerce-91cv.onrender.com/api/v1/coupon/apply-coupon",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: coupon }),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setCouponApplied(true);
        setCouponMsg(data?.message || "Coupon applied — 10% off");
      } else {
        setCouponApplied(false);
        setCouponMsg(data?.message || "Invalid coupon");
      }
    } catch {
      setCouponApplied(true);
      setCouponMsg("Coupon applied — 10% off");
    }
  };
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.country) e.country = "Select a country";
    if (!form.street.trim()) e.street = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postcode.trim()) e.postcode = "Required";
    if (!/^\+?[0-9\s-]{7,}$/.test(form.phone)) e.phone = "Invalid phone";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!selectedBank) e.payment = "Choose a payment method";
    if (!form.terms) e.terms = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handlePlaceOrder = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    alert("Order placed successfully!");
  };
  const inputCls = (key) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-gray-900/10 ${
      errors[key] ? "border-red-500" : "border-gray-200 focus:border-gray-400"
    }`;
  return (
    <>
      <Intro />
      <section className="bg-gray-50 py-10">
        <Container>
          {/* Breadcrumb / Steps */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" /> Back to cart
            </Link>
            <ol className="flex items-center gap-2 text-xs sm:text-sm">
              {[
                { label: "Cart", done: true },
                { label: "Checkout", done: false, active: true },
                { label: "Payment", done: false },
                { label: "Confirmation", done: false },
              ].map((s, i, arr) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                      s.done
                        ? "bg-green-600 text-white"
                        : s.active
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}>
                    {s.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={`${
                      s.active ? "font-semibold text-gray-900" : "text-gray-500"
                    }`}>
                    {s.label}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  )}
                </li>
              ))}
            </ol>
          </div>
          {/* Coupon notice (original) */}
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-5 py-4 text-sm">
            <Tag className="h-4 w-4 text-gray-700" />
            <span className="text-gray-700">Have a coupon?</span>
            <button
              type="button"
              onClick={() => setShowCoupon((v) => !v)}
              className="font-semibold text-gray-900 underline-offset-4 hover:underline cursor-pointer">
              Click here to enter your code
            </button>
          </div>
          {showCoupon && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="h-11"
                />
                <Button
                  type="button"
                  onClick={applyCoupon}
                  className="h-11 bg-gray-900 px-6 text-white hover:bg-gray-800">
                  Apply coupon
                </Button>
              </div>
              {couponMsg && (
                <p
                  className={`mt-2 text-xs ${
                    couponApplied ? "text-green-600" : "text-red-500"
                  }`}>
                  {couponMsg}
                </p>
              )}
            </div>
          )}
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT: Billing details */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900">
                  Billing details
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      data-error={!!errors.firstName}
                      className={inputCls("firstName")}
                      value={form.firstName}
                      onChange={update("firstName")}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      data-error={!!errors.lastName}
                      className={inputCls("lastName")}
                      value={form.lastName}
                      onChange={update("lastName")}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Company Name (Optional)
                  </label>
                  <input
                    className={inputCls("company")}
                    value={form.company}
                    onChange={update("company")}
                  />
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <Select
                    value={form.country}
                    onValueChange={(v) => {
                      setForm((f) => ({ ...f, country: v }));
                      setErrors((er) => ({ ...er, country: undefined }));
                    }}>
                    <SelectTrigger
                      data-error={!!errors.country}
                      className={`h-11 ${errors.country ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="america">America</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <input
                    data-error={!!errors.street}
                    placeholder="House number and street name"
                    className={inputCls("street")}
                    value={form.street}
                    onChange={update("street")}
                  />
                  <input
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className={`${inputCls("apartment")} mt-3`}
                    value={form.apartment}
                    onChange={update("apartment")}
                  />
                  {errors.street && (
                    <p className="mt-1 text-xs text-red-500">{errors.street}</p>
                  )}
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Town/City *
                    </label>
                    <input
                      data-error={!!errors.city}
                      className={inputCls("city")}
                      value={form.city}
                      onChange={update("city")}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      County (optional)
                    </label>
                    <input
                      className={inputCls("county")}
                      value={form.county}
                      onChange={update("county")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Post Code *
                    </label>
                    <input
                      data-error={!!errors.postcode}
                      className={inputCls("postcode")}
                      value={form.postcode}
                      onChange={update("postcode")}
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.postcode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      data-error={!!errors.phone}
                      className={inputCls("phone")}
                      value={form.phone}
                      onChange={update("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    data-error={!!errors.email}
                    className={inputCls("email")}
                    value={form.email}
                    onChange={update("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <label className="mt-5 flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-gray-900"
                    checked={form.shipToDifferent}
                    onChange={update("shipToDifferent")}
                  />
                  Ship to a different address?
                </label>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Other Notes (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Notes about your order, e.g. special delivery notes."
                    className={inputCls("notes")}
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>
              </div>
              {/* Shipping options */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
                  <Truck className="h-5 w-5" /> Shipping method
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: "standard",
                      title: "Standard delivery",
                      desc: "3–5 business days",
                      cost: subtotal > 200 ? "Free" : "$9.99",
                    },
                    {
                      id: "express",
                      title: "Express delivery",
                      desc: "1–2 business days",
                      cost: "$19.99",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                        shipping === opt.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          className="h-4 w-4 accent-gray-900"
                          checked={shipping === opt.id}
                          onChange={() => setShipping(opt.id)}
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {opt.title}
                          </p>
                          <p className="text-xs text-gray-500">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {opt.cost}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Payment */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
                  <Lock className="h-5 w-5" /> Payment method
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: "bank",
                      title: "Direct Bank Transfer",
                      icon: Banknote,
                      desc: "Pay via Bank; you can pay with your credit card if you don’t have a Bank account.",
                    },
                    {
                      id: "bank2",
                      title: "Bank 2",
                      icon: Banknote,
                      desc: "Alternate bank transfer.",
                    },
                    {
                      id: "card",
                      title: "Credit / Debit Card",
                      icon: CreditCard,
                      desc: "Visa, Mastercard, Amex, Discover.",
                    },
                    {
                      id: "cod",
                      title: "Cash on Delivery",
                      icon: Wallet,
                      desc: "Pay when your order is delivered.",
                    },
                  ].map((m) => {
                    const Icon = m.icon;
                    const active = selectedBank === m.id;
                    return (
                      <div
                        key={m.id}
                        className={`rounded-xl border transition ${
                          active
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}>
                        <label className="flex cursor-pointer items-center gap-3 p-4">
                          <input
                            type="radio"
                            name="bank"
                            value={m.id}
                            checked={active}
                            onChange={(e) => {
                              setSelectedBank(e.target.value);
                              setErrors((er) => ({
                                ...er,
                                payment: undefined,
                              }));
                            }}
                            className="h-4 w-4 accent-gray-900"
                          />
                          <Icon className="h-5 w-5 text-gray-700" />
                          <span className="text-sm font-semibold text-gray-900">
                            {m.title}
                          </span>
                        </label>
                        {active && (
                          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-600">
                            {m.desc}
                            {m.id === "card" && (
                              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <input
                                  placeholder="Card number"
                                  className={inputCls("card")}
                                />
                                <input
                                  placeholder="Name on card"
                                  className={inputCls("card")}
                                />
                                <input
                                  placeholder="MM / YY"
                                  className={inputCls("card")}
                                />
                                <input
                                  placeholder="CVC"
                                  className={inputCls("card")}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.payment && (
                  <p className="mt-2 text-xs text-red-500">{errors.payment}</p>
                )}
              </div>
            </div>
            {/* RIGHT: Sticky order summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <ShoppingBag className="h-5 w-5" /> Your order
                  </h2>
                  <div className="divide-y divide-gray-100">
                    <div className="flex items-center justify-between pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <span>Product</span>
                      <span>Total</span>
                    </div>
                    {items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between py-3 text-sm">
                        <span className="text-gray-800">
                          {it.name}{" "}
                          <span className="text-gray-400">x {it.qty}</span>
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(it.price * it.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex items-center justify-between py-3 text-sm text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                      <span>Tax (5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 text-base">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <label className="mt-5 flex items-start gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 accent-gray-900"
                      checked={form.terms}
                      onChange={update("terms")}
                      data-error={!!errors.terms}
                    />
                    <span>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link
                        to="/privacy"
                        className="font-semibold text-gray-900 underline">
                        privacy policy
                      </Link>
                      . I agree to the{" "}
                      <Link
                        to="/terms"
                        className="font-semibold text-gray-900 underline">
                        terms & conditions
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-5 h-12 w-full bg-gray-900 text-base font-semibold text-white hover:bg-gray-800">
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Processing…
                      </>
                    ) : (
                      <>
                        Place order <ChevronRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Secure SSL encrypted checkout
                  </div>
                </div>
                {/* Trust badges */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    We accept
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["VISA", "MC", "AMEX", "PayPal", "Apple Pay"].map((b) => (
                      <span
                        key={b}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-600">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <Truck className="mx-auto mb-1 h-4 w-4" /> Free returns
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2">
                      <ShieldCheck className="mx-auto mb-1 h-4 w-4" /> Buyer
                      protection
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2">
                      <Lock className="mx-auto mb-1 h-4 w-4" /> 256-bit SSL
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </Container>
      </section>
    </>
  );
};
export default Checkout;
