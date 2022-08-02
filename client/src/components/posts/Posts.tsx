import React, { useEffect } from "react"
import { Container, Grid } from "@mui/material"
import useStyles from "./styles"
import {
  selectPosts,
  selectPostStatus,
  getPosts,
} from "../../slices/postsSlice"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../utils/reduxHooks"
import Post from "./post/Post"
import { PostInterface } from "../utils/interfaces"
import Loading from "../loading/Loading"

const Posts: React.FC<{}> = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPosts()).then(() => {})
  }, [])

  const posts = useSelector(selectPosts)
  const status = useSelector(selectPostStatus)

  console.log(posts)

  if (status === "loading") return <Loading remSize="20" />

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container direction="column-reverse">
        {posts.map((post: PostInterface) => (
          <Post key={post._id} data={post} />
        ))}
      </Grid>
    </Container>
  )
}

export default Posts
