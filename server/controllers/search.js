//node doesn't support fetch. Use external library to use fetch method in backend server
import fetch from "node-fetch"

export const fetchHistoricalPrice = async (req, res) => {
  //grab ticker symbol from frontend request
  const { ticker } = req.params

  try {
    //fetch data from api
    const historical = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${process.env.FIN_API_KEY}`
    const rating = `https://financialmodelingprep.com/api/v3/rating/${ticker}?apikey=${process.env.FIN_API_KEY}`
    const fin = `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=120&apikey=${process.env.FIN_API_KEY}`
    const marketCap = `https://financialmodelingprep.com/api/v3/enterprise-values/${ticker}?limit=40&apikey=${process.env.FIN_API_KEY}`

    const allDataURLs = [historical, rating, fin, marketCap]

    const promiseURLs = allDataURLs.map((url) =>
      fetch(url).then((res) => res.json())
    )

    const [historicalStockData, ratingData, finData, marketCapData] =
      await Promise.all(promiseURLs)

    const data = {
      stock: historicalStockData,
      rating: ratingData,
      fin: finData,
      mktData: marketCapData,
    }

    //return success code and data to frontend
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
