import { Grid, Typography, Link } from "@mui/material"
import React, { memo } from "react"
import Loading from "../../loading/Loading"
import { FinData, MktCapData } from "../../utils/interfaces"

const General: React.FC<{
  mktCapData: MktCapData | null
  finData: FinData | null
}> = memo(({ mktCapData, finData }) => {
  if (mktCapData === null || finData === null) return <Loading remSize={12} />

  return (
    <Grid container sx={{ padding: "2rem 0rem 0rem 3rem" }}>
      <Grid item md={12}>
        <Typography color="gray" variant="h2">
          Closing Price:
        </Typography>
        <Typography color="green" variant="h3">{`$${Intl.NumberFormat(
          "en-US"
        ).format(Number(mktCapData.stockPrice.toFixed(2)))}`}</Typography>
      </Grid>
    </Grid>
  )
})

export default General
