//from libraries
import React, { useState } from "react"
import {
  Grid,
  Paper,
  Typography,
  Card,
  TextField,
  Divider,
  createTheme,
  Avatar,
  CardMedia,
  CardActions,
  Button,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Box,
} from "@mui/material"
import moment from "moment"

//icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import SendIcon from "@mui/icons-material/Send"
import CircleIcon from "@mui/icons-material/Circle"

//from other files
import useStyles from "./styles"
import { PostInterface } from "../../utils/interfaces"
import { stringAvatar } from "../../utils/stringToColorFunc"
import { useAppDispatch } from "../../utils/reduxHooks"
import {
  likePost,
  deletePost,
  commentPost,
  editPost,
} from "../../../slices/postsSlice"

//components
import DeleteModal from "../deleteModal/DeleteModal"
import EditField from "../editField/EditField"
import Comment from "./comment/Comment"
import Likes from "../likes/Likes"

const Post: React.FC<{
  data: PostInterface
}> = ({ data }) => {
  const [editText, setEditText] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [postText, setPostText] = useState<string>(data.post)
  const [likes, setLikes] = useState<string[]>(data.likes)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false)

  //menu setup
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const user = JSON.parse(localStorage.getItem("profile")!)
  const classes = useStyles()
  const theme = createTheme()
  const dispatch = useAppDispatch()

  //get current profile ID to compare with individual posts
  const userId = user?.result.sub || user?.result._id

  //get variable for if this profile has liked the post
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

  const handleOpenImageModal = () => {
    setImageModalOpen(true)
  }

  const handleCloseImageModal = () => {
    setImageModalOpen(false)
  }

  const handleDelete = async () => {
    dispatch(deletePost(data._id))
    setDeleteModalOpen(false)
  }

  const handleLike = async () => {
    dispatch(likePost(data._id))

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }

  const handleEdit = async () => {
    setEditText(postText)
    setEditMode(true)
    handleCloseMenu()
  }

  const handleComment = async () => {
    if (comment === "") return

    dispatch(
      commentPost({
        id: data._id,
        comment: comment,
        name: `${user?.result.given_name} ${user?.result.family_name}`,
      })
    )
    setComment("")
  }

  const handleSaveChanges = () => {
    dispatch(editPost({ id: data._id, post: { ...data, post: editText } }))
    setPostText(editText)
    setEditMode(false)
  }

  return (
    <Grid item xs={12} className={classes.cardContainer}>
      <Card className={classes.card}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            className={classes.cardHeader}
            display="flex"
            alignItems="center"
          >
            <Grid item>
              <Avatar {...stringAvatar(data.name)} />
            </Grid>

            <Grid
              item
              display="flex"
              alignItems="center"
              sx={{ marginLeft: theme.spacing(0.7) }}
            >
              <Typography variant="h5">
                <strong>{data.name}</strong>
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
                {moment(data.createdAt).fromNow()}
              </Typography>
            </Grid>

            {userId === data.author && (
              <Grid item className={classes.horizIcon}>
                <CardActions>
                  <IconButton
                    aria-label="more"
                    id="post-options-button"
                    aria-controls={menuOpen ? "post-options-menu" : undefined}
                    aria-expanded={menuOpen ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="post-options-menu"
                    MenuListProps={{
                      "aria-labelledby": "post-options-button",
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
            item={"post"}
          />

          <Grid
            item
            sx={{
              margin: theme.spacing(2.5, 1, 1, 1),
            }}
          >
            {editMode ? (
              <EditField
                editText={editText}
                setEditText={setEditText}
                setEditMode={setEditMode}
                handleSaveChanges={handleSaveChanges}
              />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {postText}
              </Typography>
            )}
          </Grid>

          {data?.selectedFile && (
            <Grid item>
              <CardActionArea onClick={handleOpenImageModal}>
                <CardMedia component="img" image={data.selectedFile} />
              </CardActionArea>
              <Modal open={imageModalOpen} onClose={handleCloseImageModal}>
                <Card className={classes.imageCard}>
                  <CardMedia component={"img"} image={data.selectedFile} />
                </Card>
              </Modal>
            </Grid>
          )}
          <Divider orientation="horizontal" light />
          <Grid
            item
            sx={{
              marginTop: theme.spacing(1),
            }}
          >
            <TextField
              name="Write a comment"
              label="Write a comment..."
              variant="outlined"
              multiline={true}
              fullWidth
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
            />
          </Grid>

          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              onClick={handleLike}
              disabled={!user.result}
            >
              <Likes likes={likes} />
            </Button>
            <div>
              <Button variant="outlined" onClick={handleComment}>
                <SendIcon />
              </Button>
            </div>
          </CardActions>

          {data.comments.map((com) => (
            <>
              <Divider />
              <Comment commentData={com} postId={data._id} />
            </>
          ))}
        </Paper>
      </Card>
    </Grid>
  )
}

export default Post
