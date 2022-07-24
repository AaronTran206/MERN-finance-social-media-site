import React from "react"
import { Typography, Grid } from "@mui/material"
import Auth from "../auth/Auth"
import Posts from "../posts/Posts"
import useStyles from "./styles"

const Home: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid container direction={"row-reverse"} className={classes.container}>
      <Grid item xs={12} md={5}>
        <Posts />
      </Grid>
    </Grid>
  )
}

export default Home
