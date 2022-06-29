import React, { useEffect, useState } from "react"
import { fetchHistoricalPrice } from "../utils/api"
import LineChart from "./LineChart"
import VolumeChart from "./VolumeChart"

//interfaces for stock data
interface HistoricalData {
  adjClose: number
  change: number
  changeOverTime: number
  changePercent: number
  close: number
  date: string
  high: number
  label: string
  low: number
  open: number
  unadjustedVolume: number
  volume: number
  vwap: number
}

export interface StockData {
  historical: HistoricalData[]
  symbol: string
}

const Stock: React.FC<{}> = () => {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const ticker = "GOOG"

  useEffect(() => {
    //fetch data from backend server
    fetchHistoricalPrice(ticker).then((res) => {
      //sort historical data from oldest to newest to display a more readable graph and cut the data because an overload of data makes the graphs hard to read and analyze
      const sortedRes = {
        historical: res.data.data.historical
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .splice(
            res.data.data.historical.length - 400,
            res.data.data.historical.length
          ),
        symbol: res.data.data.symbol,
      }

      //set filtered and organized result to state data
      setStockData(sortedRes)
    })
  }, [])
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <LineChart stockData={stockData} />
      <VolumeChart stockData={stockData} />
    </div>
  )
}

export default Stock
