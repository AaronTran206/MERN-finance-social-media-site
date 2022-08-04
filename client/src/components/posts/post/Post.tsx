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
} from "@mui/material"
import moment from "moment"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import useStyles from "./styles"
import { PostInterface } from "../../utils/interfaces"
import { stringAvatar } from "../../utils/stringToColorFunc"
import { useAppDispatch } from "../../utils/reduxHooks"
import { likePost } from "../../../slices/postsSlice"

const Post: React.FC<{
  data: PostInterface
}> = ({ data }) => {
  const [likes, setLikes] = useState<string[]>(data?.likes)

  //menu setup
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

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

  const handleLike = async () => {
    dispatch(likePost(data._id))

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
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
        <Paper className={classes.paper} elevation={3}>
          <Grid container direction="row" className={classes.cardHeader}>
            <Grid item className={classes.avatarContainer}>
              <Avatar {...stringAvatar(data.name)}></Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.name}>
                <strong>{data.name}</strong>
              </Typography>
            </Grid>

            <Grid item className={classes.horizIcon}>
              <CardActions>
                <IconButton
                  aria-label="more"
                  id="post-options-button"
                  aria-controls={open ? "post-options-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
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
                  open={open}
                  onClose={handleCloseMenu}
                  anchorEl={anchorEl}
                >
                  <MenuItem>
                    <Typography>Edit</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography color="error">Delete</Typography>
                  </MenuItem>
                </Menu>
              </CardActions>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              margin: theme.spacing(1),
            }}
          >
            <Typography variant="body1">{data.post}</Typography>
          </Grid>
          {data?.selectedFile && (
            <CardActionArea>
              <CardMedia component="img" image={data.selectedFile} />
            </CardActionArea>
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
            ></TextField>
          </Grid>
          <Grid container direction="row">
            <Grid item md={6}>
              <CardActions className={classes.cardActionsLikes}>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleLike}
                  disabled={!user.result}
                >
                  <Likes />
                </Button>
              </CardActions>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                marginTop: theme.spacing(1.5),
              }}
            >
              <Typography variant="caption" className={classes.dateText}>
                {moment(data.createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Card>
    </Grid>
  )
}

export default Post
