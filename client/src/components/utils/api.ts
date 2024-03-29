import axios from "axios"
import {
  InitialFormState,
  PostInterface,
  CommentData,
  ReplyData,
  CommentInterface,
} from "./interfaces"

const API = axios.create({
  baseURL: "https://mern-finance-social-media.herokuapp.com/",
})

//middleware verification setup.
//add token to request headers for backend to verify
API.interceptors.request.use((req) => {
  if (req.headers) {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")!).token
      }`
    }

    return req
  }
})

//postSlice
export const getPosts = () => API.get(`/posts/getPosts`)

export const makePost = (formData: any) => API.post(`/posts/makePost`, formData)

export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`)

export const deletePost = (id: string) => API.delete(`/posts/${id}`)

export const editPost = (id: string, updatedPost: PostInterface) =>
  API.patch(`/posts/${id}`, updatedPost)

export const commentPost = (id: string, commentData: CommentData) =>
  API.patch(`/posts/${id}/commentPost`, commentData)

//comments
export const deleteComment = (commentId: string, postId: string) =>
  API.delete(`/comments/${postId}/${commentId}/`)

export const likeComment = (commentId: string, postId: string) =>
  API.patch(`/comments/${postId}/${commentId}/likeComment`)

export const replyComment = (
  commentId: string,
  postId: string,
  commentData: ReplyData
) => API.patch(`/comments/${postId}/${commentId}/replyComment`, commentData)

export const editComment = (
  commentId: string,
  postId: string,
  newPost: CommentInterface
) => API.patch(`/comments/${postId}/${commentId}/editComment`, newPost)

//stockDataSlice
//go to backend server to fetch api data
export const fetchFinanceData = (ticker: string) => API.get(`/search/${ticker}`)

//authSlice
//sign in and sign up
export const signIn = (formData: InitialFormState) =>
  API.post("/user/signin", formData)

export const signUp = (formData: InitialFormState) =>
  API.post("/user/signup", formData)
