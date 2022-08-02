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
