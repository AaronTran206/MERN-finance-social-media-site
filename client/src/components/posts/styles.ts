import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}))

export default useStyles