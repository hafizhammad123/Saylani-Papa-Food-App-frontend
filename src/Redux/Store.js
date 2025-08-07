import { configureStore } from '@reduxjs/toolkit'
import addToCartSliceDATA from './Slice/addToCart'
import restaurantData from './Slice/restaurantSlice'

export const store = configureStore({
  reducer: {
    cart :addToCartSliceDATA,
    resturant : restaurantData
  },
})