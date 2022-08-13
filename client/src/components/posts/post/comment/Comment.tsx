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
  Box,
  Accordion,
} from "@mui/material"
import moment from "moment"

//icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import CircleIcon from "@mui/icons-material/Circle"

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
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

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

  const handleDividerClick = () => {
    setIsExpanded(!isExpanded)
  }

  // if (collapsed)
  //   return (
  //     <Box
  //       display="flex"
  //       sx={{ width: "100%", paddingBottom: theme.spacing(1) }}
  //     >
  //       <button
  //         className={classes.dividerButton}
  //         onClick={handleDividerClick}
  //       />
  //       <Grid
  //         container
  //         direction="row"
  //         className={classes.container}
  //         display="flex"
  //         alignItems="center"
  //       >
  //         <Grid item sx={{ marginLeft: theme.spacing(2) }}>
  //           <Avatar {...stringAvatar(commentData.name)} />
  //         </Grid>
  //         <Grid
  //           item
  //           display="flex"
  //           alignItems="center"
  //           sx={{ marginLeft: theme.spacing(0.7) }}
  //         >
  //           <Typography
  //             variant="h5"
  //             sx={{
  //               fontSize: "1rem",
  //             }}
  //           >
  //             <strong>{commentData.name}</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item>
  //           <CircleIcon
  //             sx={{
  //               color: "#63666A",
  //               fontSize: 6,
  //               marginLeft: theme.spacing(1),
  //             }}
  //           />
  //         </Grid>

  //         <Grid item display="flex" sx={{ marginTop: theme.spacing(0.5) }}>
  //           <Typography
  //             variant="caption"
  //             sx={{ color: "gray", marginLeft: theme.spacing(1) }}
  //           >
  //             {moment(commentData.createdAt).fromNow()}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   )

  return (
    <Box display="flex">
      <Box
        display="flex"
        sx={{ width: "100%", paddingBottom: theme.spacing(1) }}
      >
        <button
          className={classes.dividerButton}
          onClick={handleDividerClick}
        />
        <Grid
          container
          direction="column"
          display="flex"
          sx={{ paddingLeft: theme.spacing(2) }}
        >
          <Accordion
            defaultExpanded
            expanded={isExpanded}
            sx={{
              backgroundColor: "pallete.background.paper",
              boxShadow: 0,
            }}
          >
            <Grid
              container
              direction="row"
              className={classes.container}
              display="flex"
              alignItems="center"
            >
              <Grid item>
                <Avatar {...stringAvatar(commentData.name)} />
              </Grid>
              <Grid item display="flex" sx={{ marginLeft: theme.spacing(0.7) }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  <strong>{commentData.name}</strong>
                </Typography>
              </Grid>

              <Grid item>
                <CircleIcon
                  sx={{
                    color: "#63666A",
                    fontSize: 6,
                    marginLeft: theme.spacing(1),
                  }}
                />
              </Grid>

              <Grid item display="flex" sx={{ marginTop: theme.spacing(0.5) }}>
                <Typography
                  variant="caption"
                  sx={{ color: "gray", marginLeft: theme.spacing(1) }}
                >
                  {moment(commentData.createdAt).fromNow()}
                </Typography>
              </Grid>
              {userId === commentData.author && (
                <Grid item className={classes.horizIcon}>
                  <CardActions>
                    <IconButton
                      aria-label="more"
                      id="comment-options-button"
                      aria-controls={
                        menuOpen ? "comment-options-menu" : undefined
                      }
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
            {commentData.comments.map((com) => (
              <>
                <Divider />
                <Comment commentData={com} postId={postId} />
              </>
            ))}
          </Accordion>
        </Grid>
      </Box>
    </Box>
  )
}

export default Comment
