import express from "express"
import auth from "../middleware/auth.js"
import {
  getPosts,
  makePost,
  likePost,
  deletePost,
} from "../controllers/posts.js"

const router = express.Router()

router.get("/getPosts", getPosts)

router.post("/makePost", auth, makePost)

router.patch("/:id/likePost", auth, likePost)

router.delete("/:id", auth, deletePost)

export default router
