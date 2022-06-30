import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Header from "../components/header/Header"
import SearchBar from "../components/searchBar/SearchBar"
import Stock from "../components/stock/Stock"
import Footer from "../components/footer/Footer"
import { Box } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

const App: React.FC<{}> = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background.default" }}>
          <Header />
          <SearchBar />
          <Stock />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
