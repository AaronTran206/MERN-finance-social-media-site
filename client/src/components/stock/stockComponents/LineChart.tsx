import React, { memo } from "react"
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { MarketData } from "../../utils/interfaces"
import zoomPlugin from "chartjs-plugin-zoom"
import Loading from "../../loading/Loading"
import { Grid, Paper } from "@mui/material"

//Chart will use these features
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

const gridOptions = {
  grid: {
    borderWidth: 2,
    color: "rgb(50,50,50, 0.25)",
  },
}

const adjCloseTitle = `Daily Adjusted Close`
const pctChangeTitle = `% Change from Prev. Day`

const LineChart: React.FC<{ marketData: MarketData | null }> = memo(
  ({ marketData }) => {
    //chartJS options
    const options: any = {
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: `$${marketData?.symbol}`,
        },
        //zoom plugin
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            drag: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
            speed: 70,
          },
          pan: {
            enabled: true,
            mode: "x",
            speed: 70,
          },
        },

        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || ""

              if (label) {
                label += ": "
              }

              //creating labels for pct Change
              if (context.dataset.label === pctChangeTitle) {
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y.toFixed(2)}%`
                }
                return label
              }

              //creating labels for adjusted close
              if (context.dataset.label === adjCloseTitle) {
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(context.parsed.y.toFixed(2))
                }
                return label
              }

              return (label += `${context.parsed.y.toFixed(2)}`)
            },
          },
        },
      },

      elements: {
        point: {
          hitRadius: 50,
          radius: 1,
        },
        line: {
          borderWidth: 1.5,
        },
      },

      scales: {
        x: {
          ...gridOptions,
        },
        y: {
          ...gridOptions,
          type: "linear" as const,
          display: true,
          position: "left" as const,
          ticks: {
            callback: function (value: any) {
              return `$${value}`
            },
          },
        },
        y1: {
          type: "linear" as const,
          display: true,
          position: "right" as const,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value: any) {
              return `${value}%`
            },
          },
        },
      },
    }
    //x-axis labels
    const labels = marketData?.historical?.map((ele) => ele.date)

    const chartData = {
      labels,
      datasets: [
        {
          label: pctChangeTitle,
          data: marketData?.historical?.map((ele) => ele.changePercent)!,
          borderColor: "rgb(50, 168, 147, 0.8)",
          backgroundColor: "rgb(50, 168, 147, 0.4)",
          yAxisID: "y1",
        },
        {
          label: adjCloseTitle,
          data: marketData?.historical?.map((ele) => ele.adjClose)!,
          yAxisID: "y",
          borderColor: "rgb(89, 89, 89)",
          backgroundColor: "rgb(89, 89, 89,0.5)",
          segment: {
            borderColor: (ctx: any) =>
              ctx.p1.parsed.y <= ctx.p0.parsed.y
                ? "rgb(250,50,50)"
                : "rgb(50,205,50)",
            backgroundColor: (ctx: any) =>
              ctx.p1.parsed.y <= ctx.p0.parsed.y
                ? "rgb(250,50,50,0.5)"
                : "rgb(50,205,50, 0.5)",
          },
        },
      ],
    }

    if (marketData === null) return <Loading remSize={"12"} />

    return (
      <Grid container>
        <Paper
          sx={{
            position: "relative",
            margin: "auto",
            width: "90vw",
            height: "50vh",
            p: 1,
          }}
        >
          <Line options={options} data={chartData} />
        </Paper>
      </Grid>
    )
  }
)

export default LineChart
