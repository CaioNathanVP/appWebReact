import { configureStore } from '@reduxjs/toolkit'
// import your reducers (slices) aqui

export const store = configureStore({
  reducer: {
    // exemplo: auth: authReducer,
  },
})
