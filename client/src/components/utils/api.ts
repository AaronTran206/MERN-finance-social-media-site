import axios from "axios"
import { InitialFormState } from "./interfaces"

const API = axios.create({
  baseURL: "http://localhost:8000/",
})

//middleware verification setup.
//add token to request headers for backend to verify
API.interceptors.request.use((req) => {
  if (req.headers) {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")!).token
      }`
    }

    return req
  }
})

//postSlice
export const getPosts = () => API.get(`/posts/getPosts`)

export const makePost = (formData: any) => API.post(`/posts/makePost`, formData)

//stockDataSlice
//go to backend server to fetch api data
export const fetchFinanceData = (ticker: string) => API.get(`/search/${ticker}`)

//authSlice
//sign in and sign up
export const signIn = (formData: InitialFormState) =>
  API.post("/user/signin", formData)

export const signUp = (formData: InitialFormState) =>
  API.post("/user/signup", formData)
