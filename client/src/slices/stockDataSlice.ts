import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../components/utils/api"
import {
  MarketData,
  RatingData,
  FinData,
  MktCapData,
} from "../components/utils/interfaces"
import { RootState } from "../store"

//interfaces
interface FinanceDataState {
  stockData: {
    stock: MarketData
    rating: RatingData[]
    fin: FinData[]
    mktData: MktCapData[]
  } | null
  status: "idle" | "loading" | "failed" | "success"
}

const initialState = {
  stockData: null,
  status: "idle",
} as FinanceDataState

//calls to api to backend server
export const fetchStockData = createAsyncThunk(
  "/search/fetchStockData",
  async (ticker: string) => {
    try {
      const { data } = await api.fetchFinanceData(ticker)

      return data
    } catch (err) {
      console.error(err)
    }
  }
)

export const stockDataSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    setStockDataSlice: (state, action) => {
      state.stockData = action.payload
    },
  },
  extraReducers: (builder) => {
    //fetchStockData
    builder.addCase(fetchStockData.pending, (state, action) => {
      state.status = "loading"
    })
    builder.addCase(fetchStockData.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(fetchStockData.fulfilled, (state, action) => {
      state.status = "success"
      //if one of the api calls fails, then set the state to failed
      if (
        !action.payload.fin.length ||
        !action.payload.mktData.length ||
        !action.payload.rating.length ||
        !action.payload.stock.historical
      )
        state.status = "failed"

      state.stockData = action.payload
    })
  },
})

export const { setStockDataSlice } = stockDataSlice.actions

export const selectStockData = (state: RootState) => state.stockData.stockData
export const selectStockDataStatus = (state: RootState) =>
  state.stockData.status

export default stockDataSlice.reducer
