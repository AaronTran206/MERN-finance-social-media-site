import React, { useState, useEffect } from "react"
import { Paper, TextField, Card, Grid } from "@mui/material"
import { fetchStockData } from "../../slices/stockDataSlice"
import { useAppDispatch } from "../utils/reduxHooks"
import { useNavigate } from "react-router-dom"

const SearchBar: React.FC<{}> = () => {
  const [ticker, setTicker] = useState<string>("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = (e: any) => {
    e.preventDefault()

    //navigate to stock component url
    navigate(`/search/${ticker.trim().toUpperCase()}`)
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item md={8}>
        <Paper>
          <form autoComplete="off" noValidate onSubmit={onSubmit}>
            <TextField
              name="ticker"
              variant="outlined"
              label="Search for a ticker"
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
