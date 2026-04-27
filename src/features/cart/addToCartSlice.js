import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      // check already ache কিনা
      const existingItem = state.items.find((item) => (item._id || item.id) === (product._id || product.id));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => (item._id || item.id) !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => (i._id || i.id) === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => (i._id || i.id) === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});


export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = addToCartSlice.actions
export default addToCartSlice.reducer;
