const apiBaseUrl = import.meta.env.VITE_API_URL;
const newArrivalsUrl = import.meta.env.VITE_NEW_ARRIVALS_API_URL;
const bestSellersUrl = import.meta.env.VITE_BEST_SELLERS_API_URL;
const specialOffersUrl = import.meta.env.VITE_SPECIAL_OFFERS_API_URL;

const missingEnvVars = [
  !apiBaseUrl && "VITE_API_URL",
  !newArrivalsUrl && "VITE_NEW_ARRIVALS_API_URL",
  !bestSellersUrl && "VITE_BEST_SELLERS_API_URL",
  !specialOffersUrl && "VITE_SPECIAL_OFFERS_API_URL",
].filter(Boolean);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

export const API_BASE_URL = apiBaseUrl;

export const apiPaths = {
  products: {
    list: "/product/getproduct",
    single: (id) => `/product/singleproduct/${id}`,
    variants: (id) => `/product/${id}/variants`,
  },
  categories: {
    list: "/category/getallcategory",
  },
  cart: {
    add: "/cart/addtocart",
  },
  coupon: {
    apply: "/coupon/apply-coupon",
  },
  orders: {
    create: "/order/create",
  },
};

export const externalApiUrls = {
  newArrivals: newArrivalsUrl,
  bestSellers: bestSellersUrl,
  specialOffers: specialOffersUrl,
};
