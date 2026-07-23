import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  Loader2,
  PackageSearch,
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await apiClient.get(apiPaths.orders.mine);
        if (isMounted) {
          setOrders(Array.isArray(response?.data?.data) ? response.data.data : []);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load your orders",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Intro text="My Orders" pText="My Orders" />
      <section className="bg-background py-10">
        <Container className="px-4 xl:px-0">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-menuHeading">
                Order history
              </p>
              <h1 className="mt-2 text-3xl font-bold text-menuHeading">
                Your orders
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-menuHeading">
                Review your recent purchases, totals, and current fulfillment
                status.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-bHeaderBg p-8 text-center shadow-sm dark:bg-[#1a1414]">
              <Loader2 className="h-9 w-9 animate-spin text-menuHeading" />
              <p className="mt-4 text-sm font-semibold text-menuHeading">
                Loading your orders...
              </p>
            </div>
          ) : null}

          {!isLoading && loadError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">Could not load orders</p>
              <p className="mt-1 text-sm">{loadError}</p>
            </div>
          ) : null}

          {!isLoading && !loadError && orders.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-bHeaderBg p-8 text-center shadow-sm dark:bg-[#1a1414]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-menuHeading">
                <PackageSearch className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-menuHeading">
                No orders yet
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-menuHeading">
                When you place an order, it will appear here with its details
                and fulfillment status.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Start Shopping
              </Link>
            </div>
          ) : null}

          {!isLoading && !loadError && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => {
                const currency = order?.pricing?.currency || "USD";

                return (
                  <Link
                    key={order._id}
                    to={`/orders/${order._id}`}
                    className="block rounded-2xl border border-gray-200 bg-bHeaderBg p-5 shadow-sm transition hover:border-gray-300 hover:bg-white dark:bg-[#1a1414]">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-menuHeading">
                          <ClipboardList className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-bold text-menuHeading">
                              {order.orderNumber || order._id}
                            </h2>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(order.orderStatus)}`}>
                              {order.orderStatus || "Pending"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-menuHeading">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                          <p className="mt-1 break-all text-xs text-menuHeading">
                            ID: {order._id}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:min-w-96">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                            Items
                          </p>
                          <p className="mt-1 font-bold text-menuHeading">
                            {getItemCount(order)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                            Total
                          </p>
                          <p className="mt-1 font-bold text-menuHeading">
                            {formatMoney(order?.pricing?.total, currency)}
                          </p>
                        </div>
                        <div className="col-span-2 flex items-center justify-between sm:col-span-1">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-menuHeading">
                              Payment
                            </p>
                            <p className="mt-1 capitalize text-menuHeading">
                              {order?.payment?.status || "Pending"}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-menuHeading sm:hidden" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default Orders;
