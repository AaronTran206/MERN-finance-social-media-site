import React from "react"
import {
  Grid,
  Paper,
  Typography,
  Card,
  TextField,
  Divider,
  createTheme,
  Avatar,
} from "@mui/material"
import { PostInterface } from "../../utils/interfaces"
import moment from "moment"
import useStyles from "./styles"
import { stringAvatar } from "../../utils/stringToColorFunc"

const Post: React.FC<{
  data: PostInterface
}> = ({ data }) => {
  const classes = useStyles()
  const theme = createTheme()

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <Paper className={classes.paper} elevation={5}>
          <Grid container direction="row" className={classes.cardHeader}>
            <Grid item className={classes.avatarContainer}>
              <Avatar {...stringAvatar(data.name)}></Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.name}>
                <strong>{data.name}</strong>
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            <Typography variant="body1">{data.post}</Typography>
          </Grid>
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
          <Grid
            item
            sx={{
              marginTop: theme.spacing(1),
            }}
          >
            <Typography variant="caption" className={classes.dateText}>
              {moment(data.createdAt).fromNow()}
            </Typography>
          </Grid>
        </Paper>
      </Card>
    </Grid>
  )
}

export default Post
