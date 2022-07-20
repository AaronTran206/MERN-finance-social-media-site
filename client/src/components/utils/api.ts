import axios from "axios"
import { InitialFormState } from "./interfaces"

const API = axios.create({
  baseURL: "http://localhost:8000/",
})

//go to backend server to fetch api data
export const fetchFinanceData = (ticker: string) => API.get(`/search/${ticker}`)

//sign in and sign up
export const signIn = (formData: InitialFormState) =>
  API.post("/user/signin", formData)

export const signUp = (formData: InitialFormState) =>
  API.post("/user/signup", formData)
