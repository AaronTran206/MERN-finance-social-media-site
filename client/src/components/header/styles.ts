import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px",
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
    width: "100%",
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

  //mobile
  mobileMenuButton: {
    display: "flex",
  },
}))

export default useStyles
