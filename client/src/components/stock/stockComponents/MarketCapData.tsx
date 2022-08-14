import React, { memo } from "react"
import { Grid, Card, Paper, Typography } from "@mui/material"
import { MktCapData } from "../../utils/interfaces"
import Loading from "../../loading/Loading"

const MarketCapComponent: React.FC<{
  title: string
  data: string
}> = ({ title, data }) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        textAlign: "center",
        width: "100%",
        my: 1,
      }}
    >
      <Card>
        <Paper sx={{ p: 1 }}>
          <Typography color="gray" variant="h6">
            {title}
          </Typography>
          <Typography>{data}</Typography>
        </Paper>
      </Card>
    </Grid>
  )
}

const MarketCapData: React.FC<{ mktCapData: MktCapData | null }> = memo(
  ({ mktCapData }) => {
    if (mktCapData === null) return <Loading remSize={"12"} />

    return (
      <>
        <MarketCapComponent
          title="Market Cap"
          data={`$${Intl.NumberFormat("en-US").format(
            Number(mktCapData.marketCapitalization.toFixed(2))
          )}`}
        />
        <MarketCapComponent
          title="Enterprise Value"
          data={`$${Intl.NumberFormat("en-US").format(
            Number(mktCapData.enterpriseValue.toFixed(2))
          )}`}
        />
        <MarketCapComponent
          title="# of Shares"
          data={Intl.NumberFormat("en-US").format(mktCapData.numberOfShares)}
        />
      </>
    )
  }
)

export default MarketCapData
