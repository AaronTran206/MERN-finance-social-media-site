import express from "express"
import auth from "../middleware/auth.js"
import { likeComment, deleteComment } from "../controllers/comments.js"

const router = express.Router()

router.patch("/:postId/:commentId/likeComment", auth, likeComment)

router.delete("/:postId/:commentId", auth, deleteComment)

export default router
