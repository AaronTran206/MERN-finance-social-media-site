import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
  cardHeader: {
    display: "flex",
    justifyContent: "flex-start",
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
  dateText: {
    color: "gray",
  },
}))

export default useStyles
