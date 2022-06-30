import React, { useEffect, useState } from "react"
import { fetchHistoricalPrice } from "../utils/api"
import LineChart from "./charts/LineChart"
import VolumeChart from "./charts/VolumeChart"
import { Container, Grid, Paper } from "@mui/material"
import { StockData } from "../utils/interfaces"
import RatingChart from "./charts/RatingChart"
import FinancialsChart from "./charts/FinancialsChart"

const Stock: React.FC<{}> = () => {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [ratingData, setRatingData] = useState<any>(null)
  const [finData, setFinData] = useState<any>(null)
  const ticker = "gme"

  useEffect(() => {
    //fetch data about ticker from insider trading api
    fetchHistoricalPrice(ticker.trim().toUpperCase()).then((res) => {
      console.log(res)
      //sort historical data from oldest to newest to display a more readable graph and cut the data because an overload of data makes the graphs hard to read and analyze
      const sortedRes = {
        historical: res.data.stock.historical
          ?.sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .splice(
            res.data.stock.historical.length - 400,
            res.data.stock.historical.length
          ),
        symbol: res.data.stock.symbol,
      }

      //set filtered and organized result to state data
      setStockData(sortedRes)
      setRatingData(res.data.rating[0])
      setFinData(res.data.fin[0])
    })
  }, [])

  return (
    <Container
      style={{
        backgroundColor: "black",
      }}
      maxWidth="xl"
    >
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12} sx={{ my: 1 }}>
          <LineChart stockData={stockData} />
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <VolumeChart stockData={stockData} />
        </Grid>
        <Grid item xs={12} sm={5} sx={{ m: 2 }}>
          <RatingChart ratingData={ratingData} />
        </Grid>
        <Grid item xs={12} sm={5} sx={{ m: 2 }}>
          <FinancialsChart finData={finData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Stock
