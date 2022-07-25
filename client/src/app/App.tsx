import React, { useEffect, useState } from "react"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import Home from "../components/home/Home"
import Auth from "../components/auth/Auth"
import { Container, Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider, createTheme } from "@mui/material/styles"

//themes for mui
const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#A800A8",
    },
  },
})

const App: React.FC<{}> = () => {
  const user = JSON.parse(localStorage.getItem("profile")!)

  console.log(user)

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="539291048397-uh153ujaiuf0qkad5rl2o0ah691gausj.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default" }}>
              <CssBaseline />
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={user ? <Navigate to={"/home"} /> : <Auth />}
                />
                <Route
                  path="/home"
                  element={user ? <Home /> : <Navigate to="/" />}
                />
                <Route
                  path="/search/:ticker"
                  element={user ? <Stock /> : <Navigate to="/" />}
                />
              </Routes>
              <Footer />
            </Box>
          </ThemeProvider>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
