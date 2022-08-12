import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { create } from "domain"
import { Action } from "history"
import * as api from "../components/utils/api"
import {
  ReduxPostData,
  EditPostData,
  CommentDataRedux,
  LikeComment,
  DeleteComment,
  ReplyComment,
  EditComment,
} from "../components/utils/interfaces"
import { RootState } from "../store"

//interface setup for redux posts slice
interface PostDataInterface {
  posts: any[]
  status: "idle" | "loading" | "failed" | "success"
}

const initialState = {
  posts: [],
  status: "idle",
} as PostDataInterface

export const getPosts = createAsyncThunk("/getPosts", async () => {
  try {
    const { data } = await api.getPosts()

    return data
  } catch (error) {
    console.error(error)
  }
})

export const makePost = createAsyncThunk(
  "/makePost",
  async (d: ReduxPostData) => {
    const formData = d
    try {
      const { data } = await api.makePost(formData)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const likePost = createAsyncThunk("/likePost", async (id: string) => {
  try {
    const { data } = await api.likePost(id)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const deletePost = createAsyncThunk(
  "/deletePost",
  async (id: string) => {
    try {
      await api.deletePost(id)

      return id
    } catch (error) {
      console.log(error)
    }
  }
)

export const editPost = createAsyncThunk(
  "/editPost",
  async (d: EditPostData) => {
    const { id, post } = d

    try {
      const { data } = await api.editPost(id, post)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const commentPost = createAsyncThunk(
  "commentPost",
  async (d: CommentDataRedux) => {
    const { id, comment, name } = d
    const commentData = {
      comment: comment,
      name: name,
    }

    try {
      const { data } = await api.commentPost(id, commentData)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

//comment functions
export const likeComment = createAsyncThunk(
  "/likeComment",
  async (d: LikeComment) => {
    const { commentId, postId } = d

    try {
      const { data } = await api.likeComment(commentId, postId)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteComment = createAsyncThunk(
  "/deleteComment",
  async (d: DeleteComment) => {
    const { commentId, postId } = d
    try {
      const { data } = await api.deleteComment(commentId, postId)

      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const replyComment = createAsyncThunk(
  "/replyComment",
  async (d: ReplyComment) => {
    const { commentId, postId, comment, name } = d
    const commentData = {
      comment: comment,
      name: name,
    }
    try {
      const { data } = await api.replyComment(commentId, postId, commentData)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const editComment = createAsyncThunk(
  "/editComment",
  async (d: EditComment) => {
    const { commentId, postId, newPost } = d

    try {
      const { data } = await api.editComment(commentId, postId, newPost)

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get posts
    builder.addCase(getPosts.pending, (state, action) => {
      state.status = "loading"
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = action.payload
    })

    //make post
    builder.addCase(makePost.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(makePost.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = [...state.posts, action.payload]
    })

    //like post
    builder.addCase(likePost.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })
    //delete post
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.filter((post) => post._id !== action.payload)
    })

    //edit post
    builder.addCase(editPost.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })
    //comment post
    builder.addCase(commentPost.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(commentPost.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })

    //COMMENTS
    //like comment
    builder.addCase(likeComment.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(likeComment.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })

    //delete comment
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })
    //reply comment
    builder.addCase(replyComment.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(replyComment.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })

    //edit comment
    builder.addCase(editComment.rejected, (state, action) => {
      state.status = "failed"
    })
    builder.addCase(editComment.fulfilled, (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    })
  },
})

export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostStatus = (state: RootState) => state.posts.status

export default postsSlice.reducer
