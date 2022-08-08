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
} from "@mui/material"
import moment from "moment"

//icons
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import SendIcon from "@mui/icons-material/Send"

//from other files
import useStyles from "./styles"
import { PostInterface } from "../../utils/interfaces"
import { stringAvatar } from "../../utils/stringToColorFunc"
import { useAppDispatch } from "../../utils/reduxHooks"
import { likePost, deletePost } from "../../../slices/postsSlice"

//components
import DeleteModal from "../deleteModal/DeleteModal"
import EditField from "../editField/EditField"
import { setCommentRange } from "typescript"

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
    setComment("")
  }

  const Likes: React.FC<{}> = () => {
    //if the there is a person that liked the post
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="medium" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize="medium" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      )
    }
    //if nobody has liked the post yet
    return (
      <>
        <ThumbUpOffAltIcon fontSize="medium" />
        &nbsp;Like
      </>
    )
  }

  return (
    <Grid item xs={12} className={classes.cardContainer}>
      <Card className={classes.card}>
        <Paper className={classes.paper} elevation={5}>
          <Grid container direction="row" className={classes.cardHeader}>
            <Grid
              item
              sx={{
                marginRight: theme.spacing(1),
              }}
            >
              <Avatar {...stringAvatar(data.name)}></Avatar>
            </Grid>

            <Grid item>
              <Typography variant="h5" className={classes.name}>
                <strong>{data.name}</strong>
              </Typography>

              <Typography
                variant="caption"
                className={classes.dateText}
                sx={{ marginTop: theme.spacing(0.5) }}
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
          />

          <Grid
            item
            sx={{
              margin: theme.spacing(1),
            }}
          >
            {editMode ? (
              <EditField
                editText={editText}
                setEditText={setEditText}
                setEditMode={setEditMode}
                setPostText={setPostText}
                data={data}
              />
            ) : (
              <Typography variant="body1" paragraph noWrap>
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
              <Likes />
            </Button>
            <div>
              <Button variant="outlined" onClick={handleComment}>
                <SendIcon />
              </Button>
            </div>
          </CardActions>
        </Paper>
      </Card>
    </Grid>
  )
}

export default Post
