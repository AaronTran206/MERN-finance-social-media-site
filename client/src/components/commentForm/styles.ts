import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  form: {
    width: "100%",
  },
  fileInput: {
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
}))

export default useStyles
