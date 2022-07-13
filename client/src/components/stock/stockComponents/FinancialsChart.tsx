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
import Loading from "../../loading/Loading"
import { Link, Grid, Typography } from "@mui/material"

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const gridOptions = {
  grid: {
    borderWidth: 2,
    color: "rgb(50,50,50, 0.25)",
  },
}

const FinancialsChart: React.FC<{ finData: FinData }> = memo(({ finData }) => {
  const options: any = {
    responsive: true,
    indexAxis: "y" as const,
    interaction: {
      mode: "y",
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
        text: finData?.calendarYear,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = `$${Intl.NumberFormat("en-US").format(
              context.parsed.x.toFixed(2)
            )}`
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

  //grab data points of interest from finData object
  const chartData = [
    finData?.revenue,
    finData?.costOfRevenue,
    finData?.researchAndDevelopmentExpenses,
    finData?.generalAndAdministrativeExpenses,
    finData?.sellingGeneralAndAdministrativeExpenses,
    finData?.sellingAndMarketingExpenses,
    finData?.otherExpenses,
    finData?.totalOtherIncomeExpensesNet,
    finData?.incomeTaxExpense,
    finData?.netIncome,
  ]

  //labels for data points of interest
  const labels = [
    "Revenue",
    "Cost of Revenue",
    "R&D Expenses",
    "G&A Expenses",
    "SG&A Expenses",
    "Marketing Expenses",
    "Other Expenses",
    "Other Income Expenses",
    "Income Tax",
    "Net Income",
  ]

  //background colors for data points of interest
  const backgroundColors = [
    "rgb(50,205,50)", //rev
    "rgb(250,50,50)", //cogs
    "rgb(250,50,50)", //r&d exp
    "rgb(250,50,50)", //g&a exp
    "rgb(250,50,50)", //sg&a exp
    "rgb(250,50,50)", //marketing exp
    "rgb(250,50,50)", //other exp
    "rgb(50,205,50)", //total other income exp
    "rgb(250,50,50)", //income tax exp

    "rgb(27, 166, 247)", //net income
  ]

  //border colors for data points of interest
  const borderColors = [
    "rgb(50,205,50,0.5)", //rev
    "rgb(250,50,50,0.5)", //cogs
    "rgb(250,50,50,0.5)", //r&d exp
    "rgb(250,50,50,0.5)", //g&a exp
    "rgb(250,50,50,0.5)", //sg&a exp
    "rgb(250,50,50,0.5)", //marketing exp
    "rgb(250,50,50,0.5)", //other exp
    "rgb(50,205,50,0.5)", //total other income exp
    "rgb(250,50,50,0.5)", //income tax
    "rgb(27, 166, 247,0.5)", //net income
  ]

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: backgroundColors,
        borderColors: borderColors,
      },
    ],
  }

  if (finData === null) return <Loading remSize={12} />

  return (
    <Grid container>
      <Bar options={options} data={data} height={50} width={50} />
      <Grid
        item
        md={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "1.2rem",
        }}
      >
        <Link
          color="primary"
          underline="none"
          variant="subtitle2"
          rel="noreferrer"
          target="_blank"
          href={`${finData.finalLink}`}
        >
          <Typography>{`${finData.calendarYear} Form 10-K`}</Typography>
        </Link>
      </Grid>
    </Grid>
  )
})

export default FinancialsChart