import React from "react"
import { Provider } from "react-redux"
import { store } from "../store"
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background.default" }}>
          <Header />
          <SearchBar />
          <Stock />
          <Footer />
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default App
