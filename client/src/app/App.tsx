import React from "react"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import Home from "../components/home/Home"
import { Container } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="539291048397-uh153ujaiuf0qkad5rl2o0ah691gausj.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:ticker" element={<Stock />} />
          </Routes>
          <Footer />
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
