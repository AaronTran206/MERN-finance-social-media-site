import React, { memo } from "react"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { RatingData } from "../../utils/interfaces"
import CircularProgress from "@mui/material/CircularProgress"
import { Box } from "@mui/material"
import Loading from "../../loading/Loading"

Chart.register(ArcElement, Tooltip, Legend)

const RatingChart: React.FC<{ ratingData: RatingData }> = memo(
  ({ ratingData }) => {
    const options: any = {
      responsive: true,
      maintainAspectRatio: true,
      title: {
        diplay: true,
        text: "Rating",
        fontSize: "30",
      },
      legend: {
        display: false,
      },
    }

    //plugin to show text in center of chart
    const plugins: any = [
      {
        beforeDraw: function (chart: any) {
          //specify parameters
          const width = chart.width
          const height = chart.height
          const ctx = chart.ctx
          ctx.restore()

          //specify font settings and placement
          const fontSize = (height / 114).toFixed(2)
          ctx.font = fontSize + "em sans-serif"
          ctx.textBaseline = "middle"

          //declare text
          const text = ratingData?.rating
          const textX = Math.round((width - ctx.measureText(text).width) / 2)
          const textY = height / 2 + chart.legend.height / 2

          //append text to chart
          ctx.fillText(text, textX, textY)
          ctx.fillStyle = "rgb(133, 133, 133)"
          ctx.save()
        },
      },
    ]

    const data = {
      labels: [`$${ratingData?.symbol} Score`, "Points Missed"],
      datasets: [
        {
          label: "Rating",
          data: [ratingData?.ratingScore, 5 - ratingData?.ratingScore],
          backgroundColor: ["rgb(50,205,50)", "rgb(89, 89, 89)"],
          borderWidth: 0,
        },
      ],
    }

    //ensure that the doughnut chart loads when all needed data is available
    if (ratingData?.rating === undefined) return <Loading remSize={"12"} />

    return <Doughnut data={data} options={options} plugins={plugins} />
  }
)

export default RatingChart
