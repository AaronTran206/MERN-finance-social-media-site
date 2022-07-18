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
import { FinData } from "../../utils/interfaces"
import Loading from "../../loading/Loading"
import { Link, Grid, Typography, rgbToHex } from "@mui/material"

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const gridOptions = {
  grid: {
    borderWidth: 2,
    color: "rgb(50,50,50, 0.25)",
  },
}

const AnnualForm: React.FC<{ data: FinData }> = ({ data }) => {
  return (
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
        href={`${data?.finalLink}`}
      >
        <Typography>{`${data?.calendarYear} Form 10-K`}</Typography>
      </Link>
    </Grid>
  )
}

const FinancialsChart: React.FC<{ finData: FinData[] }> = memo(
  ({ finData }) => {
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
        title: {
          display: true,
          text: `${finData[2].calendarYear} - ${finData[0].calendarYear} Financials`,
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = `$${Intl.NumberFormat("en-US").format(
                context.parsed.y.toFixed(2)
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
    const chartData0 = [
      finData[0]?.revenue,
      finData[0]?.costOfRevenue,
      finData[0]?.researchAndDevelopmentExpenses,
      finData[0]?.generalAndAdministrativeExpenses,
      finData[0]?.sellingGeneralAndAdministrativeExpenses,
      finData[0]?.sellingAndMarketingExpenses,
      finData[0]?.otherExpenses,
      finData[0]?.totalOtherIncomeExpensesNet,
      finData[0]?.incomeTaxExpense,
      finData[0]?.netIncome,
    ]
    const chartData1 = [
      finData[1]?.revenue,
      finData[1]?.costOfRevenue,
      finData[1]?.researchAndDevelopmentExpenses,
      finData[1]?.generalAndAdministrativeExpenses,
      finData[1]?.sellingGeneralAndAdministrativeExpenses,
      finData[1]?.sellingAndMarketingExpenses,
      finData[1]?.otherExpenses,
      finData[1]?.totalOtherIncomeExpensesNet,
      finData[1]?.incomeTaxExpense,
      finData[1]?.netIncome,
    ]
    const chartData2 = [
      finData[2]?.revenue,
      finData[2]?.costOfRevenue,
      finData[2]?.researchAndDevelopmentExpenses,
      finData[2]?.generalAndAdministrativeExpenses,
      finData[2]?.sellingGeneralAndAdministrativeExpenses,
      finData[2]?.sellingAndMarketingExpenses,
      finData[2]?.otherExpenses,
      finData[2]?.totalOtherIncomeExpensesNet,
      finData[2]?.incomeTaxExpense,
      finData[2]?.netIncome,
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

    // //background colors for data points of interest
    // const backgroundColors = [
    //   "rgb(50,205,50)", //rev
    //   "rgb(250,50,50)", //cogs
    //   "rgb(250,50,50)", //r&d exp
    //   "rgb(250,50,50)", //g&a exp
    //   "rgb(250,50,50)", //sg&a exp
    //   "rgb(250,50,50)", //marketing exp
    //   "rgb(250,50,50)", //other exp
    //   "rgb(50,205,50)", //total other income exp
    //   "rgb(250,50,50)", //income tax exp

    //   "rgb(27, 166, 247)", //net income
    // ]

    // //border colors for data points of interest
    // const borderColors = [
    //   "rgb(50,205,50,0.5)", //rev
    //   "rgb(250,50,50,0.5)", //cogs
    //   "rgb(250,50,50,0.5)", //r&d exp
    //   "rgb(250,50,50,0.5)", //g&a exp
    //   "rgb(250,50,50,0.5)", //sg&a exp
    //   "rgb(250,50,50,0.5)", //marketing exp
    //   "rgb(250,50,50,0.5)", //other exp
    //   "rgb(50,205,50,0.5)", //total other income exp
    //   "rgb(250,50,50,0.5)", //income tax
    //   "rgb(27, 166, 247,0.5)", //net income
    // ]

    const data = {
      labels,
      datasets: [
        {
          label: finData[2]?.calendarYear,
          data: chartData2,
          backgroundColor: "rgb(78, 50, 168)",
          borderColors: "rgb(78, 50, 168,0.5)",
        },
        {
          label: finData[1]?.calendarYear,
          data: chartData1,
          backgroundColor: "rgb(50, 129, 168)",
          borderColors: "rgb(50, 129, 168,0.5)",
        },

        {
          label: finData[0]?.calendarYear,
          data: chartData0,
          backgroundColor: "rgb(50, 168, 56)",
          borderColors: "rgb(50, 168, 56,0.5)",
        },
      ],
    }

    if (finData === null) return <Loading remSize={"12"} />

    return (
      <Grid container>
        <Bar options={options} data={data} />
        <Grid container direction={"row"}>
          <Grid item md={4}>
            <AnnualForm data={finData[2]} />
          </Grid>
          <Grid item md={4}>
            <AnnualForm data={finData[1]} />
          </Grid>
          <Grid item md={4}>
            <AnnualForm data={finData[0]} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
)

export default FinancialsChart
