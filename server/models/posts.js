import mongoose from "mongoose"

const postsSchema = mongoose.Schema({
  name: String,
  author: String,
  post: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export default mongoose.model("Posts", postsSchema)
