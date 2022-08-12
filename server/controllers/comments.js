import mongoose from "mongoose"
import Posts from "../models/posts.js"

export const likeComment = async (req, res) => {
  const { postId, commentId } = req.params

  if (!req.userId) return res.json({ message: "Log in to like the comment." })
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that ID.")
  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(404).send("No comment with that ID.")

  //query posts for comment ID that matches id from req.params
  const post = await Posts.findById(postId)

  const likeCommentDocument = async (p) => {
    let current = p

    if (current.comments.id(commentId) !== null) {
      const comment = current.comments.id(commentId)

      const index = comment.likes.findIndex((id) => id === String(req.userId))

      if (index === -1) {
        comment.likes.push(req.userId)
      } else {
        comment.likes = comment.likes.filter((id) => id !== String(req.userId))
      }

      const updatedComments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      )

      post.comments = updatedComments

      const updatedPost = await Posts.findByIdAndUpdate(postId, post, {
        new: true,
      })

      res.json(updatedPost)
    } else {
      current.comments.forEach((com) => {
        likeCommentDocument(com)
      })
    }
  }

  likeCommentDocument(post)
}

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params

  if (!req.userId) return res.json({ message: "Log in to delete the comment." })
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No parent with that ID.")
  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(404).send("No comment with that ID.")

  const post = await Posts.findById(postId)

  const deleteCommentDocument = (p) => {
    let current = p

    if (current.comments.id(commentId) !== null) {
      current.comments.id(commentId).remove()

      current.save()
    } else {
      current.comments.forEach((com) => {
        deleteCommentDocument(com)
      })
    }
  }

  deleteCommentDocument(post)

  res.json({ message: "Comment deleted!" })
}
