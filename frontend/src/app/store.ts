import { configureStore } from '@reduxjs/toolkit'
// import your slices here

export const store = configureStore({
  reducer: {
    // exemplo: user: userReducer
  },
})

// Tipos para usar com useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
