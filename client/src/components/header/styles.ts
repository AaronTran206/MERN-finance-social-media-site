import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "20px",
  },
}))

export default useStyles
