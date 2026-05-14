import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => (item._id || item.id) === (product._id || product.id),
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                (item._id || item.id) === (product._id || product.id)
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => (item._id || item.id) !== id),
        })),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            (item._id || item.id) === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            (item._id || item.id) === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        })),
    }),
    { name: "cart-storage" },
  ),
);

export default useCart;
