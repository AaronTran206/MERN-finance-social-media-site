import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  box: {
    height: "100%",
    width: "65%",
  },
  paper: {
    height: "100%",
    width: "100%",
  },
  avatar: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },

  avatarText: {
    display: "flex",
    justifyContent: "center",
  },
}))

export default useStyles
