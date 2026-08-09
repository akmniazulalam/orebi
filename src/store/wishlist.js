import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Safe storage wrapper to prevent crashes in private/incognito modes
const safeStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      // Storage unavailable or quota exceeded
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (e) {
      // Storage unavailable
    }
  },
};

/**
 * Wishlist store — persisted to localStorage under the key "wishlist-storage".
 * Follows the same pattern as the cart store (cart.js).
 *
 * An item in the wishlist is identified by its product `_id`.
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
        if (!productId) return;
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      /**
       * Return true if a product (by _id) is currently in the wishlist.
       */
      isInWishlist: (productId) => {
        if (!productId) return false;
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
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => safeStorage),
    },
  ),
);

export default useWishlist;
