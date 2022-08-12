import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
  name: String,
  author: String,
  comment: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
})

commentSchema.add({
  comments: [commentSchema],
})

const postsSchema = mongoose.Schema({
  name: String,
  author: String,
  post: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export default mongoose.model("Posts", postsSchema)
