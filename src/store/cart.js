import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(  // ekhane find ekta array er moddhe loop chaliye just specific ekta item ke return kore. array ke na.
            (item) => (item._id || item.id) === (product._id || product.id),
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>   // ekhane map ekta array er moddhe loop chaliye ekta array return kore. specific item ke na.
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
          items: state.items.filter((item) => (item._id || item.id) !== id), // ekhane filter array er moddhe jei item ta te remove button click kora hoyeche setar id take chara baki joto item ache seguloke niye ekta array return kore. filter() muloto condition matching items er array return kore ar find() just ekta single item ke return kore. filter korle array er length kome jay. kintu map chalale array er length kome na. length ek e thake just condition match na kora item er khetre undefined bole dey. ar filter just condition matching items er array return kore length ke komiye dey.
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
