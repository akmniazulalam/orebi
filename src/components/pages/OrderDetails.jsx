import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  MapPin,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";
import Container from "../Container";
import Intro from "../Intro";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";
import {
  formatDate,
  formatMoney,
  getItemCount,
  getStatusBadgeClass,
} from "./orderFormat";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await apiClient.get(apiPaths.orders.single(id));
        if (isMounted) {
          setOrder(response?.data?.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load this order",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const currency = order?.pricing?.currency || "USD";
  const items = Array.isArray(order?.items) ? order.items : [];
  const customer = order?.customer || {};

  return (
    <>
      <Intro text="Order Details" pText="Order Details" />
      <section className="bg-background py-10">
        <Container className="px-4 xl:px-0">
          <Link
            to="/orders"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-menuHeading">
            <ArrowLeft className="h-4 w-4" /> Back to orders
          </Link>

          {isLoading ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-bHeaderBg p-8 text-center shadow-sm dark:bg-[#1a1414]">
              <Loader2 className="h-9 w-9 animate-spin text-menuHeading" />
              <p className="mt-4 text-sm font-semibold text-menuHeading">
                Loading order details...
              </p>
            </div>
          ) : null}

          {!isLoading && loadError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">Could not load order</p>
              <p className="mt-1 text-sm">{loadError}</p>
            </div>
          ) : null}

          {!isLoading && !loadError && order ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414] sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-menuHeading dark:text-[#262626]">
                      <PackageCheck className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold text-menuHeading">
                          {order.orderNumber || order._id}
                        </h1>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(order.orderStatus)}`}>
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-menuHeading">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                      <p className="mt-1 break-all text-xs text-menuHeading">
                        ID: {order._id}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:min-w-96">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                      <ShoppingBag className="mb-2 h-5 w-5 text-menuHeading" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                        Items
                      </p>
                      <p className="mt-1 font-bold text-menuHeading">
                        {getItemCount(order)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818]">
                      <ReceiptText className="mb-2 h-5 w-5 text-menuHeading" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                        Total
                      </p>
                      <p className="mt-1 font-bold text-menuHeading">
                        {formatMoney(order?.pricing?.total, currency)}
                      </p>
                    </div>
                    <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-4 dark:bg-[#201818] sm:col-span-1">
                      <ClipboardList className="mb-2 h-5 w-5 text-menuHeading" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                        Payment
                      </p>
                      <p className="mt-1 capitalize font-bold text-menuHeading">
                        {order?.payment?.status || "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414] lg:col-span-2">
                  <h2 className="text-xl font-bold text-menuHeading">
                    Items in this order
                  </h2>
                  <div className="mt-4 divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <div
                        key={item._id || item.variantId || index}
                        className="flex gap-4 py-4">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-lg border border-gray-200 bg-white" />
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
                </div>

                <aside className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414]">
                    <h2 className="text-xl font-bold text-menuHeading">
                      Receipt
                    </h2>
                    <div className="mt-5 space-y-3 text-sm text-menuHeading">
                      <div className="flex justify-between gap-4">
                        <span>Subtotal</span>
                        <span>
                          {formatMoney(order?.pricing?.itemsSubtotal, currency)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Discount</span>
                        <span>
                          -{formatMoney(order?.pricing?.discount, currency)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Shipping</span>
                        <span>
                          {formatMoney(order?.pricing?.shippingCost, currency)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Tax</span>
                        <span>{formatMoney(order?.pricing?.tax, currency)}</span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold">
                        <span>Total</span>
                        <span>{formatMoney(order?.pricing?.total, currency)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-[#1a1414]">
                    <div className="mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-menuHeading" />
                      <h2 className="text-xl font-bold text-menuHeading">
                        Shipping to
                      </h2>
                    </div>
                    <div className="space-y-1 text-sm leading-6 text-menuHeading">
                      <p className="font-semibold">
                        {[customer.firstName, customer.lastName]
                          .filter(Boolean)
                          .join(" ") || "-"}
                      </p>
                      <p>{customer.email || "-"}</p>
                      <p>{customer.phone || "-"}</p>
                      <p>
                        {[
                          customer.street,
                          customer.apartment,
                          customer.city,
                          customer.county,
                          customer.postcode,
                          customer.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default OrderDetails;
