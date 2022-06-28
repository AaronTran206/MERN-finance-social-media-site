//node doesn't support fetch. Use external library to use fetch method in backend server
import fetch from "node-fetch"

export const fetchHistoricalPrice = async (req, res) => {
  //grab ticker symbol from frontend request
  const { ticker } = req.params

  try {
    //fetch data from api
    const data = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${process.env.FIN_API_KEY}`
    ).then((res) => res.json())

    //return success code and data to frontend
    res.status(200).json({ data })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
