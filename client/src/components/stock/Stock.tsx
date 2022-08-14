//packages and utils
import React, { useEffect } from "react"
import {
  Container,
  Grid,
  Typography,
  Divider,
  createTheme,
} from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import {
  selectStockData,
  selectStockDataStatus,
} from "../../slices/stockDataSlice"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../utils/reduxHooks"
import { fetchStockData } from "../../slices/stockDataSlice"
import { useParams } from "react-router-dom"

//components
import LineChart from "./stockComponents/LineChart"
import VolumeChart from "./stockComponents/VolumeChart"
import RatingChart from "./stockComponents/RatingChart"
import FinancialsChart from "./stockComponents/FinancialsChart"
import OtherFinancials from "./stockComponents/OtherFinancials"
import MarketCapData from "./stockComponents/MarketCapData"
import Loading from "../loading/Loading"
import General from "./stockComponents/General"
import CommentForm from "../commentForm/CommentForm"

const Stock: React.FC<{}> = ({}) => {
  //get data from react store
  const stockData = useSelector(selectStockData)
  const status = useSelector(selectStockDataStatus)
  const dispatch = useAppDispatch()
  const { ticker } = useParams()
  const theme = createTheme()

  useEffect(() => {
    //fetch data about ticker from insider trading api
    if (ticker) dispatch(fetchStockData(ticker.toUpperCase()))
  }, [ticker, dispatch])

  if (!stockData) return null

  //loading symbol while the api fetches data and is set to state data
  if (status === "loading") return <Loading remSize={"20"} />

  //error message if one of the api calls fails
  if (status === "failed" || stockData?.stock.historical === undefined)
    return (
      <Grid
        container
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignContent: "flex-start",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          justifyContent="center"
          display="flex"
          xs={12}
          sx={{ marginTop: theme.spacing(10) }}
        >
          <ErrorIcon sx={{ fontSize: "15rem" }} color="action" />
        </Grid>
        <Grid item justifyContent="center" display="flex" xs={12}>
          <Typography variant="h5">
            An Error Occurred. Please refresh the page.
          </Typography>
        </Grid>
      </Grid>
    )

  //sort historical data from oldest to newest to display a more readable graph and cut the data because an overload of data makes the graphs hard to read and analyze
  //Have to check for undefined because of typing
  const sortedRes = {
    historical: [...stockData?.stock.historical]
      ?.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      .splice(
        [...stockData?.stock.historical].length - 400,
        [...stockData?.stock.historical].length
      ),
    symbol: stockData?.stock.symbol,
  }

  //display charts if data fetches from api successfully
  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid
        container
        display="flex"
        justifyContent="center"
        spacing={5}
        sx={{ marginBottom: theme.spacing(4) }}
      >
        <Grid item md={12}>
          <General
            mktCapData={stockData?.mktData[0]}
            finData={stockData?.fin[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <LineChart marketData={sortedRes} />
        </Grid>
        <Grid item xs={12}>
          <VolumeChart marketData={sortedRes} />
        </Grid>

        <Grid item md={12}>
          <FinancialsChart finData={stockData?.fin} />
        </Grid>

        <Grid item xs={12} md={6}>
          <RatingChart ratingData={stockData?.rating[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OtherFinancials finDataArr={stockData?.fin.slice(0, 3)} />
          <MarketCapData mktCapData={stockData?.mktData[0]} />
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: theme.spacing(3) }} />
      <Grid container>
        <CommentForm width="lg" />
      </Grid>
    </Container>
  )
}

export default Stock
