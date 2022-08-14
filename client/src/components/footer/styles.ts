import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginTop: theme.spacing(10),
    borderRadius: 0,
  },
  box: {
    height: "12rem",
    display: "flex",
    alignItems: "center",
  },
}))

export default useStyles
