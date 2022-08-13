import React from "react"
import { Typography, Grid } from "@mui/material"
import CommentForm from "../commentForm/CommentForm"
import Posts from "../posts/Posts"
import useStyles from "./styles"

const Home: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid container direction={"row-reverse"} className={classes.container}>
      <Grid item xs={12}>
        <CommentForm width="sm" />
      </Grid>
      <Grid item xs={12}>
        <Posts />
      </Grid>
    </Grid>
  )
}

export default Home
