//Stock data
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

export interface MarketData {
  historical: HistoricalData[] | undefined
  symbol: string | undefined
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

export interface MktCapData {
  symbol: string
  date: string
  stockPrice: number
  numberOfShares: number
  marketCapitalization: number
  minusCashAndCashEquivalents: number
  addTotalDebt: number
  enterpriseValue: number
}

//Auth FormData
export interface InitialFormState {
  given_name: string
  family_name: string
  email: string
  password: string
  confirmPassword: string
}

//Google Account
export interface GoogleAccountInfo {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  iat: number
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}

//Account
export interface AccountInfo {
  given_name: string
  family_name: string
  email: string
  password: string
  confirmPassword: string
  _id: string
}

//Post Data Form
export interface PostData {
  post: string
  selectedFile: string
}

//redux Post Data form
export interface ReduxPostData {
  post: string
  selectedFile: string
  name: string
}

//Individual Posts from backend
export interface PostInterface {
  name: string
  author: string
  comments: string[]
  createdAt: string
  likes: string[]
  post: string
  selectedFile: string
  __v: number
  _id: string
}
