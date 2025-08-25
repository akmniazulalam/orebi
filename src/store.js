import { configureStore } from '@reduxjs/toolkit'
import counter from '/src/features/counter/counterSlice'


export default configureStore({
  reducer: {
    counter: counter,
  },
})