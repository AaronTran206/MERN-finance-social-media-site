import express from "express"
import { signUp, signIn } from "../controllers/users.js"

const router = express.Router()

//route to sign in
router.post("/signin", signIn)

//route to sign up
router.post("/signup", signUp)

export default router
