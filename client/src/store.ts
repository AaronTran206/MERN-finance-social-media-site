import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import stockDataSlice from "./slices/stockDataSlice"

export const store = configureStore({
  reducer: {
    stockData: stockDataSlice,
    auth: authSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { stockData: stockDataSlice }
export type AppDispatch = typeof store.dispatch
