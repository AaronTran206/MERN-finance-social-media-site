import { Typography, Grid } from "@mui/material"
import React from "react"
import useStyles from "./styles"

const Posts: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Typography color={"white"}> Posts</Typography>
    </Grid>
  )
}

export default Posts
