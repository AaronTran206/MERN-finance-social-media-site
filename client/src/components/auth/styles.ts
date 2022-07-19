import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"
declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  googleButton: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },
}))

export default useStyles
