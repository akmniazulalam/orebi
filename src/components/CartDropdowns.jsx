import React from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import useCart from "@/store/cart";
import {
  getCartLineId,
  getCartLineImage,
  getCartLineName,
  getCartLinePrice,
} from "@/lib/cartUtils";

const CartDropdowns = ({ items = [], onClick }) => {
  const removeFromCart = useCart((state) => state.removeFromCart);
  const subTotal = React.useMemo(
    () =>
      (items || []).reduce(
        (total, item) => total + getCartLinePrice(item) * (item.quantity || 1),
        0,
      ),
    [items],
  );

  return (
    <div className="absolute top-10 right-0 max-w-[calc(100vw-32px)] w-92 z-50 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] shadow-2xl overflow-hidden animate-slide font-dmSans">
      {items.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-[#121429]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-header dark:text-gray-400 mb-3">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-menuHeading dark:text-white">
            Your cart is empty
          </p>
          <p className="text-xs text-header dark:text-gray-400 mt-1">
            Add items to get started.
          </p>
        </div>
      ) : (
        <div>
          <div className="p-4 bg-bHeaderBg/60 dark:bg-[#16192E] space-y-3 max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
            {items.map((item) => {
              const lineId = getCartLineId(item);

              return (
                <div key={lineId} className="flex gap-x-3.5 items-center pt-3 first:pt-0">
                  <img
                    src={getCartLineImage(item)}
                    alt={getCartLineName(item)}
                    className="w-16 h-16 rounded-xl bg-white dark:bg-white/5 object-cover shrink-0 border border-gray-200/60 dark:border-white/5"
                  />
                  <div className="text-left min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-menuHeading dark:text-white truncate">
                      {getCartLineName(item)}
                    </h3>
                    {(item.color || item.size) && (
                      <p className="text-[11px] text-header dark:text-gray-400 mt-0.5">
                        {[item.color, item.size].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-header dark:text-gray-300 mt-1">
                      {item.quantity || 1} × ${getCartLinePrice(item).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-header hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                    aria-label="Remove item"
                    onClick={(e) => {
                      removeFromCart(lineId);
                      e.stopPropagation();
                    }}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white dark:bg-[#121429] border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between pb-3.5">
              <span className="text-sm font-medium text-header dark:text-gray-400">
                Subtotal:
              </span>
              <span className="text-base font-bold text-menuHeading dark:text-white">
                ${subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center flex-1 py-2.5 px-3 rounded-full border border-gray-300 dark:border-white/20 text-menuHeading dark:text-white text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-center"
                onClick={onClick}>
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="inline-flex items-center justify-center flex-1 py-2.5 px-3 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] text-xs font-bold hover:opacity-90 transition-opacity shadow-sm cursor-pointer text-center"
                onClick={onClick}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdowns;
