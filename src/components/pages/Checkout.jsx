import React, { useMemo, useState } from "react";
import Intro from "../Intro";
import Container from "../Container";
import { Link, useNavigate } from "react-router-dom";
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
  Edit2,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { apiPaths } from "@/lib/productApi";
import apiClient from "@/lib/apiClient";
import useCart from "@/store/cart";
import { getCartLineName, getCartLinePrice } from "@/lib/cartUtils";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  // Multi-step state: step 2 = Checkout details, step 3 = Payment
  const [activeStep, setActiveStep] = useState(2);

  // Selected payment method: 'cod', 'bank', 'card'
  const [selectedBank, setSelectedBank] = useState("cod");

  // Simulated card form state (NEVER sent to backend or saved in persistent storage)
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Coupon toggle
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState("");

  // Customer checkout form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "bangladesh",
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
  const navigate = useNavigate();

  const update = (k) => (e) => {
    const v =
      e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const updateCard = (k) => (e) => {
    setCardForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  React.useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        firstName: f.firstName || user.firstName || "",
        lastName: f.lastName || user.lastName || "",
        email: f.email || user.email || "",
      }));
    }
  }, [user]);

  const { items, clearCart } = useCart((state) => state);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [submitError, setSubmitError] = useState("");

  const subTotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + getCartLinePrice(item) * (item.quantity || 1),
      0,
    );
  }, [items]);

  const shippingCost =
    shipping === "express" ? 19.99 : subTotal > 200 ? 0 : 9.99;
  const discount = discountAmount;
  const tax = Math.max(subTotal - discount, 0) * 0.05;
  const total = subTotal - discount + shippingCost + tax;

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponMsg("");
    try {
      const res = await apiClient.post(apiPaths.coupon.apply, {
        code: coupon,
        subtotal: subTotal,
      });
      const data = res.data;
      setCouponApplied(true);
      setDiscountAmount(Number(data?.discount) || 0);
      setCouponMsg(data?.message || "Coupon applied");
    } catch (error) {
      setCouponApplied(false);
      setDiscountAmount(0);
      setCouponMsg(
        error.response?.data?.message ||
          (error.response
            ? "Invalid coupon"
            : "Unable to apply coupon. Please try again."),
      );
    }
  };

  // Validate step 2: Checkout details
  const validateCheckoutStep = () => {
    const e = {};
    if (!items?.length) e.cart = "Your cart is empty";
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.country) e.country = "Select a country";
    if (!form.street.trim()) e.street = "Street address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.postcode.trim()) e.postcode = "Postcode / ZIP is required";
    if (!/^\+?[0-9\s-]{7,}$/.test(form.phone))
      e.phone = "Valid phone number is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email address is required";
    if (!form.terms) e.terms = "You must accept the terms & conditions";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Validate step 3: Card details if card selected
  const validateCardPayment = () => {
    if (selectedBank !== "card") return true;

    const e = {};
    const cleanNum = cardForm.cardNumber.replace(/\s+/g, "");

    if (!cardForm.cardName.trim()) {
      e.cardName = "Name on card is required";
    }
    if (!/^\d{15,16}$/.test(cleanNum)) {
      e.cardNumber = "Enter a valid 15-16 digit card number";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardForm.cardExpiry)) {
      e.cardExpiry = "Expiry format must be MM/YY";
    }
    if (!/^\d{3,4}$/.test(cardForm.cardCvc)) {
      e.cardCvc = "3 or 4 digit CVC required";
    }

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return false;
    }

    // Demo decline case simulation
    if (cleanNum.endsWith("0000")) {
      const declineMsg =
        "Simulated Card Payment Declined. Please try a valid demo card or choose another payment method.";
      setSubmitError(declineMsg);
      toast.error(declineMsg);
      return false;
    }

    return true;
  };

  // Move from Step 2 (Checkout) to Step 3 (Payment)
  const handleProceedToPayment = (ev) => {
    ev.preventDefault();
    if (!user) {
      const msg = "Please log in or create an account to complete your order.";
      setSubmitError(msg);
      toast.error(msg);
      return;
    }

    if (!validateCheckoutStep()) {
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitError("");
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Order Creation from Step 3 (Payment)
  const handleConfirmOrder = async (ev) => {
    ev.preventDefault();

    if (!user) {
      const msg = "Please log in or create an account to complete your order.";
      setSubmitError(msg);
      toast.error(msg);
      return;
    }

    if (!validateCheckoutStep()) {
      setActiveStep(2);
      return;
    }

    if (!selectedBank) {
      setErrors({ payment: "Please select a payment method" });
      return;
    }

    if (!validateCardPayment()) {
      return;
    }

    // Prevent duplicate submission
    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          country: form.country,
          street: form.street,
          apartment: form.apartment,
          city: form.city,
          county: form.county,
          postcode: form.postcode,
          phone: form.phone,
          email: form.email,
          notes: form.notes,
        },
        payment: {
          method: selectedBank,
          status: selectedBank === "cod" ? "Pending" : "Paid",
          currency: "USD",
          amount: Number(total.toFixed(2)),
        },
        shippingMethod: shipping,
        pricing: {
          currency: "USD",
          discount: Number(discount.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          shippingCost: Number(shippingCost.toFixed(2)),
        },
        items: items.map((it) => {
          const quantity = Math.max(1, Number(it.quantity) || 1);
          const productId = it.productId || it._id || it.id;

          return {
            productId: productId ? String(productId) : "",
            variantId: it.variantId,
            sku: it.sku,
            name: it.name || it.title,
            image: it.image,
            color: it.color,
            size: it.size,
            ram: it.ram,
            storage: it.storage,
            badge: it.badge,
            quantity,
            price: Number(getCartLinePrice(it)),
          };
        }),
      };

      const res = await apiClient.post(apiPaths.orders.create, payload);
      const order = res?.data?.data;
      toast.success(res?.data?.message || "Order placed successfully");

      if (order) {
        sessionStorage.setItem("last-successful-order", JSON.stringify(order));
      }

      // Clear cart ONLY AFTER successful order creation
      clearCart();

      navigate("/order-success", {
        replace: true,
        state: { order },
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to place order. Please check your details and try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (key) =>
    `w-full rounded-lg border bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-menuHeading dark:text-white outline-none transition focus:ring-2 focus:ring-gray-900/10 ${
      errors[key] ? "border-red-500" : "border-gray-200 focus:border-gray-400"
    }`;

  const renderProgressBar = () => {
    const steps = [
      { num: 1, label: "Cart", key: "cart" },
      { num: 2, label: "Checkout", key: "checkout" },
      { num: 3, label: "Payment", key: "payment" },
      { num: 4, label: "Confirmation", key: "confirmation" },
    ];

    return (
      <ol className="flex items-center gap-2 text-xs sm:text-sm">
        {steps.map((s, i) => {
          const isDone = s.num < activeStep;
          const isActive = s.num === activeStep;

          return (
            <li key={s.key} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition ${
                  isDone
                    ? "bg-green-600 text-white"
                    : isActive
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "bg-gray-200 text-menuHeading dark:bg-white/20 dark:text-white"
                }`}>
                {isDone ? <Check className="h-3.5 w-3.5" /> : s.num}
              </span>
              <span
                className={`${
                  isActive
                    ? "font-bold text-menuHeading dark:text-white"
                    : isDone
                      ? "font-medium text-green-700 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400"
                }`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" />
              )}
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <>
      <Intro text={"Checkout"} pText={"Checkout"} />
      <section className="bg-background py-10 font-dmSans">
        <Container>
          {/* Breadcrumb / Steps */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to={activeStep === 3 ? "#" : "/cart"}
              onClick={(e) => {
                if (activeStep === 3) {
                  e.preventDefault();
                  setActiveStep(2);
                }
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-menuHeading dark:text-white hover:underline cursor-pointer">
              <ArrowLeft className="h-4 w-4" />{" "}
              {activeStep === 3 ? "Back to Checkout Details" : "Back to Cart"}
            </Link>
            {renderProgressBar()}
          </div>

          {!user && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-amber-900 dark:text-amber-200">
                      Sign in to complete your order
                    </h2>
                    <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                      Log in or create a new account. Your shopping cart items
                      will be saved.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    state={{ from: { pathname: "/checkout" } }}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-5 text-xs font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    state={{ from: { pathname: "/checkout" } }}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-900 bg-white px-5 text-xs font-semibold text-gray-900 transition hover:bg-gray-50 dark:bg-transparent dark:border-white dark:text-white">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Coupon notice */}
          {activeStep === 2 && (
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-bHeaderBg dark:bg-white/5 px-5 py-4 text-sm">
              <Tag className="h-4 w-4 text-menuHeading dark:text-gray-200" />
              <span className="text-menuHeading dark:text-gray-200">
                Have a coupon?
              </span>
              <button
                type="button"
                onClick={() => setShowCoupon((v) => !v)}
                className="font-semibold text-menuHeading underline-offset-4 hover:underline cursor-pointer">
                Click here to enter your code
              </button>
            </div>
          )}

          {showCoupon && activeStep === 2 && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="h-11 dark:text-[#262626] font-bold"
                />
                <Button
                  type="button"
                  onClick={applyCoupon}
                  className="h-11 bg-gray-900 px-6 text-white hover:bg-gray-800 cursor-pointer">
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

          {errors.cart ? (
            <p
              data-error="true"
              className="mb-6 text-sm text-red-500 font-semibold">
              {errors.cart}
            </p>
          ) : null}

          <form
            onSubmit={
              activeStep === 2 ? handleProceedToPayment : handleConfirmOrder
            }
            className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* LEFT COLUMN */}
            <div className="space-y-6 lg:col-span-2">
              {/* STEP 2: CHECKOUT DETAILS FORM */}
              {activeStep === 2 && (
                <>
                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-6 sm:p-8 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold tracking-tight text-menuHeading dark:text-white">
                      Billing & Shipping details
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="checkout-firstname"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          First Name *
                        </label>
                        <input
                          id="checkout-firstname"
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
                        <label
                          htmlFor="checkout-lastname"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          Last Name *
                        </label>
                        <input
                          id="checkout-lastname"
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
                      <label
                        htmlFor="checkout-company"
                        className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                        Company Name (Optional)
                      </label>
                      <input
                        id="checkout-company"
                        className={inputCls("company")}
                        value={form.company}
                        onChange={update("company")}
                      />
                    </div>

                    <div className="mt-5">
                      <label className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
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
                          className={`h-11 ${
                            errors.country ? "border-red-500" : ""
                          }`}>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Country</SelectLabel>
                            <SelectItem value="bangladesh">
                              Bangladesh
                            </SelectItem>
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
                      <label className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
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
                        <p className="mt-1 text-xs text-red-500">
                          {errors.street}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="checkout-city"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          Town/City *
                        </label>
                        <input
                          id="checkout-city"
                          data-error={!!errors.city}
                          className={inputCls("city")}
                          value={form.city}
                          onChange={update("city")}
                        />
                        {errors.city && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="checkout-county"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          County (optional)
                        </label>
                        <input
                          id="checkout-county"
                          className={inputCls("county")}
                          value={form.county}
                          onChange={update("county")}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="checkout-postcode"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          Post Code *
                        </label>
                        <input
                          id="checkout-postcode"
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
                        <label
                          htmlFor="checkout-phone"
                          className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                          Phone *
                        </label>
                        <input
                          id="checkout-phone"
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
                      <label
                        htmlFor="checkout-email"
                        className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                        Email Address *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        data-error={!!errors.email}
                        className={inputCls("email")}
                        value={form.email}
                        onChange={update("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <label className="mb-1.5 block text-sm font-medium text-menuHeading dark:text-white">
                        Order Notes (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Notes about your order, e.g. special delivery instructions."
                        className={inputCls("notes")}
                        value={form.notes}
                        onChange={update("notes")}
                      />
                    </div>
                  </div>

                  {/* Shipping Method Selection */}
                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-6 sm:p-8 shadow-sm">
                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-menuHeading dark:text-white">
                      <Truck className="h-5 w-5" /> Shipping method
                    </h2>
                    <div className="space-y-3">
                      {[
                        {
                          id: "standard",
                          title: "Standard delivery",
                          desc: "3–5 business days",
                          cost: subTotal > 200 ? "Free" : "$9.99",
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
                              ? "border-gray-900 bg-gray-50 dark:bg-white/10 dark:border-white"
                              : "border-gray-200 hover:border-gray-300 dark:border-white/10"
                          }`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              className="h-4 w-4 accent-menuHeading dark:accent-white cursor-pointer"
                              checked={shipping === opt.id}
                              onChange={() => setShipping(opt.id)}
                            />
                            <div>
                              <p className="text-sm font-semibold text-menuHeading dark:text-white">
                                {opt.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-menuHeading dark:text-white">
                            {opt.cost}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3: PAYMENT METHOD SELECTION & CONFIRMATION */}
              {activeStep === 3 && (
                <>
                  {/* Delivery Address Review Summary */}
                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h2 className="font-bold text-menuHeading dark:text-white text-base">
                          Shipping & Contact Information
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-menuHeading dark:text-white underline cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-menuHeading dark:text-gray-200">
                      <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px]">
                          Customer Name
                        </p>
                        <p className="mt-1 font-bold text-sm">
                          {form.firstName} {form.lastName}
                        </p>
                        <p className="mt-0.5">{form.email}</p>
                        <p className="mt-0.5">{form.phone}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px]">
                          Delivery Address
                        </p>
                        <p className="mt-1 font-bold text-sm">
                          {form.street}{" "}
                          {form.apartment ? `, ${form.apartment}` : ""}
                        </p>
                        <p className="mt-0.5">
                          {form.city}, {form.postcode}
                        </p>
                        <p className="mt-0.5 uppercase font-medium">
                          {form.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-6 sm:p-8 shadow-sm">
                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight text-menuHeading dark:text-white">
                      <Lock className="h-5 w-5" /> Payment Method
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          id: "cod",
                          title: "Cash on Delivery",
                          icon: Wallet,
                          desc: "Pay with cash upon delivery of your items to your door.",
                        },
                        {
                          id: "bank",
                          title: "Direct Bank Transfer",
                          icon: Banknote,
                          desc: "Transfer funds directly to our bank account. Instructions will be provided.",
                        },
                        {
                          id: "card",
                          title: "Credit / Debit Card (Simulated Demo)",
                          icon: CreditCard,
                          desc: "Simulated demo card payment. Card details are processed in demo mode only.",
                        },
                      ].map((m) => {
                        const Icon = m.icon;
                        const active = selectedBank === m.id;
                        return (
                          <div
                            key={m.id}
                            className={`rounded-xl border transition ${
                              active
                                ? "border-gray-900 bg-gray-50 dark:bg-white/10 dark:border-white"
                                : "border-gray-200 hover:border-gray-300 dark:border-white/10"
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
                                className="h-4 w-4 accent-menuHeading dark:accent-white cursor-pointer"
                              />
                              <Icon className="h-5 w-5 text-menuHeading dark:text-white" />
                              <span className="text-sm font-semibold text-menuHeading dark:text-white">
                                {m.title}
                              </span>
                            </label>
                            {active && (
                              <div className="border-t border-gray-200 dark:border-white/10 px-4 py-4 text-xs text-menuHeading dark:text-gray-200">
                                <p className="leading-relaxed">{m.desc}</p>

                                {/* Direct Bank Transfer Instructions */}
                                {m.id === "bank" && (
                                  <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/40 p-3 space-y-1 text-blue-900 dark:text-blue-200 text-xs">
                                    <p className="font-bold flex items-center gap-1">
                                      <Building2 className="h-3.5 w-3.5" /> Bank
                                      Details for Transfer:
                                    </p>
                                    <p>Account Name: Orebi Commerce Store</p>
                                    <p>Bank: Standard Demo Bank</p>
                                    <p>Account Number: 9876-5432-1098</p>
                                    <p className="italic text-[11px] text-blue-700 dark:text-blue-300">
                                      Please use your Order ID as payment
                                      reference after confirmation.
                                    </p>
                                  </div>
                                )}

                                {/* Credit Card Demo Form */}
                                {m.id === "card" && (
                                  <div className="mt-4 space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#191E28]">
                                    <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-2.5 rounded-lg">
                                      <span className="flex items-center gap-1.5 font-semibold">
                                        <AlertTriangle className="h-4 w-4" />{" "}
                                        Demo Payment Mode
                                      </span>
                                      <span className="text-[11px]">
                                        No real card is charged
                                      </span>
                                    </div>

                                    <div>
                                      <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                        Cardholder Name *
                                      </label>
                                      <input
                                        placeholder="John Doe"
                                        value={cardForm.cardName}
                                        onChange={updateCard("cardName")}
                                        className={inputCls("cardName")}
                                      />
                                      {errors.cardName && (
                                        <p className="mt-1 text-[11px] text-red-500">
                                          {errors.cardName}
                                        </p>
                                      )}
                                    </div>

                                    <div>
                                      <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                        Card Number *
                                      </label>
                                      <input
                                        placeholder="4532 0123 4567 8910"
                                        maxLength={19}
                                        value={cardForm.cardNumber}
                                        onChange={updateCard("cardNumber")}
                                        className={inputCls("cardNumber")}
                                      />
                                      {errors.cardNumber && (
                                        <p className="mt-1 text-[11px] text-red-500">
                                          {errors.cardNumber}
                                        </p>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                          Expiry (MM/YY) *
                                        </label>
                                        <input
                                          placeholder="12/28"
                                          maxLength={5}
                                          value={cardForm.cardExpiry}
                                          onChange={updateCard("cardExpiry")}
                                          className={inputCls("cardExpiry")}
                                        />
                                        {errors.cardExpiry && (
                                          <p className="mt-1 text-[11px] text-red-500">
                                            {errors.cardExpiry}
                                          </p>
                                        )}
                                      </div>
                                      <div>
                                        <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                          CVC *
                                        </label>
                                        <input
                                          placeholder="123"
                                          maxLength={4}
                                          value={cardForm.cardCvc}
                                          onChange={updateCard("cardCvc")}
                                          className={inputCls("cardCvc")}
                                        />
                                        {errors.cardCvc && (
                                          <p className="mt-1 text-[11px] text-red-500">
                                            {errors.cardCvc}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {errors.payment && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.payment}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Order Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-6 shadow-sm">
                  <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-menuHeading dark:text-white">
                    <ShoppingBag className="h-5 w-5" /> Your order
                  </h2>
                  <div className="divide-y divide-gray-100 dark:divide-white/10">
                    <div className="flex items-center justify-between pb-3 text-xs font-semibold uppercase tracking-wider text-menuHeading dark:text-gray-300">
                      <span>Product</span>
                      <span>Total</span>
                    </div>
                    {items.map((it, idx) => {
                      const linePrice = getCartLinePrice(it);
                      const qty = it.quantity || 1;
                      const lineTotal = linePrice * qty;
                      return (
                        <div
                          key={it.variant?._id || it._id || idx}
                          className="flex items-center justify-between py-3 text-sm">
                          <span className="text-menuHeading dark:text-gray-200">
                            {getCartLineName(it)}{" "}
                            <span className="text-gray-500 dark:text-gray-400">
                              x {qty}
                            </span>
                          </span>
                          <span className="font-medium text-menuHeading dark:text-white">
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between py-3 text-sm text-menuHeading dark:text-gray-200">
                      <span>Subtotal</span>
                      <span>${subTotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex items-center justify-between py-3 text-sm text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-3 text-sm text-menuHeading dark:text-gray-200">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 text-sm text-menuHeading dark:text-gray-200">
                      <span>Tax (5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 text-base">
                      <span className="font-semibold text-menuHeading dark:text-white">
                        Total
                      </span>
                      <span className="text-xl font-bold text-menuHeading dark:text-white">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {activeStep === 2 && (
                    <label className="mt-5 flex items-start gap-2 text-xs text-menuHeading dark:text-gray-300">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-menuHeading dark:accent-white cursor-pointer"
                        checked={form.terms}
                        onChange={update("terms")}
                        data-error={!!errors.terms}
                      />
                      <span>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="font-semibold text-menuHeading dark:text-white underline">
                          terms & conditions
                        </Link>{" "}
                        and privacy policy.
                      </span>
                    </label>
                  )}
                  {errors.terms && (
                    <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
                  )}

                  {submitError ? (
                    <p className="mt-3 text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      {submitError}
                    </p>
                  ) : null}

                  {/* SUBMIT CONTROLS */}
                  {user ? (
                    activeStep === 2 ? (
                      <Button
                        type="submit"
                        className="mt-5 h-12 w-full bg-gray-900 text-base font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 cursor-pointer">
                        Continue to Payment <ChevronRight className="h-5 w-5" />
                      </Button>
                    ) : (
                      <div className="mt-5 space-y-3">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="h-12 w-full bg-green-700 text-base font-semibold text-white hover:bg-green-800 cursor-pointer">
                          {submitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />{" "}
                              Creating Order…
                            </>
                          ) : (
                            <>Confirm Payment & Place Order</>
                          )}
                        </Button>
                        <button
                          type="button"
                          onClick={() => setActiveStep(2)}
                          className="w-full text-center text-xs font-semibold text-gray-500 dark:text-gray-400 hover:underline cursor-pointer">
                          Back to Checkout Details
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs dark:bg-amber-950/40 dark:border-amber-800">
                        <p className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-1">
                          <Lock className="h-4 w-4" /> Account Required
                        </p>
                        <p className="text-amber-800 dark:text-amber-300">
                          Please sign in or create an account to complete your
                          purchase.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/login"
                          state={{ from: { pathname: "/checkout" } }}
                          className="inline-flex h-11 items-center justify-center rounded-xl bg-gray-900 px-3 text-xs font-semibold text-white transition hover:bg-gray-800 text-center">
                          Log In
                        </Link>
                        <Link
                          to="/signup"
                          state={{ from: { pathname: "/checkout" } }}
                          className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-900 bg-white px-3 text-xs font-semibold text-gray-900 transition hover:bg-gray-50 dark:bg-transparent dark:border-white dark:text-white text-center">
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-menuHeading dark:text-gray-300">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Secure SSL encrypted checkout
                  </div>
                </div>

                {/* Trust badges */}
                <div className="rounded-2xl border border-gray-200 bg-bHeaderBg dark:bg-white/5 p-5 shadow-sm">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-menuHeading dark:text-white">
                    We accept
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["VISA", "MC", "AMEX", "PayPal", "Apple Pay"].map((b) => (
                      <span
                        key={b}
                        className="rounded-md border border-gray-200 bg-gray-50 dark:bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-menuHeading dark:text-white">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-menuHeading dark:text-white">
                    <div className="rounded-lg bg-gray-50 dark:bg-white/10 p-2">
                      <Truck className="mx-auto mb-1 h-4 w-4" /> Free returns
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-white/10 p-2">
                      <ShieldCheck className="mx-auto mb-1 h-4 w-4" /> Buyer
                      protection
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-white/10 p-2">
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
