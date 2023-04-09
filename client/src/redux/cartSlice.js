import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  orders: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find(
        product => product._id === action.payload._id
      )
      if (product) {
        product.quantity += action.payload.quantity
      } else {
        state.products.push(action.payload)
      }
    },
    addOrder: (state, action) => {
      state.orders = action.payload
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        product => product._id !== action.payload._id
      )
    },
    deleteProduct: (state, action) => {
      state.products = []
    }
  }
})

export const { addProduct, removeProduct, addOrder, deleteProduct } =
  cartSlice.actions

export default cartSlice.reducer
