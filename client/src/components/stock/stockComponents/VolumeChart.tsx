import React, { memo } from "react"
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { StockData } from "../../utils/interfaces"
import zoomPlugin from "chartjs-plugin-zoom"
import Loading from "../../loading/Loading"

//ChartJS will use these features
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const volumeTitle = `Daily Volume`
const vwapTtitle = `VWAP`

const VolumeChart: React.FC<{ stockData: StockData | null }> = memo(
  ({ stockData }) => {
    const options: any = {
      responsive: true,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: `$${stockData?.symbol} Daily Volume`,
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
      },
      scales: {
        x: gridOptions,
        y: {
          ...gridOptions,
          display: true,
          position: "left" as const,
        },
        y1: {
          display: true,
          position: "right" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      aspectRatio: 4,
    }

    //x-axis labels
    const labels = stockData?.historical?.map((ele) => ele.date)

    const chartData = {
      labels,
      datasets: [
        {
          label: volumeTitle,
          data: stockData?.historical?.map((ele) => ele.volume)!,
          backgroundColor: "rgb(128, 0, 128)",
          yAxisID: "y",
        },
        {
          label: vwapTtitle,
          data: stockData?.historical?.map((ele) => ele.vwap)!,
          backgroundColor: "rgb(204, 122, 0)",
          yAxisID: "y1",
        },
      ],
    }

    if (stockData === null) return <Loading remSize={12} />

    return <Bar options={options} data={chartData} />
  }
)

export default VolumeChart
