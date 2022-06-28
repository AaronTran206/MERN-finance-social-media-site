import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/",
})

export const fetchHistoricalPrice = (ticker: string) =>
  API.get(`/ticker/${ticker}`)
