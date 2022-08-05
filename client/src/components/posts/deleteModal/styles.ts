import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  deleteModalCard: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  deleteModalActions: {
    display: "block",
  },
}))

export default useStyles
