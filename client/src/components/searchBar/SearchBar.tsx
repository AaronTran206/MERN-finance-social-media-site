import React, { useState, useEffect } from "react"
import { Paper, TextField, Card, Grid } from "@mui/material"
import { fetchStockData } from "../../slices/stockDataSlice"
import { useAppDispatch } from "../utils/reduxHooks"

const SearchBar: React.FC<{}> = () => {
  const [ticker, setTicker] = useState<string>("")
  const dispatch = useAppDispatch()

  // useEffect(() => {

  //     // //sort historical data from oldest to newest to display a more readable graph and cut the data because an overload of data makes the graphs hard to read and analyze
  //     // const sortedRes = {
  //     //   historical: res.data.stock.historical
  //     //     ?.sort(
  //     //       (a: any, b: any) =>
  //     //         new Date(a.date).getTime() - new Date(b.date).getTime()
  //     //     )
  //     //     .splice(
  //     //       res.data.stock.historical.length - 400,
  //     //       res.data.stock.historical.length
  //     //     ),
  //     //   symbol: res.data.stock.symbol,
  //     // }

  //     // //set filtered and organized result to state data
  //     // setStockData(sortedRes)
  //     // setRatingData(res.data.rating[0])
  //     // setFinData(res.data.fin)
  //     // setMktCapData(res.data.mktData[0])
  //   })
  // }, [])

  const onSubmit = (e: any) => {
    e.preventDefault()

    //fetch data about ticker from insider trading api
    dispatch(fetchStockData(ticker.trim().toUpperCase()))
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item md={8}>
        <Paper>
          <form autoComplete="off" noValidate onSubmit={onSubmit}>
            <TextField
              name="ticker"
              variant="outlined"
              label="Search a Ticker"
              onChange={(e) => setTicker(e.target.value)}
              fullWidth
            />
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SearchBar
