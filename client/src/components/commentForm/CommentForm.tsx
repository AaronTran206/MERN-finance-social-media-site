import React, { useState } from "react"
import {
  Grid,
  Paper,
  TextField,
  Container,
  Button,
  Breakpoint,
} from "@mui/material"
//@ts-ignore
import FileBase from "react-file-base64"
import useStyles from "./styles"
import { PostData } from "../utils/interfaces"
import { useAppDispatch } from "../utils/reduxHooks"
import { makePost } from "../../slices/postsSlice"
import { useLocation, useNavigate } from "react-router-dom"

const CommentForm: React.FC<{ width: Breakpoint }> = ({ width }) => {
  const [postData, setPostData] = useState<PostData>({
    post: "",
    selectedFile: "",
  })

  const user = JSON.parse(localStorage.getItem("profile")!)
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const clearInput = () => {
    setPostData({
      post: "",
      selectedFile: "",
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (postData.post === "" && postData.selectedFile === "") return

    //send post data to backend server to create new post
    dispatch(
      makePost({
        ...postData,
        name: `${user?.result.given_name} ${user?.result.family_name}`,
      })
    )
    //clearInput input fields
    clearInput()

    if (location.pathname !== "/home") navigate("/home")
  }

  return (
    <Container maxWidth={width}>
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                name="post"
                placeholder={`What's going on?`}
                variant="outlined"
                onChange={(e: any) =>
                  setPostData({ ...postData, post: e.target.value })
                }
                value={postData.post}
                fullWidth
                multiline
              />
              <Grid container>
                <Grid item sm={6}>
                  <div className={classes.fileInput}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }: any) =>
                        setPostData({ ...postData, selectedFile: base64 })
                      }
                    />
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className={classes.submitBtn}>
                    <Button type="submit" variant="contained">
                      POST
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default CommentForm
