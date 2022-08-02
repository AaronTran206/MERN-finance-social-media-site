import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, Button, Avatar } from "@mui/material"
import { googleLogout } from "@react-oauth/google"
import { useAppDispatch } from "../utils/reduxHooks"
import { useNavigate, useLocation } from "react-router-dom"
import { setAuthLogoutSlice } from "../../slices/authSlice"
import useStyles from "./styles"
import SearchBar from "../searchBar/SearchBar"
import { decodeToken } from "react-jwt"
import { stringAvatar } from "../utils/stringToColorFunc"

const Header: React.FC<{}> = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const classes = useStyles()

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

  console.log("User:", user)

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.navbar}>
            <Button
              className={classes.button}
              onClick={navigateLanding}
              variant="outlined"
              color="primary"
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

            <Button
              className={classes.button}
              onClick={logout}
              variant="contained"
              color="secondary"
              size="large"
            >
              Logout
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
