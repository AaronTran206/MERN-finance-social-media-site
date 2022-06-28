import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

//routes import
import tickerRoutes from "./routes/ticker.js"

//setup
const app = express()
dotenv.config()

//setup
app.use(cors())
app.use(express.json())

//routes
app.use("/ticker", tickerRoutes)

//mongoDB Atlas
const PORT = process.env.PORT || 8000

//mongoose
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
