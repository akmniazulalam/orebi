import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          // ekhane find ekta array er moddhe loop chaliye condition match kora just specific ekta item ke return kore. array ke na.
          const existingItem = state.items.find(  
            (item) => (item._id || item.id) === (product._id || product.id),
          );
          if (existingItem) {
            return {
              // ekhane map ekta array er moddhe loop chaliye ekta array return kore. specific item ke na.
              // ekhane abaro map chaliye array update kora hocche. zustand e purono je state ta ache mane ekhane jemon items er vitorer object gulo ache seguloke modify kora jayna. tai abar notun object baniye notun array return kore state update korte hocche.
              items: state.items.map((item) =>
                (item._id || item.id) === (product._id || product.id)
                  ? {
                      ...item, // ekhane ekta notun item object banano hocche jekhane existing item er shudhu quantity take update kora hocche tai notun kore object banano hocche. kintu shudhu jodi quantity update er code dewa hoy tahole quantity e thakbe object er moddhe. baki name, price etc. hariye jabe. tai ...item diye ager property guloke rakha hocche.
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
