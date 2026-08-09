import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Wishlist store — persisted to localStorage under the key "wishlist-storage".
 * Follows the same pattern as the cart store (cart.js).
 *
 * An item in the wishlist is identified by its product `_id`.
 * We store the full product object so we can display it on a wishlist page in the future.
 */
const useWishlist = create(
  persist(
    (set, get) => ({
      /** @type {Array<{_id: string, [key: string]: any}>} */
      items: [],

      /**
       * Add a product to the wishlist.
       * No-op if the product is already present (identified by _id).
       */
      addToWishlist: (product) => {
        if (!product?._id) return;
        const existing = get().items.find((item) => item._id === product._id);
        if (existing) return;
        set((state) => ({ items: [...state.items, product] }));
      },

      /**
       * Remove a product from the wishlist by its _id.
       */
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      /**
       * Return true if a product (by _id) is currently in the wishlist.
       */
      isInWishlist: (productId) => {
        return get().items.some((item) => item._id === productId);
      },

      /**
       * Toggle a product in/out of the wishlist.
       * Returns true if the product was ADDED, false if it was REMOVED.
       */
      toggleWishlist: (product) => {
        if (!product?._id) return false;
        const inList = get().isInWishlist(product._id);
        if (inList) {
          get().removeFromWishlist(product._id);
          return false;
        } else {
          get().addToWishlist(product);
          return true;
        }
      },
    }),
    { name: "wishlist-storage" },
  ),
);

export default useWishlist;
