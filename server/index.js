import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

//routes import
import searchRoutes from "./routes/search.js"
import userRoutes from "./routes/users.js"

//setup
const app = express()
dotenv.config()

//setup
app.use(cors())
app.use(express.json())

//routes
app.use("/search", searchRoutes)
app.use("/user", userRoutes)

//server port
const PORT = process.env.PORT || 8000

//mongoDB Atlas
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message))
