import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

import App from "./app/App"

const rootElement = document.getElementById("root") as Element
const root = ReactDOM.createRoot(rootElement)

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default" }}>
        <App />
      </Box>
    </ThemeProvider>
  </Provider>
)
