import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

//routes import
import searchRoutes from "./routes/search.js"

//setup
const app = express()
dotenv.config()

//setup
app.use(cors())
app.use(express.json())

//routes
app.use("/search", searchRoutes)

//mongoDB Atlas
const PORT = process.env.PORT || 8000

//mongoose
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
