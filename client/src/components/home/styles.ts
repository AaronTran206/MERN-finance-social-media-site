import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    display: "flex",
    alignContent: "flex-start",
    minHeight: "100vh",
  },
}))

export default useStyles
