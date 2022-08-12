import React from "react"
import {
  Modal,
  Card,
  Typography,
  Grid,
  Button,
  CardActions,
  createTheme,
} from "@mui/material"
import useStyles from "./styles"

const DeleteModal: React.FC<{
  handleOpen: boolean
  handleClose: any
  handleDelete: any
  item: string
}> = ({ handleOpen, handleClose, handleDelete, item }) => {
  const theme = createTheme()
  const classes = useStyles()

  return (
    <Modal open={handleOpen} onClose={handleClose}>
      <Card className={classes.deleteModalCard}>
        <Grid container direction="column">
          <Grid
            item
            md={12}
            sx={{
              marginBottom: theme.spacing(1),
            }}
          >
            <Typography variant="h4">Are you sure?</Typography>
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              marginBottom: theme.spacing(1),
            }}
          >
            <Typography variant="subtitle1" color="gray">
              {`Do you really want to delete this ${item}? This cannot be undone.`}
            </Typography>
          </Grid>

          <CardActions className={classes.deleteModalActions}>
            <Grid item md={6}>
              <Button onClick={handleClose} variant="outlined" fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                fullWidth
              >
                Delete
              </Button>
            </Grid>
          </CardActions>
        </Grid>
      </Card>
    </Modal>
  )
}

export default DeleteModal
