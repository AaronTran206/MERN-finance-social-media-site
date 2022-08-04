import express from "express"
import auth from "../middleware/auth.js"
import { getPosts, makePost, likePost } from "../controllers/posts.js"

const router = express.Router()

//get posts
router.get("/getPosts", getPosts)

//make post
router.post("/makePost", auth, makePost)

//like post
router.patch("/:id/likePost", auth, likePost)

export default router
