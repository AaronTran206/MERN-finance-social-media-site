import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../components/utils/api"
import { RootState } from "../store"
import {
  GoogleAccountInfo,
  InitialFormState,
  AccountInfo,
} from "../components/utils/interfaces"

//interface setup for redux auth slice

interface AuthData {
  authData: null | GoogleAccountInfo | AccountInfo
  status: "idle" | "loading" | "failed" | "success"
}

const initialState = {
  authData: null,
  status: "idle",
} as AuthData

//sign in and sign up functions for logging in with own database
export const signIn = createAsyncThunk(
  "/signin",
  async (d: InitialFormState) => {
    const formData = d

    try {
      const { data } = await api.signIn(formData)
      return data
    } catch (err) {
      console.error(err)
    }
  }
)

export const signUp = createAsyncThunk(
  "/signup",
  async (d: InitialFormState) => {
    const formData = d

    try {
      const { data } = await api.signUp(formData)

      return data
    } catch (err) {
      console.error(err)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //set auth slice for google login
    setAuthSlice: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    },
    setAuthLogoutSlice: (state, action) => {
      localStorage.removeItem("profile")
      state.authData = action.payload
    },
  },
  extraReducers: (builder) => {
    //sign in
    builder.addCase(signIn.pending, (state, action) => {
      state.status = "loading"
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = "success"
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    })
    //sign up
    builder.addCase(signUp.pending, (state, action) => {
      state.status = "loading"
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.status = "success"
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    })
  },
})

export const { setAuthSlice, setAuthLogoutSlice } = authSlice.actions

export const selectAuthData = (state: RootState) => state.auth.authData

export default authSlice.reducer
