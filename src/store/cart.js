import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCartLineId } from "@/lib/cartUtils";

const useCart = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (lineItem, quantity = 1) =>
        set((state) => {
          const incoming = {
            ...lineItem,
            quantity: lineItem.quantity ?? quantity,
          };
          const lineId = getCartLineId(incoming);
          const existingItem = state.items.find(
            (item) => getCartLineId(item) === lineId,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                getCartLineId(item) === lineId
                  ? {
                      ...item,
                      quantity: item.quantity + (incoming.quantity || 1),
                    }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...incoming, cartLineId: lineId }],
          };
        }),
      removeFromCart: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => getCartLineId(item) !== lineId),
        })),
      increaseQuantity: (lineId) =>
        set((state) => ({
          items: state.items.map((item) =>
            getCartLineId(item) === lineId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),
      decreaseQuantity: (lineId) =>
        set((state) => ({
          items: state.items.map((item) =>
            getCartLineId(item) === lineId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),
    }),
    { name: "cart-storage" },
  ),
);

export default useCart;
