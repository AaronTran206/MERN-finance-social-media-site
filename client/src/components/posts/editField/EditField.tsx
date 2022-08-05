//from libraries
import React from "react"
import { Button, TextField, Grid, Typography, createTheme } from "@mui/material"

//from other files
import useStyles from "./styles"
import { useAppDispatch } from "../../utils/reduxHooks"
import { editPost } from "../../../slices/postsSlice"
import { PostInterface } from "../../utils/interfaces"
import { domainToASCII } from "url"

const EditField: React.FC<{
  setEditText: Function
  editText: string
  setEditMode: Function
  data: PostInterface
  setPostText: Function
}> = ({ editText, setEditText, setEditMode, data, setPostText }) => {
  const theme = createTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const handleSaveChanges = () => {
    dispatch(editPost({ id: data._id, post: { ...data, post: editText } }))
    setPostText(editText)
    setEditMode(false)
  }

  return (
    <Grid container direction="column">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid item md={12} sx={{ marginBottom: theme.spacing(1) }}>
          <TextField
            onChange={(e: any) => setEditText(e.target.value)}
            value={editText}
            fullWidth
            multiline
          ></TextField>
        </Grid>
      </form>
      <Grid container direction="row" spacing={1}>
        <Grid item md={6} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="info"
            fullWidth
            onClick={handleCancel}
          >
            <Typography>Cancel</Typography>
          </Button>
        </Grid>
        <Grid item md={6} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveChanges}
          >
            <Typography>Save Changes</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EditField
