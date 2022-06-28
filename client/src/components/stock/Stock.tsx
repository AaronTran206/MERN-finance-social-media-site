import React, { useEffect, useState } from "react"
import { fetchHistoricalPrice } from "../utils/api"

//interfaces for stock data
interface HistoricalData {
  adjClose: Number
  change: Number
  changeOverTime: Number
  changePercent: Number
  close: Number
  date: String
  high: Number
  label: String
  low: Number
  open: Number
  unadjustedVolume: Number
  volume: Number
  vwap: Number
}

interface StockData {
  historical: HistoricalData[]
  symbol: String
}

const Stock: React.FC<{}> = () => {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const ticker = "GME"

  useEffect(() => {
    //fetch data from backend server
    fetchHistoricalPrice(ticker).then((res) => {
      setStockData(res.data.data)
      console.log(res.data.data)
    })
  }, [])
  return (
    <div>{stockData?.historical?.slice(0, 10).map((d: any) => d.adjClose)}</div>
  )
}

export default Stock
