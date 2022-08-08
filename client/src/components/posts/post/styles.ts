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
  dateText: {
    display: "flex",
    justifyContent: "flex-start",
    color: "gray",
  },
  horizIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "gray",
  },
  name: {
    position: "relative",
    top: "5px",
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  imageCard: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  likeButton: {
    marginRight: "1rem",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  sendIcon: {
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "center",
  },
}))

export default useStyles
