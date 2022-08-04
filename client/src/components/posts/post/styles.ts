import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    width: "100%",
  },
  card: {
    flex: 1,
    marginBottom: theme.spacing(4),
  },
  cardHeader: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
  },
  horizIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "gray",
  },
  avatarContainer: {
    paddingRight: theme.spacing(1),
  },
  name: {
    position: "relative",
    top: "5px",
  },
  paper: {
    padding: theme.spacing(2),
  },
  cardActionsHoriz: {},
  cardActionsLikes: {
    display: "flex",
    justifyContent: "flex-start",
  },
  likeButton: {
    marginRight: "1rem",
  },
  dateText: {
    display: "flex",
    justifyContent: "flex-end",
    color: "gray",
  },
}))

export default useStyles
