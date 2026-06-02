export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://mern-ecommerce-91cv.onrender.com/api/v1";

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
};

/** Full URLs for modules not yet on apiClient */
export const apiUrls = {
  products: {
    list: `${API_BASE_URL}${apiPaths.products.list}`,
    single: (id) => `${API_BASE_URL}${apiPaths.products.single(id)}`,
  },
  categories: `${API_BASE_URL}${apiPaths.categories.list}`,
  couponApply: `${API_BASE_URL}${apiPaths.coupon.apply}`,
};
