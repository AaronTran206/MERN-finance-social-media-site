import React from "react"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import Home from "../components/home/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Header />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:ticker" element={<Stock />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
