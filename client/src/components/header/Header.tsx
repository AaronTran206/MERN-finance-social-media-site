import React, { useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  createTheme,
  Switch,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { googleLogout } from "@react-oauth/google"
import { useAppDispatch } from "../utils/reduxHooks"
import { useNavigate, useLocation } from "react-router-dom"
import { setAuthLogoutSlice } from "../../slices/authSlice"
import useStyles from "./styles"
import SearchBar from "../searchBar/SearchBar"
import { decodeToken } from "react-jwt"
import { stringAvatar } from "../utils/stringToColorFunc"
import DensityMediumIcon from "@mui/icons-material/DensityMedium"
import MenuModal from "./menuModal/MenuModal"

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#AAB4BE" : "#6D7985",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#AAB4BE" : "#6D7985",
    borderRadius: 20 / 2,
  },
}))

const Header: React.FC<{ setDarkMode: Function; darkMode: boolean }> = ({
  setDarkMode,
  darkMode,
}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")!))
  const [menuModalOpen, setMenuModalOpen] = useState<boolean>(false)

  const theme = createTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const classes = useStyles()

  const handleOpenMenuModal = () => {
    setMenuModalOpen(true)
  }

  const handleCloseMenuModal = () => {
    setMenuModalOpen(false)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")!))

    //get token from user token
    const token = user?.token

    //if token is expired, logout
    if (token) {
      const decodedToken: any = decodeToken(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [location])

  const logout = () => {
    //logout of google account
    googleLogout()

    //logout of account
    dispatch(setAuthLogoutSlice(null))

    //set user to null
    setUser(null)

    //navigate to landing
    navigate("/")

    //refresh page
    navigate(0)
  }

  const navigateLanding = () => {
    //navigate back to landing page
    navigate("/")

    //refresh page
    navigate(0)
  }

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", darkMode ? "false" : "true")
  }

  return (
    <>
      {user && (
        <AppBar className={classes.appBar} position="static">
          <Toolbar
            className={classes.toolbar}
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <div className={classes.navbar}>
              <Button
                className={classes.button}
                onClick={navigateLanding}
                variant="outlined"
                color="info"
                size="large"
              >
                Home
              </Button>
              <Avatar
                className={classes.avatar}
                {...stringAvatar(
                  `${user.result?.given_name} ${user.result?.family_name}`
                )}
              ></Avatar>
              <SearchBar />
              <MaterialUISwitch
                checked={darkMode}
                onChange={handleDarkModeChange}
              />
              <Button
                className={classes.button}
                onClick={logout}
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  marginLeft: theme.spacing(2),
                }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>

          <Toolbar
            className={classes.toolbar}
            sx={{
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
          >
            <Button
              className={classes.mobileMenuButton}
              variant="outlined"
              onClick={handleOpenMenuModal}
              color="info"
            >
              <DensityMediumIcon />
            </Button>
            <SearchBar />
            <MaterialUISwitch
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
          </Toolbar>
        </AppBar>
      )}
      <MenuModal
        handleOpen={menuModalOpen}
        handleClose={handleCloseMenuModal}
        givenName={user?.result?.given_name}
        familyName={user?.result?.family_name}
        navigateLanding={navigateLanding}
        logout={logout}
      />
    </>
  )
}

export default Header
