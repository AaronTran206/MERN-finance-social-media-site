import React from "react"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import Home from "../components/home/Home"
import Auth from "../components/auth/Auth"
import { Container, CssBaseline } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

const App: React.FC<{}> = () => {
  const user = JSON.parse(localStorage.getItem("profile")!)

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="539291048397-uh153ujaiuf0qkad5rl2o0ah691gausj.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search/:ticker" element={<Stock />} />
          </Routes>
          <Footer />
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
