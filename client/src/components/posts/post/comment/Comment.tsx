//libraries
import React, { useState } from "react"
import {
  Avatar,
  Grid,
  Typography,
  createTheme,
  CardActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material"
import moment from "moment"

//icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

//other files
import useStyles from "./styles"
import { CommentInterface } from "../../../utils/interfaces"
import { stringAvatar } from "../../../utils/stringToColorFunc"
import { useAppDispatch } from "../../../utils/reduxHooks"
import {
  likeComment,
  deleteComment,
  replyComment,
  editComment,
} from "../../../../slices/postsSlice"

//components
import Likes from "../../likes/Likes"
import DeleteModal from "../../deleteModal/DeleteModal"
import EditField from "../../editField/EditField"

const Comment: React.FC<{
  commentData: CommentInterface
  postId: string
}> = ({ commentData, postId }) => {
  const [editText, setEditText] = useState<string>("")
  const [editMode, setEditMode] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>(commentData.comment)
  const [likes, setLikes] = useState<string[]>(commentData.likes)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [reply, setReply] = useState<string>("")
  const [replyMode, setReplyMode] = useState<boolean>(false)

  //menu setup
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const theme = createTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()

  //get current profile ID to compare with individual posts
  const user = JSON.parse(localStorage.getItem("profile")!)
  const userId = user?.result.sub || user?.result._id
  const hasLikedPost = likes.find((like: string) => like === userId)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true)
    handleCloseMenu()
  }
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const handleLike = () => {
    dispatch(likeComment({ commentId: commentData._id, postId: postId }))

    if (hasLikedPost) {
      setLikes(likes.filter((like) => like !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }

  const handleReply = () => {
    setReplyMode(true)
  }

  const handleCancelReply = () => {
    setReplyMode(false)
    setReply("")
  }

  const handleSaveReply = () => {
    if (reply === "") return
    dispatch(
      replyComment({
        commentId: commentData._id,
        postId: postId,
        comment: reply,
        name: `${user?.result.given_name} ${user?.result.family_name}`,
      })
    )
    setReplyMode(false)
    setReply("")
  }

  const handleEdit = () => {
    setEditText(commentText)
    setEditMode(true)
    handleCloseMenu()
  }
  const handleDelete = () => {
    dispatch(deleteComment({ commentId: commentData._id, postId: postId }))
    setDeleteModalOpen(false)
  }

  const handleSaveChanges = () => {
    dispatch(
      editComment({
        commentId: commentData._id,
        postId: postId,
        newPost: { ...commentData, comment: editText },
      })
    )
    setCommentText(editText)
    setEditMode(false)
  }

  return (
    <Grid container direction="column" sx={{ padding: theme.spacing(0, 2) }}>
      <Grid container direction="row" className={classes.container}>
        <Grid item xs={1}>
          <Avatar {...stringAvatar(commentData.name)} />
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          position="relative"
          xs={10}
          sx={{ marginLeft: theme.spacing(0.7) }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "1rem",
            }}
          >
            <strong>{commentData.name}</strong>
          </Typography>

          <Typography variant="caption" className={classes.dateText}>
            {moment(commentData.createdAt).fromNow()}
          </Typography>
        </Grid>
        {userId === commentData.author && (
          <Grid item className={classes.horizIcon}>
            <CardActions>
              <IconButton
                aria-label="more"
                id="comment-options-button"
                aria-controls={menuOpen ? "comment-options-menu" : undefined}
                aria-expanded={menuOpen ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleOpenMenu}
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>
              <Menu
                id="comment-options-menu"
                MenuListProps={{
                  "aria-labelledby": "comment-options-button",
                }}
                open={menuOpen}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={handleEdit}>
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteModal}>
                  <Typography color="error">Delete</Typography>
                </MenuItem>
              </Menu>
            </CardActions>
          </Grid>
        )}
      </Grid>

      <DeleteModal
        handleOpen={deleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        item={"comment"}
      />

      <Grid
        item
        sx={{ padding: theme.spacing(2, 1, 0) }}
        display="flex"
        alignItems="center"
      >
        {editMode ? (
          <EditField
            editText={editText}
            setEditText={setEditText}
            setEditMode={setEditMode}
            handleSaveChanges={handleSaveChanges}
          />
        ) : (
          <Typography
            variant="body2"
            display="block"
            sx={{ whiteSpace: "pre-line" }}
          >
            {commentText}
          </Typography>
        )}
      </Grid>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user.result}
          sx={{
            fontSize: "0.8rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Likes likes={likes} small noText />
        </Button>
        <div>
          <Button onClick={handleReply}>
            <strong>Reply</strong>
          </Button>
        </div>
      </CardActions>
      {replyMode && (
        <>
          <Grid item sx={{ marginBottom: theme.spacing(1) }}>
            <Divider />
            <TextField
              onChange={(e: any) => setReply(e.target.value)}
              value={reply}
              fullWidth
              multiline
            />
          </Grid>
          <Grid
            container
            direction="row"
            spacing={1}
            sx={{ marginBottom: theme.spacing(1) }}
          >
            <Grid item md={6} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="info"
                fullWidth
                onClick={handleCancelReply}
                size="small"
              >
                <Typography>Cancel</Typography>
              </Button>
            </Grid>
            <Grid item md={6} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveReply}
                size="small"
              >
                <Typography>Send</Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <Divider />
      {commentData.comments.map((com, i) => (
        <>
          <Comment commentData={com} postId={postId} />
          {i === commentData.comments.length - 1 ? null : <Divider />}
        </>
      ))}
    </Grid>
  )
}

export default Comment
