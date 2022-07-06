import React, { memo } from "react"
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { FinData } from "../../utils/interfaces"
import Loading from '../../loading/Loading'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const gridOptions = {
  grid: {
    borderWidth: 2,
    color: "rgb(50,50,50, 0.25)",
  },
}

const OtherFinancials: React.FC<{ finDataArr: FinData[] }> = memo(
  ({ finDataArr }) => {
    const options: any = {
      responsive: true,
      interaction: {
        mode: "x",
        intersect: false,
      },
      elements: {
        bar: {
          borderWidth: 2,
          borderRadius: 5,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Diluted EPS Year-Over-Year",
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = `$${Intl.NumberFormat("en-US").format(
                context.parsed.y.toFixed(2)
              )} per share`
              return label
            },
          },
        },
      },
      scales: {
        x: {
          ...gridOptions,
        },
        y: {
          ...gridOptions,
        },
      },
    }

    const chartData = [
      finDataArr[2].epsdiluted,
      finDataArr[1].epsdiluted,
      finDataArr[0].epsdiluted,
    ]

    const labels = [
      finDataArr[2].calendarYear,
      finDataArr[1].calendarYear,
      finDataArr[0].calendarYear,
    ]

    const data = {
      labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: "rgb(27, 166, 247)",
          borderColor: "rgb(27, 166, 247)",
        },
      ],
    }

    if (finDataArr === null) return <Loading remSize={12}/>

    return <Bar options={options} data={data} />
  }
)

export default OtherFinancials
