import React from "react"
import { Typography, Grid } from "@mui/material"
import Auth from "../auth/Auth"

const Home: React.FC<{}> = () => {
  return (
    <Grid
      container
      direction={"row"}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      <Grid item md={5}>
        <Typography>Posts</Typography>
      </Grid>
      <Grid item md={5}>
        <Auth />
      </Grid>
    </Grid>
  )
}

export default Home
