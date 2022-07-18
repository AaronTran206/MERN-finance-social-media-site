import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/",
})

//go to backend server to fetch api data
export const fetchFinanceData = (ticker: string) => API.get(`/search/${ticker}`)
