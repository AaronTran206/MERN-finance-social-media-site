import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../components/utils/api"
import { ReduxPostData } from "../components/utils/interfaces"
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
    builder.addCase(makePost.pending, (state, action) => {
      state.status = "loading"
    })
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
  },
})

export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostStatus = (state: RootState) => state.posts.status

export default postsSlice.reducer
