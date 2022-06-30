//interfaces for stock data
interface HistoricalData {
  adjClose: number
  change: number
  changeOverTime: number
  changePercent: number
  close: number
  date: string
  high: number
  label: string
  low: number
  open: number
  unadjustedVolume: number
  volume: number
  vwap: number
}

export interface StockData {
  historical: HistoricalData[]
  symbol: string
}

export interface RatingData {
  symbol: string
  date: string
  rating: string
  ratingScore: number
  ratingRecommendation: string
  ratingDetailsDCFScore: number
  ratingDetailsDCFRecommendation: string
  ratingDetailsROEScore: number
  ratingDetailsROERecommendation: string
  ratingDetailsROAScore: number
  ratingDetailsROARecommendation: string
  ratingDetailsDEScore: number
  ratingDetailsDERecommendation: string
  ratingDetailsPEScore: number
  ratingDetailsPERecommendation: string
  ratingDetailsPBScore: number
  ratingDetailsPBRecommendation: string
}

export interface FinData {
  date: string
  symbol: string
  reportedCurrency: string
  cik: string
  fillingDate: string
  acceptedDate: string
  calendarYear: string
  period: string
  revenue: number
  costOfRevenue: number
  grossProfit: number
  grossProfitRatio: number
  researchAndDevelopmentExpenses: number
  generalAndAdministrativeExpenses: number
  sellingAndMarketingExpenses: number
  sellingGeneralAndAdministrativeExpenses: number
  otherExpenses: number
  operatingExpenses: number
  costAndExpenses: number
  interestIncome: number
  interestExpense: number
  depreciationAndAmortization: number
  ebitda: number
  ebitdaratio: number
  operatingIncome: number
  operatingIncomeRatio: number
  totalOtherIncomeExpensesNet: number
  incomeBeforeTax: number
  incomeBeforeTaxRatio: number
  incomeTaxExpense: number
  netIncome: number
  netIncomeRatio: number
  eps: number
  epsdiluted: number
  weightedAverageShsOut: number
  weightedAverageShsOutDil: number
  link: string
  finalLink: string
}
