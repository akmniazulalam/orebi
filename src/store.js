import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '/src/features/counter/counterSlice'
import addToCartReducer from '/src/features/cart/addToCartSlice'


export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: addToCartReducer,
  },
})