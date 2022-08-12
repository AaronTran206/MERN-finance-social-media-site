import mongoose from "mongoose"
import posts from "../models/posts.js"
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

  const deleteCommentDocument = async (p) => {
    let current = p

    if (current.comments.id(commentId) !== null) {
      await current.comments.id(commentId).remove()

      await current.ownerDocument().save()

      const updatedPost = current.ownerDocument()

      res.json(updatedPost)
    } else {
      current.comments.forEach((com) => {
        deleteCommentDocument(com)
      })
    }
  }
  await deleteCommentDocument(post)
}

export const replyComment = async (req, res) => {
  const { postId, commentId } = req.params
  const commentData = req.body //comment and name

  if (!req.userId)
    return res.json({ message: "Log in to reply to the comment." })
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No parent with that ID.")
  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(404).send("No comment with that ID.")

  const post = await posts.findById(postId)
  const newComment = {
    ...commentData,
    author: req.userId,
    createdAt: new Date().toISOString(),
  }

  const pushComment = async (p) => {
    const current = p

    if (current.comments.id(commentId) !== null) {
      const c = current.comments.id(commentId)

      await c.comments.push(newComment)

      await c.ownerDocument().save()

      const updatedPost = await Posts.findById(postId)
      res.json(updatedPost)
    } else {
      current.comments.forEach((com) => {
        pushComment(com)
      })
    }
  }

  await pushComment(post)
}

export const editComment = async (req, res) => {
  const { postId, commentId } = req.params
  const newPost = req.body

  if (!req.userId) return res.json({ message: "Log in to edit the comment." })
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No parent with that ID.")
  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(404).send("No comment with that ID.")

  const post = await Posts.findById(postId)

  const editComment = async (p) => {
    const current = p

    if (current.comments.id(commentId) !== null) {
      const index = await current.comments.findIndex((com) =>
        com._id.equals(commentId)
      )

      const originalCreatedAt = current.comments.id(commentId).createdAt

      current.comments.splice(index, 1, { ...newPost, originalCreatedAt })

      await current.ownerDocument().save()

      const updatedPost = await Posts.findById(postId)
      res.json(updatedPost)
    } else {
      current.comments.forEach((com) => {
        editComment(com)
      })
    }
  }

  await editComment(post)
}
