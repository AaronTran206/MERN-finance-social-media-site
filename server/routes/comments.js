import express from "express"
import auth from "../middleware/auth.js"
import {
  likeComment,
  deleteComment,
  replyComment,
  editComment,
} from "../controllers/comments.js"

const router = express.Router()

router.patch("/:postId/:commentId/likeComment", auth, likeComment)

router.patch("/:postId/:commentId/replyComment", auth, replyComment)

router.patch("/:postId/:commentId/editComment", auth, editComment)

router.delete("/:postId/:commentId", auth, deleteComment)

export default router
