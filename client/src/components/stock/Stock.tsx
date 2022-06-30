//packages and utils
import React, { useEffect, useState } from "react"
import { fetchHistoricalPrice } from "../utils/api"
import { StockData, RatingData, FinData } from "../utils/interfaces"
import CircularProgress from "@mui/material/CircularProgress"
import { Container, Grid, Box, Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"

//components
import LineChart from "./charts/LineChart"
import VolumeChart from "./charts/VolumeChart"
import RatingChart from "./charts/RatingChart"
import FinancialsChart from "./charts/FinancialsChart"
import OtherFinancials from "./charts/OtherFinancials"

const justifyAndCenter = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}

const Stock: React.FC<{}> = () => {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [ratingData, setRatingData] = useState<RatingData | null>(null)
  const [finData, setFinData] = useState<FinData[] | null>(null)
  const ticker = "aapl"

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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "3rem 0rem",
        }}
      >
        <CircularProgress size={"20rem"} />
      </Container>
    )

  if (
    stockData?.symbol === undefined ||
    ratingData?.symbol === undefined ||
    finData[0]?.symbol === undefined
  )
    return (
      <Grid container>
        <Grid item md={12} sx={justifyAndCenter}>
          <ErrorIcon sx={{ fontSize: "12rem" }} color="action" />
        </Grid>
        <Grid item md={12} sx={justifyAndCenter}>
          <Typography sx={{ color: "white" }}>
            An Error Occurred. Please refresh the page.
          </Typography>
        </Grid>
      </Grid>
    )

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sx={{ py: 1 }}>
          <LineChart stockData={stockData} />
        </Grid>
        <Grid item xs={12} sx={{ py: 1 }}>
          <VolumeChart stockData={stockData} />
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} md={4}>
            <FinancialsChart finData={finData[2]} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FinancialsChart finData={finData[1]} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FinancialsChart finData={finData[0]} />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} md={5} sx={{ m: 3 }}>
            <RatingChart ratingData={ratingData} />
          </Grid>
          <Grid item xs={12} md={5} sx={{ m: 3 }}>
            <OtherFinancials finDataArr={finData.slice(0, 3)} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Stock
