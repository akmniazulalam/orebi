import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
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

  return (
    <>
      <Intro text="Order Success" pText="Order Success" />
      <section className="bg-background py-10">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414] sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                      Order received
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-menuHeading">
                      Thank you for your order.
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-menuHeading">
                      We have received your checkout details and created your
                      order. You can use the order ID below for support or
                      tracking updates.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                    Order Number
                  </p>
                  <p className="mt-1 break-all text-lg font-bold text-menuHeading">
                    {orderNumber}
                  </p>
                  {orderId ? (
                    <p className="mt-1 break-all text-xs text-menuHeading">
                      ID: {orderId}
                    </p>
                  ) : null}
                  {order?.createdAt ? (
                    <p className="mt-1 text-xs text-menuHeading">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                  <ReceiptText className="mb-3 h-5 w-5 text-menuHeading" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                    Total
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading">
                    {formatMoney(pricing.total, currency)}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                  <ShoppingBag className="mb-3 h-5 w-5 text-menuHeading" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                    Items
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading">
                    {items.reduce(
                      (sum, item) => sum + (Number(item.quantity) || 0),
                      0,
                    )}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                  <PackageCheck className="mb-3 h-5 w-5 text-menuHeading" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                    Status
                  </p>
                  <p className="mt-1 text-xl font-bold text-menuHeading">
                    {order?.orderStatus || "Pending"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414] lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-menuHeading" />
                  <h2 className="text-xl font-bold text-menuHeading">
                    Order summary
                  </h2>
                </div>

                {items.length ? (
                  <div className="divide-y divide-gray-200">
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
                          <div className="h-16 w-16 rounded-lg border border-gray-200 bg-white" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-menuHeading">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-menuHeading">
                            {[item.color, item.size, item.sku]
                              .filter(Boolean)
                              .join(" / ")}
                          </p>
                          <p className="mt-2 text-sm text-menuHeading">
                            Qty {item.quantity} x{" "}
                            {formatMoney(item.unitPrice, currency)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-menuHeading">
                          {formatMoney(item.lineTotal, currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-menuHeading">
                    Your order was created successfully.
                  </p>
                )}
              </div>

              <aside className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414]">
                <h2 className="text-xl font-bold text-menuHeading">
                  Receipt details
                </h2>
                <div className="mt-5 space-y-3 text-sm text-menuHeading">
                  <div className="flex justify-between gap-4">
                    <span>Subtotal</span>
                    <span>{formatMoney(pricing.itemsSubtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Discount</span>
                    <span>-{formatMoney(pricing.discount, currency)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Shipping</span>
                    <span>{formatMoney(pricing.shippingCost, currency)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Tax</span>
                    <span>{formatMoney(pricing.tax, currency)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold">
                    <span>Total</span>
                    <span>{formatMoney(pricing.total, currency)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to="/shop"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white transition hover:bg-gray-800">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
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
