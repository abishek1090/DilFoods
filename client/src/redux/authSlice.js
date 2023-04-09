import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.others
      state.token = action.payload.token
    },
    register: (state, action) => {
      state.user = action.payload.others
      state.token = action.payload.token
    },
    logout: state => {
      state.token = null
      localStorage.clear()
    }
  }
})

export const { login, register, logout } = authSlice.actions
export const getUser = state => state.auth.user
export const getType = state => state.auth.type
export default authSlice.reducer
