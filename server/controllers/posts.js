import mongoose from "mongoose"
import Posts from "../models/posts.js"

export const getPosts = async (req, res) => {
  try {
    //find all posts in posts mongoose database
    const posts = await Posts.find()

    //return posts
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const makePost = async (req, res) => {
  //get post data from request body
  const post = req.body

  //create new post object to add to database
  const newPost = new Posts({
    ...post,
    author: req.userId,
    createdAt: new Date().toISOString(),
  })

  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const editPost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  if (!req.userId) return res.json({ message: "Log in to edit the post" })

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this ID.")

  const updatedPost = await Posts.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  )

  res.json(updatedPost)
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) return res.json({ message: "Log in to like the post." })

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID.")

  //return post that matches post ID in req parameter
  const post = await Posts.findById(id)

  //check if user ID is inside the post likes array
  const index = post.likes.findIndex((id) => id === String(req.userId))

  if (index === -1) {
    //like post
    post.likes.push(req.userId)
  } else {
    //delete like
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await Posts.findByIdAndUpdate(id, post, {
    new: true,
  })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) return res.json({ message: "Log in to delete the post." })

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id.")

  await Posts.findByIdAndRemove(id)

  res.json({ message: "Post deleted!" })
}

export const commentPost = async (req, res) => {
  const { id: _id } = req.params
  const commentData = req.body

  if (!req.userId) return res.json({ message: "Log in to comment on a post." })
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id.")

  const post = await Posts.findById(_id)

  const newComment = {
    ...commentData,
    author: req.userId,
    createdAt: new Date().toISOString(),
  }

  post.comments.push(newComment)

  const updatedPost = await Posts.findByIdAndUpdate(_id, post, { new: true })

  res.json(updatedPost)
}
