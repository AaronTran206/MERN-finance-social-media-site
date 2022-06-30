import React, { useEffect, useState } from "react"
import { fetchHistoricalPrice } from "../utils/api"
import LineChart from "./charts/LineChart"
import VolumeChart from "./charts/VolumeChart"
import { Container, Grid, Box } from "@mui/material"
import { StockData } from "../utils/interfaces"
import RatingChart from "./charts/RatingChart"
import FinancialsChart from "./charts/FinancialsChart"
import CircularProgress from "@mui/material/CircularProgress"

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
      setFinData(res.data.fin)
    })
  }, [])

  if (stockData === null || ratingData === null || finData === null)
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "3rem 0rem",
          backgroundColor: "black",
        }}
      >
        <CircularProgress size={"20rem"} />
      </Container>
    )

  return (
    <Container
      style={{
        backgroundColor: "black",
      }}
      maxWidth="lg"
    >
      <Grid container sx={{ p: 2 }}>
        <Grid item sm={12} sx={{ my: 1 }}>
          <LineChart stockData={stockData} />
        </Grid>
        <Grid item sm={12} sx={{ my: 1 }}>
          <VolumeChart stockData={stockData} />
        </Grid>
        <Grid item sm={12} sx={{ m: 2, display: "flex" }}>
          <Grid item sm={12} md={4} sx={{ m: 5 }}>
            <FinancialsChart finData={finData[2]} />
          </Grid>
          <Grid item sm={12} md={4} sx={{ m: 5 }}>
            <FinancialsChart finData={finData[1]} />
          </Grid>
          <Grid item sm={12} md={4} sx={{ m: 5 }}>
            <FinancialsChart finData={finData[0]} />
          </Grid>
        </Grid>
        <Grid item sm={12} md={5} sx={{ m: 2 }}>
          <RatingChart ratingData={ratingData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Stock
