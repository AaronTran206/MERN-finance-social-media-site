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
import { StockData } from "../../utils/interfaces"
import zoomPlugin from "chartjs-plugin-zoom"

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

export const gridOptions = {
  grid: {
    borderWidth: 2,
    color: "rgb(50,50,50, 0.25)",
  },
}

const adjCloseTitle = `Daily Adjusted Close`
const pctChangeTitle = `% Change from Prev. Day`

const LineChart: React.FC<{ stockData: StockData | null }> = memo(
  ({ stockData }) => {
    //chartJS options
    const options: any = {
      responsive: true,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: `$${stockData?.symbol}`,
          color: "rgb(224,224,224)",
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
    const labels = stockData?.historical?.map((ele) => ele.date)

    const chartData = {
      labels,
      datasets: [
        {
          label: pctChangeTitle,
          data: stockData?.historical?.map((ele) => ele.changePercent)!,
          borderColor: "rgb(50, 168, 147, 0.8)",
          backgroundColor: "rgb(50, 168, 147, 0.4)",
          yAxisID: "y1",
        },
        {
          label: adjCloseTitle,
          data: stockData?.historical?.map((ele) => ele.adjClose)!,
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

    return <Line options={options} data={chartData} />
  }
)

export default LineChart
