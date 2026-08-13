import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  User,
} from "lucide-react";
import Container from "../Container";
import Intro from "../Intro";

function formatMoney(value, currency = "USD") {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getOrderFromStorage() {
  try {
    const rawOrder = sessionStorage.getItem("last-successful-order");
    return rawOrder ? JSON.parse(rawOrder) : null;
  } catch {
    return null;
  }
}

const OrderSuccess = () => {
  const location = useLocation();
  const order = useMemo(
    () => location.state?.order || getOrderFromStorage(),
    [location.state],
  );

  const pricing = order?.pricing || {};
  const currency = pricing.currency || order?.payment?.currency || "USD";
  const items = Array.isArray(order?.items) ? order.items : [];
  const orderNumber = order?.orderNumber || "Order confirmed";
  const orderId = order?._id || "";
  const customer = order?.customer || {};
  const payment = order?.payment || {};

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
          const isDone = s.num < 4;
          const isActive = s.num === 4;

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
      <Intro text="Order Confirmation" pText="Order Confirmation" />
      <section className="bg-background py-10 font-dmSans">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Step Bar */}
            <div className="flex justify-end">{renderProgressBar()}</div>

            {/* Header Banner */}
            <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-white/5 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                      Order Confirmed
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-menuHeading dark:text-white sm:text-3xl">
                      Thank you for your order!
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-menuHeading dark:text-gray-300">
                      We have received your order and started processing it. A
                      confirmation has been saved to your account.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-white/10 shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading dark:text-white">
                    Order Number
                  </p>
                  <p className="mt-1 break-all text-lg font-bold text-menuHeading dark:text-white">
                    {orderNumber}
                  </p>
                  {orderId ? (
                    <p className="mt-1 break-all text-xs text-menuHeading dark:text-gray-300">
                      ID: {orderId}
                    </p>
                  ) : null}
                  {order?.createdAt ? (
                    <p className="mt-1 text-xs text-menuHeading dark:text-gray-300">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Stats Overview */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-white/10">
                  <ReceiptText className="mb-2 h-5 w-5 text-menuHeading dark:text-white" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading dark:text-gray-300">
                    Total Amount
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading dark:text-white">
                    {formatMoney(pricing.total, currency)}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-white/10">
                  <CreditCard className="mb-2 h-5 w-5 text-menuHeading dark:text-white" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading dark:text-gray-300">
                    Payment Method
                  </p>
                  <p className="mt-1 text-sm font-bold text-menuHeading dark:text-white truncate">
                    {payment.method || "Cash on Delivery"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-white/10">
                  <ShoppingBag className="mb-2 h-5 w-5 text-menuHeading dark:text-white" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading dark:text-gray-300">
                    Total Items
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading dark:text-white">
                    {items.reduce(
                      (sum, item) => sum + (Number(item.quantity) || 0),
                      0,
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-white/10">
                  <PackageCheck className="mb-2 h-5 w-5 text-menuHeading dark:text-white" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading dark:text-gray-300">
                    Order Status
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading dark:text-white">
                    {order?.orderStatus || "Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Order Items */}
              <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-white/5 lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-menuHeading dark:text-white" />
                  <h2 className="text-xl font-bold text-menuHeading dark:text-white">
                    Purchased Items
                  </h2>
                </div>

                {items.length ? (
                  <div className="divide-y divide-gray-200 dark:divide-white/10">
                    {items.map((item, index) => (
                      <div
                        key={item._id || item.variantId || index}
                        className="flex gap-4 py-4">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-lg border border-gray-200 bg-white dark:bg-white/10" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-menuHeading dark:text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-menuHeading dark:text-gray-300">
                            {[item.color, item.size, item.sku]
                              .filter(Boolean)
                              .join(" / ")}
                          </p>
                          <p className="mt-2 text-sm text-menuHeading dark:text-gray-200">
                            Qty {item.quantity} x{" "}
                            {formatMoney(item.unitPrice, currency)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-menuHeading dark:text-white">
                          {formatMoney(item.lineTotal, currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-menuHeading dark:text-white">
                    Your order details have been saved.
                  </p>
                )}
              </div>

              {/* Receipt Summary & Actions */}
              <aside className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-white/5 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-menuHeading dark:text-white">
                    Payment Breakdown
                  </h2>
                  <div className="mt-5 space-y-3 text-sm text-menuHeading dark:text-gray-200">
                    <div className="flex justify-between gap-4">
                      <span>Subtotal</span>
                      <span>
                        {formatMoney(pricing.itemsSubtotal, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Discount</span>
                      <span>-{formatMoney(pricing.discount, currency)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Shipping</span>
                      <span>
                        {formatMoney(pricing.shippingCost, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Tax</span>
                      <span>{formatMoney(pricing.tax, currency)}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-white/10 pt-3 text-base font-bold text-menuHeading dark:text-white">
                      <span>Total Paid</span>
                      <span>{formatMoney(pricing.total, currency)}</span>
                    </div>
                  </div>
                </div>

                {customer.firstName && (
                  <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Delivered To
                    </p>
                    <p className="mt-1 text-sm font-bold text-menuHeading dark:text-white">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-xs text-menuHeading dark:text-gray-300 mt-0.5">
                      {customer.street} {customer.apartment}
                    </p>
                    <p className="text-xs text-menuHeading dark:text-gray-300">
                      {customer.city}, {customer.postcode}
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <Link
                    to="/orders"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                    View My Orders <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-gray-300 bg-white dark:bg-transparent dark:border-white/20 px-4 text-sm font-semibold text-menuHeading dark:text-white transition hover:bg-gray-50 dark:hover:bg-white/10">
                    Continue Shopping
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OrderSuccess;
