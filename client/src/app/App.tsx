import React from "react"
import { styled } from "@mui/material/styles"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"

// const Root = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }))

const App: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <Stock />
      <Footer />
    </>
  )
}

export default App
