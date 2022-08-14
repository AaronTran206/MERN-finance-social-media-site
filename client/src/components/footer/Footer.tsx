import React from "react"
import { Box, Paper, Typography, Link, Grid, AppBar } from "@mui/material"

import useStyles from "./styles"

const Footer: React.FC<{}> = () => {
  const classes = useStyles()
  const darkMode = JSON.parse(localStorage.getItem("darkMode")!)

  return (
    <AppBar className={classes.appBar} position="static">
      <Box className={classes.box}>
        <Grid container>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Typography variant="h6">Made by Aaron Tran</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Link href="https://aarontranportfolio.web.app/" underline="none">
              <Typography
                variant="h6"
                sx={{ color: darkMode === false ? "white" : "pallete.primary" }}
              >
                aarontranportfolio.web.app/
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  )
}

export default Footer
