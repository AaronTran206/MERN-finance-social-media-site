import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  dateText: {
    display: "flex",
    position: "absolute",
    justifyContent: "flex-start",
    color: "gray",
    top: "1.7rem",
  },
  horizIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "gray",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
}))

export default useStyles
