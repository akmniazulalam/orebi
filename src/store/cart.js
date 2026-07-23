import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCartLineId } from "@/lib/cartUtils";

function getSafeQuantity(quantity, fallback = 1) {
  const parsed = Number(quantity);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

const useCart = create(
  persist(
    (set) => ({
      items: [],
      clearCart: () => set({ items: [] }),
      addToCart: (lineItem, quantity = 1) =>
        set((state) => {
          const incoming = {
            ...lineItem,
            quantity: getSafeQuantity(lineItem.quantity ?? quantity),
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
                      cartLineId: item.cartLineId || lineId,
                      quantity:
                        getSafeQuantity(item.quantity) +
                        getSafeQuantity(incoming.quantity),
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
          items: state.items.map((item) => {
            const itemLineId = getCartLineId(item);

            return itemLineId === lineId
              ? {
                  ...item,
                  cartLineId: item.cartLineId || itemLineId,
                  quantity: getSafeQuantity(item.quantity) + 1,
                }
              : item;
          }),
        })),
      decreaseQuantity: (lineId) =>
        set((state) => ({
          items: state.items.map((item) => {
            const itemLineId = getCartLineId(item);
            const currentQuantity = getSafeQuantity(item.quantity);

            return itemLineId === lineId
              ? {
                  ...item,
                  cartLineId: item.cartLineId || itemLineId,
                  quantity: Math.max(1, currentQuantity - 1),
                }
              : item;
          }),
        })),
    }),
    { name: "cart-storage" },
  ),
);

export default useCart;
