import React, { useState } from "react"
import "./app.css"
import Header from "../components/header/Header"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import Home from "../components/home/Home"
import Auth from "../components/auth/Auth"
import { Container, Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const App: React.FC<{}> = () => {
  if (JSON.parse(localStorage.getItem("darkMode")!) === null)
    localStorage.setItem("darkMode", "false")

  const [appTheme, setAppTheme] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!)
  )
  const user = JSON.parse(localStorage.getItem("profile")!)

  //themes for mui
  const theme = createTheme({
    palette: {
      mode: appTheme ? "dark" : "light",
      primary: {
        main: "#85bb65",
      },
      secondary: {
        main: "#018CFF",
      },
      info: {
        main: "#FFFFFF",
      },
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  })

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="539291048397-uh153ujaiuf0qkad5rl2o0ah691gausj.apps.googleusercontent.com">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: appTheme === true ? "background.default" : "#f0f0f0",
              minHeight: "100vh",
              scrollBar: {
                "::webkit-scrollbar": {
                  width: 0,
                },
                "::webkit-scrollbar-track": {
                  width: 0,
                },
                "::webkit-scrollbar-thumb": {
                  width: 0,
                },
              },
              "&::-webkit-scrollbar": {
                width: 0,
              },
            }}
          >
            <CssBaseline />
            <Header setDarkMode={setAppTheme} darkMode={appTheme} />
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
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
