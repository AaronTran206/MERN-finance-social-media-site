import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import App from "./app/App"

const rootElement = document.getElementById("root") as Element
const root = ReactDOM.createRoot(rootElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
